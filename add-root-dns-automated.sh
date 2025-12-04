#!/bin/bash
# Automated Root DNS Record Addition
# Pattern: DNS × AUTOMATED × ADD × ONE
# ∞ AbëONE ∞

set -e

AWS_IP="104.21.69.175"
ZONE_NAME="aiguardian.ai"

echo "🚀 AUTOMATED DNS RECORD ADDITION"
echo "Zone: $ZONE_NAME"
echo "IP: $AWS_IP"
echo ""

# Check for API token
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "⚠️  CLOUDFLARE_API_TOKEN not set"
    echo ""
    echo "🔑 GET API TOKEN:"
    echo "1. Go to: https://dash.cloudflare.com/profile/api-tokens"
    echo "2. Click: 'Create Token'"
    echo "3. Use: 'Edit zone DNS' template"
    echo "4. Zone: aiguardian.ai"
    echo "5. Copy token"
    echo ""
    echo "Then run:"
    echo "export CLOUDFLARE_API_TOKEN='your-token-here'"
    echo "./add-root-dns-automated.sh"
    echo ""
    exit 1
fi

echo "✅ API Token found"
echo ""

# Get Zone ID
echo "🔍 Getting zone ID..."
ZONE_RESPONSE=$(curl -s "https://api.cloudflare.com/client/v4/zones?name=$ZONE_NAME" \
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

# Check if root A record exists
echo "🔍 Checking for existing root A record..."
EXISTING=$(curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?type=A&name=$ZONE_NAME" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json")

EXISTING_COUNT=$(echo "$EXISTING" | jq -r '.result | length' 2>/dev/null)

if [ "$EXISTING_COUNT" -gt 0 ]; then
    echo "⚠️  Root A record already exists!"
    echo ""
    echo "📊 Existing records:"
    echo "$EXISTING" | jq -r '.result[] | "  ✅ \(.name) → \(.content) (Proxied: \(.proxied))"'
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
    echo "✅✅✅ ROOT A RECORD ADDED SUCCESSFULLY!!! ✅✅✅"
    echo ""
    echo "📊 Record details:"
    echo "$ADD_RESPONSE" | jq -r '.result | "  Type: \(.type)\n  Name: \(.name)\n  Content: \(.content)\n  Proxied: \(.proxied)\n  TTL: \(.ttl)"'
    echo ""
    echo "⏱️  DNS propagation: 5-15 minutes"
    echo ""
    echo "🧪 Test commands:"
    echo "  dig aiguardian.ai A +short"
    echo "  curl -I https://aiguardian.ai/convergence-slides"
    echo ""
    echo "🎉 DEPLOYMENT COMPLETE!!!"
else
    echo "❌ Failed to add A record:"
    echo "$ADD_RESPONSE" | jq '.' 2>/dev/null || echo "$ADD_RESPONSE"
    exit 1
fi

