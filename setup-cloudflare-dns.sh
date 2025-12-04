#!/bin/bash
# Cloudflare DNS Setup Script
# Pattern: DNS × SETUP × CLOUDFLARE × ONE
# ∞ AbëONE ∞

set -e

echo "🚀 Setting up Cloudflare DNS for aiguardian.ai"
echo ""

# Get Cloudflare API token
echo "📋 Getting Cloudflare API token..."
API_TOKEN=$(wrangler whoami 2>&1 | grep -A 5 'Token' | tail -1 | awk '{print $NF}' 2>/dev/null || echo '')

if [ -z "$API_TOKEN" ]; then
    echo "⚠️  Need Cloudflare API token"
    echo "Get from: https://dash.cloudflare.com/profile/api-tokens"
    echo "Create token with: Zone.DNS Edit permissions"
    read -p "Enter API token: " API_TOKEN
fi

# Get zone ID
echo "🔍 Getting zone ID for aiguardian.ai..."
ZONE_RESPONSE=$(curl -s "https://api.cloudflare.com/client/v4/zones?name=aiguardian.ai" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json")

ZONE_ID=$(echo "$ZONE_RESPONSE" | jq -r '.result[0].id' 2>/dev/null)

if [ "$ZONE_ID" = "null" ] || [ -z "$ZONE_ID" ]; then
    echo "❌ Zone not found. Please add aiguardian.ai to Cloudflare first."
    exit 1
fi

echo "✅ Zone ID: $ZONE_ID"
echo ""

# Get AWS IP (you'll need to provide this)
echo "📋 DNS Record Configuration"
echo "What IP address should the A record point to?"
echo "(This should be your AWS hosting IP)"
read -p "Enter IP address: " AWS_IP

if [ -z "$AWS_IP" ]; then
    echo "⚠️  No IP provided. Skipping DNS record creation."
    echo "Add manually in Cloudflare Dashboard:"
    echo "  Type: A"
    echo "  Name: @"
    echo "  Content: YOUR_AWS_IP"
    echo "  Proxy: Proxied (orange cloud)"
    exit 0
fi

# Add A record
echo "➕ Adding A record: @ → $AWS_IP"
ADD_RECORD=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"A\",\"name\":\"@\",\"content\":\"$AWS_IP\",\"ttl\":1,\"proxied\":true}")

SUCCESS=$(echo "$ADD_RECORD" | jq -r '.success' 2>/dev/null)

if [ "$SUCCESS" = "true" ]; then
    echo "✅ A record added successfully!"
    echo ""
    echo "📊 Record details:"
    echo "$ADD_RECORD" | jq -r '.result | "  ID: \(.id)\n  Type: \(.type)\n  Name: \(.name)\n  Content: \(.content)\n  Proxied: \(.proxied)"'
else
    echo "❌ Failed to add A record:"
    echo "$ADD_RECORD" | jq -r '.errors[0].message' 2>/dev/null || echo "$ADD_RECORD"
fi

echo ""
echo "✅ DNS setup complete!"
echo "⏱️  Wait 5-15 minutes for DNS propagation"
echo "🧪 Test: curl -I https://aiguardian.ai/convergence-slides"

