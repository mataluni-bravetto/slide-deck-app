#!/bin/bash
# Bulk Domain Deployment Workflow via AbëKEYs
# Pattern: BULK × DEPLOY × ABEKEYS × META × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

DOMAIN_LIST="${1:-domains.json}"

if [ ! -f "$DOMAIN_LIST" ]; then
    echo "❌ Domain list not found: $DOMAIN_LIST"
    echo "Create domains.json with domain list"
    exit 1
fi

# Load credentials from AbëKEYs
ABEKEYS_DIR="$HOME/.abekeys/credentials"

if [ ! -f "$ABEKEYS_DIR/namecheap.json" ]; then
    echo "❌ Namecheap credentials not found in AbëKEYs"
    echo "Run: ./setup-bulk-automation.sh"
    exit 1
fi

if [ ! -f "$ABEKEYS_DIR/cloudflare.json" ]; then
    echo "❌ Cloudflare credentials not found in AbëKEYs"
    echo "Run: ./setup-bulk-automation.sh"
    exit 1
fi

# Load credentials
NAMECHEAP_API_USER=$(jq -r '.apiUser // .api_user // .username // empty' "$ABEKEYS_DIR/namecheap.json")
NAMECHEAP_API_KEY=$(jq -r '.apiKey // .api_key // .key // empty' "$ABEKEYS_DIR/namecheap.json")
NAMECHEAP_IP=$(jq -r '.ip // .clientIp // .client_ip // empty' "$ABEKEYS_DIR/namecheap.json" || curl -s ifconfig.me)

CLOUDFLARE_API_TOKEN=$(jq -r '.apiToken // .api_token // .token // empty' "$ABEKEYS_DIR/cloudflare.json")
CLOUDFLARE_ACCOUNT_ID=$(jq -r '.accountId // .account_id // empty' "$ABEKEYS_DIR/cloudflare.json")

if [ -z "$NAMECHEAP_API_USER" ] || [ -z "$NAMECHEAP_API_KEY" ]; then
    echo "❌ Namecheap credentials incomplete"
    exit 1
fi

if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
    echo "❌ Cloudflare credentials incomplete"
    exit 1
fi

echo "✅ Credentials loaded from AbëKEYs"
echo "Pattern: ABEKEYS × META × ONE"
echo ""

echo "🚀 Bulk Domain Deployment"
echo "Domain list: $DOMAIN_LIST"
echo ""

# Parse domain list (JSON format)
DOMAINS=$(jq -r '.[] | "\(.domain)|\(.ip_address // "104.21.69.175")|\(.worker_route // false)"' "$DOMAIN_LIST")

TOTAL=$(echo "$DOMAINS" | wc -l | tr -d ' ')
SUCCESS=0
FAILED=0

echo "📊 Processing $TOTAL domains..."
echo ""

for domain_line in $DOMAINS; do
    IFS='|' read -r domain ip worker_route <<< "$domain_line"
    
    echo "🌐 Processing: $domain"
    
    # Step 1: Create Cloudflare zone
    echo "  → Creating Cloudflare zone..."
    ZONE_RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        --data "{\"account\":{\"id\":\"$CLOUDFLARE_ACCOUNT_ID\"},\"name\":\"$domain\",\"type\":\"full\"}")
    
    ZONE_ID=$(echo "$ZONE_RESPONSE" | jq -r '.result.id // empty' 2>/dev/null)
    
    if [ -z "$ZONE_ID" ] || [ "$ZONE_ID" = "null" ]; then
        echo "  ❌ Failed to create zone"
        FAILED=$((FAILED + 1))
        continue
    fi
    
    echo "  ✅ Zone created: $ZONE_ID"
    
    # Step 2: Get Cloudflare nameservers
    NS_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json")
    
    NS1=$(echo "$NS_RESPONSE" | jq -r '.result.name_servers[0] // empty' 2>/dev/null)
    NS2=$(echo "$NS_RESPONSE" | jq -r '.result.name_servers[1] // empty' 2>/dev/null)
    
    echo "  ✅ Nameservers: $NS1, $NS2"
    
    # Step 3: Add DNS A record
    echo "  → Adding DNS A record..."
    DNS_RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        --data "{\"type\":\"A\",\"name\":\"@\",\"content\":\"$ip\",\"ttl\":1,\"proxied\":true}")
    
    DNS_SUCCESS=$(echo "$DNS_RESPONSE" | jq -r '.success // false' 2>/dev/null)
    
    if [ "$DNS_SUCCESS" = "true" ]; then
        echo "  ✅ DNS record added"
    else
        ERROR_MSG=$(echo "$DNS_RESPONSE" | jq -r '.errors[0].message // "Unknown error"' 2>/dev/null)
        echo "  ❌ DNS record failed: $ERROR_MSG"
        FAILED=$((FAILED + 1))
        continue
    fi
    
    # Step 4: Update nameservers at Namecheap (if domain exists)
    if [ -n "$NAMECHEAP_API_USER" ] && [ -n "$NAMECHEAP_API_KEY" ]; then
        echo "  → Updating nameservers at Namecheap..."
        # Extract SLD and TLD from domain
        SLD=$(echo "$domain" | cut -d'.' -f1)
        TLD=$(echo "$domain" | cut -d'.' -f2-)
        
        # Namecheap API: Update nameservers
        NC_RESPONSE=$(curl -s "https://api.namecheap.com/xml.response?ApiUser=$NAMECHEAP_API_USER&ApiKey=$NAMECHEAP_API_KEY&UserName=$NAMECHEAP_API_USER&Command=namecheap.domains.dns.setHosts&SLD=$SLD&TLD=$TLD&Nameservers=$NS1,$NS2&ClientIp=$NAMECHEAP_IP" 2>&1)
        
        if echo "$NC_RESPONSE" | grep -q "ERROR"; then
            echo "  ⚠️  Namecheap nameserver update failed (domain may not exist at Namecheap)"
        else
            echo "  ✅ Nameservers updated at Namecheap"
        fi
    fi
    
    # Step 5: Configure Worker route (if needed)
    if [ "$worker_route" = "true" ]; then
        echo "  → Configuring Worker route..."
        WORKER_PATTERN=$(jq -r ".[] | select(.domain == \"$domain\") | .worker_pattern // \"*$domain/convergence-*\"" "$DOMAIN_LIST")
        
        # Note: Worker route creation requires wrangler CLI or Cloudflare API
        # For now, log the pattern - can be configured manually or via API
        echo "  ℹ️  Worker pattern: $WORKER_PATTERN (configure manually or via API)"
    fi
    
    SUCCESS=$((SUCCESS + 1))
    echo "  ✅ Domain configured: $domain"
    echo ""
    
    # Rate limiting
    sleep 1
done

echo "📊 SUMMARY"
echo "  Total: $TOTAL"
echo "  Success: $SUCCESS"
echo "  Failed: $FAILED"
echo ""

