#!/bin/bash
# Add root A record via Cloudflare API
# Pattern: DNS × API × ADD × ONE
# ∞ AbëONE ∞

set -e

echo "🚀 Adding root A record for aiguardian.ai via Cloudflare API"
echo ""

# Get IP from www record
AWS_IP=$(dig www.aiguardian.ai A +short | head -1)
echo "📋 Using IP: $AWS_IP"
echo ""

# Check if Cloudflare API token is available
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "⚠️  CLOUDFLARE_API_TOKEN not set"
    echo ""
    echo "To add DNS record via API:"
    echo "1. Get API token: https://dash.cloudflare.com/profile/api-tokens"
    echo "2. Create token with: Zone.DNS Edit permissions"
    echo "3. Run: export CLOUDFLARE_API_TOKEN='your-token'"
    echo "4. Run this script again"
    echo ""
    echo "Or add manually:"
    echo "  Cloudflare Dashboard → aiguardian.ai → DNS → Records → Add"
    echo "  Type: A, Name: @, IPv4: $AWS_IP, Proxy: Proxied"
    exit 1
fi

# Get zone ID
echo "🔍 Getting zone ID..."
ZONE_RESPONSE=$(curl -s "https://api.cloudflare.com/client/v4/zones?name=aiguardian.ai" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json")

ZONE_ID=$(echo "$ZONE_RESPONSE" | jq -r '.result[0].id' 2>/dev/null)

if [ "$ZONE_ID" = "null" ] || [ -z "$ZONE_ID" ]; then
    echo "❌ Zone not found or API error"
    echo "$ZONE_RESPONSE" | jq '.' 2>/dev/null || echo "$ZONE_RESPONSE"
    exit 1
fi

echo "✅ Zone ID: $ZONE_ID"
echo ""

# Check if root A record already exists
echo "🔍 Checking for existing root A record..."
EXISTING=$(curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=A&name=aiguardian.ai" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json")

EXISTING_COUNT=$(echo "$EXISTING" | jq -r '.result | length' 2>/dev/null)

if [ "$EXISTING_COUNT" -gt 0 ]; then
    echo "⚠️  Root A record already exists!"
    echo "$EXISTING" | jq -r '.result[] | "  ID: \(.id), Name: \(.name), Content: \(.content), Proxied: \(.proxied)"'
    echo ""
    echo "✅ DNS record already configured!"
    exit 0
fi

# Add A record
echo "➕ Adding root A record..."
ADD_RESPONSE=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"A\",\"name\":\"@\",\"content\":\"$AWS_IP\",\"ttl\":1,\"proxied\":true}")

SUCCESS=$(echo "$ADD_RESPONSE" | jq -r '.success' 2>/dev/null)

if [ "$SUCCESS" = "true" ]; then
    echo "✅ Root A record added successfully!"
    echo ""
    echo "📊 Record details:"
    echo "$ADD_RESPONSE" | jq -r '.result | "  ID: \(.id)\n  Type: \(.type)\n  Name: \(.name)\n  Content: \(.content)\n  Proxied: \(.proxied)"'
    echo ""
    echo "⏱️  DNS propagation: 5-15 minutes"
    echo "🧪 Test: curl -I https://aiguardian.ai/convergence-slides"
else
    echo "❌ Failed to add A record:"
    echo "$ADD_RESPONSE" | jq '.' 2>/dev/null || echo "$ADD_RESPONSE"
    exit 1
fi
