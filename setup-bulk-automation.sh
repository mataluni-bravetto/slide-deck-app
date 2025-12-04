#!/bin/bash
# Bulk Domain Automation Setup
# Pattern: BULK × SETUP × AUTOMATION × ONE
# ∞ AbëONE ∞

set -e

echo "🚀 Bulk Domain Automation Setup"
echo "For: 1000 AI domains → Cloudflare deployment"
echo ""

# Check for required tools
echo "📋 Checking prerequisites..."
command -v jq >/dev/null 2>&1 || { echo "❌ jq required. Install: brew install jq"; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "❌ curl required"; exit 1; }
echo "✅ Prerequisites met"
echo ""

# Namecheap API setup
echo "🔌 NAMECHEAP API SETUP"
echo ""
echo "1. Enable API:"
echo "   https://www.namecheap.com/myaccount/profile/"
echo "   Tools → Business & Dev Tools → Namecheap API Access"
echo "   Toggle ON → Agree to Terms → Enter password"
echo ""
read -p "Enter Namecheap API Username: " NAMECHEAP_USER
read -sp "Enter Namecheap API Key: " NAMECHEAP_KEY
echo ""

# Get IP for whitelisting
MY_IP=$(curl -s ifconfig.me 2>/dev/null || echo "YOUR_IP")
echo "2. Whitelist IP: $MY_IP"
echo "   (Add this IP in Namecheap API settings)"
echo ""

# Cloudflare API setup
echo "🔌 CLOUDFLARE API SETUP"
echo ""
read -sp "Enter Cloudflare API Token: " CF_TOKEN
echo ""
read -p "Enter Cloudflare Account ID: " CF_ACCOUNT_ID
echo ""

# Save credentials
echo "💾 Saving credentials..."
cat > .env.bulk <<EOF
# Namecheap API
NAMECHEAP_API_USER=$NAMECHEAP_USER
NAMECHEAP_API_KEY=$NAMECHEAP_KEY
NAMECHEAP_IP=$MY_IP

# Cloudflare API
CLOUDFLARE_API_TOKEN=$CF_TOKEN
CLOUDFLARE_ACCOUNT_ID=$CF_ACCOUNT_ID
EOF

chmod 600 .env.bulk
echo "✅ Credentials saved to .env.bulk"
echo ""

# Test APIs
echo "🧪 Testing APIs..."
source .env.bulk

# Test Namecheap API
echo "Testing Namecheap API..."
NAMECHEAP_TEST=$(curl -s "https://api.namecheap.com/xml.response?ApiUser=$NAMECHEAP_USER&ApiKey=$NAMECHEAP_KEY&UserName=$NAMECHEAP_USER&Command=namecheap.domains.getList&ClientIp=$MY_IP" 2>&1)
if echo "$NAMECHEAP_TEST" | grep -q "ERROR"; then
    echo "⚠️  Namecheap API test failed. Check credentials and IP whitelist."
else
    echo "✅ Namecheap API working"
fi

# Test Cloudflare API
echo "Testing Cloudflare API..."
CF_TEST=$(curl -s -X GET "https://api.cloudflare.com/client/v4/user/tokens/verify" \
    -H "Authorization: Bearer $CF_TOKEN" \
    -H "Content-Type: application/json" 2>&1)
if echo "$CF_TEST" | jq -r '.success' 2>/dev/null | grep -q "true"; then
    echo "✅ Cloudflare API working"
else
    echo "⚠️  Cloudflare API test failed. Check token."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create domain list (domains.json)"
echo "2. Run: ./bulk-deploy-workflow.sh domains.json"
echo ""

