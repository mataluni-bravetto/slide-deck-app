#!/bin/bash
# Bulk Domain Nameserver Update via Namecheap API + AbëKEYs
# Pattern: BULK × NAMECHEAP × ABEKEYS × META × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

DOMAIN_LIST="${1:-domains.json}"

if [ ! -f "$DOMAIN_LIST" ]; then
    echo "❌ Domain list not found: $DOMAIN_LIST"
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

if [ -z "$NAMECHEAP_API_USER" ] || [ -z "$NAMECHEAP_API_KEY" ]; then
    echo "❌ Namecheap credentials incomplete"
    exit 1
fi

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ Cloudflare credentials incomplete"
    exit 1
fi

echo "✅ Credentials loaded from AbëKEYs"
echo "Pattern: ABEKEYS × META × ONE"
echo ""

echo "🔌 Bulk Domain Registration via Namecheap API"
echo ""

# Note: Namecheap API requires domains to be registered manually or via their API
# This script updates nameservers for existing domains

DOMAINS=$(jq -r '.[] | .domain' "$DOMAIN_LIST")
TOTAL=$(echo "$DOMAINS" | wc -l | tr -d ' ')

echo "📊 Processing $TOTAL domains..."
echo ""

for domain in $DOMAINS; do
    echo "🌐 Processing: $domain"
    
    # Extract SLD and TLD
    SLD=$(echo "$domain" | cut -d'.' -f1)
    TLD=$(echo "$domain" | cut -d'.' -f2-)
    
    # Get Cloudflare nameservers (domain must already be in Cloudflare)
    echo "  → Getting Cloudflare nameservers..."
    ZONE_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$domain" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json")
    
    ZONE_ID=$(echo "$ZONE_RESPONSE" | jq -r '.result[0].id // empty' 2>/dev/null)
    
    if [ -z "$ZONE_ID" ] || [ "$ZONE_ID" = "null" ]; then
        echo "  ⚠️  Domain not found in Cloudflare. Create zone first."
        continue
    fi
    
    NS_RESPONSE=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json")
    
    NS1=$(echo "$NS_RESPONSE" | jq -r '.result.name_servers[0] // empty' 2>/dev/null)
    NS2=$(echo "$NS_RESPONSE" | jq -r '.result.name_servers[1] // empty' 2>/dev/null)
    
    if [ -z "$NS1" ] || [ -z "$NS2" ]; then
        echo "  ⚠️  Could not get nameservers"
        continue
    fi
    
    echo "  → Updating nameservers at Namecheap..."
    NC_RESPONSE=$(curl -s "https://api.namecheap.com/xml.response?ApiUser=$NAMECHEAP_API_USER&ApiKey=$NAMECHEAP_API_KEY&UserName=$NAMECHEAP_API_USER&Command=namecheap.domains.dns.setHosts&SLD=$SLD&TLD=$TLD&Nameservers=$NS1,$NS2&ClientIp=$NAMECHEAP_IP" 2>&1)
    
    if echo "$NC_RESPONSE" | grep -q "ERROR"; then
        ERROR=$(echo "$NC_RESPONSE" | grep -oP '(?<=<Error>)[^<]+' | head -1)
        echo "  ❌ Failed: $ERROR"
    else
        echo "  ✅ Nameservers updated: $NS1, $NS2"
    fi
    echo ""
    
    sleep 1
done

echo "✅ Bulk nameserver update complete"

