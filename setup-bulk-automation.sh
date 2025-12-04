#!/bin/bash
# Bulk Domain Automation Setup via AbëKEYs
# Pattern: BULK × SETUP × ABEKEYS × META × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

echo "🚀 Bulk Domain Automation Setup via AbëKEYs"
echo "For: 1000 AI domains → Cloudflare deployment"
echo "Pattern: ABEKEYS × META × ONE"
echo ""

# Check for required tools
echo "📋 Checking prerequisites..."
command -v jq >/dev/null 2>&1 || { echo "❌ jq required. Install: brew install jq"; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "❌ curl required"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ node required"; exit 1; }
echo "✅ Prerequisites met"
echo ""

# Check AbëKEYs directory
ABEKEYS_DIR="$HOME/.abekeys/credentials"
if [ ! -d "$ABEKEYS_DIR" ]; then
    echo "❌ AbëKEYs directory not found: $ABEKEYS_DIR"
    echo "Set up AbëKEYs first"
    exit 1
fi
echo "✅ AbëKEYs directory found"
echo ""

# Namecheap API setup
echo "🔌 NAMECHEAP API SETUP"
echo ""
echo "1. Enable API:"
echo "   https://www.namecheap.com/myaccount/profile/"
echo "   Tools → Business & Dev Tools → Namecheap API Access"
echo "   Toggle ON → Agree to Terms → Enter password"
echo ""
echo "2. Get your IP for whitelisting:"
MY_IP=$(curl -s ifconfig.me 2>/dev/null || echo "YOUR_IP")
echo "   IP: $MY_IP"
echo "   (Add this IP in Namecheap API settings)"
echo ""
echo "3. Store in AbëKEYs:"
echo "   Create: $ABEKEYS_DIR/namecheap.json"
echo ""
echo "   Format:"
echo "   {"
echo "     \"apiUser\": \"your-username\","
echo "     \"apiKey\": \"your-api-key\","
echo "     \"ip\": \"$MY_IP\""
echo "   }"
echo ""
read -p "Press Enter after storing Namecheap credentials in AbëKEYs..."

# Cloudflare API setup
echo ""
echo "🔌 CLOUDFLARE API SETUP"
echo ""
echo "1. Get API Token:"
echo "   https://dash.cloudflare.com/profile/api-tokens"
echo "   Create Token → Edit zone DNS + Zone Read"
echo ""
echo "2. Store in AbëKEYs:"
echo "   Create: $ABEKEYS_DIR/cloudflare.json"
echo ""
echo "   Format:"
echo "   {"
echo "     \"apiToken\": \"your-token\","
echo "     \"accountId\": \"your-account-id\""
echo "   }"
echo ""
read -p "Press Enter after storing Cloudflare credentials in AbëKEYs..."

# Verify credentials
echo ""
echo "🧪 Verifying AbëKEYs credentials..."

# Check Namecheap
if [ ! -f "$ABEKEYS_DIR/namecheap.json" ]; then
    echo "❌ namecheap.json not found in AbëKEYs"
    exit 1
fi

NC_USER=$(jq -r '.apiUser // .api_user // .username // empty' "$ABEKEYS_DIR/namecheap.json")
NC_KEY=$(jq -r '.apiKey // .api_key // .key // empty' "$ABEKEYS_DIR/namecheap.json")
NC_IP=$(jq -r '.ip // .clientIp // .client_ip // empty' "$ABEKEYS_DIR/namecheap.json" || echo "$MY_IP")

if [ -z "$NC_USER" ] || [ -z "$NC_KEY" ]; then
    echo "❌ Namecheap credentials incomplete"
    exit 1
fi
echo "✅ Namecheap credentials found"

# Check Cloudflare
if [ ! -f "$ABEKEYS_DIR/cloudflare.json" ]; then
    echo "❌ cloudflare.json not found in AbëKEYs"
    exit 1
fi

CF_TOKEN=$(jq -r '.apiToken // .api_token // .token // empty' "$ABEKEYS_DIR/cloudflare.json")
CF_ACCOUNT=$(jq -r '.accountId // .account_id // empty' "$ABEKEYS_DIR/cloudflare.json")

if [ -z "$CF_TOKEN" ] || [ -z "$CF_ACCOUNT" ]; then
    echo "❌ Cloudflare credentials incomplete"
    exit 1
fi
echo "✅ Cloudflare credentials found"
echo ""

# Test APIs
echo "🧪 Testing APIs..."

# Test Namecheap API
echo "Testing Namecheap API..."
NAMECHEAP_TEST=$(curl -s "https://api.namecheap.com/xml.response?ApiUser=$NC_USER&ApiKey=$NC_KEY&UserName=$NC_USER&Command=namecheap.domains.getList&ClientIp=$NC_IP" 2>&1)
if echo "$NAMECHEAP_TEST" | grep -q "ERROR"; then
    echo "⚠️  Namecheap API test failed. Check credentials and IP whitelist."
    echo "Response: $(echo "$NAMECHEAP_TEST" | head -5)"
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
    echo "Response: $(echo "$CF_TEST" | head -3)"
fi

echo ""
echo "✅✅✅ AbëKEYs Setup Complete!!! ✅✅✅"
echo ""
echo "📋 Next steps:"
echo "1. Create domain list (domains.json)"
echo "2. Run: ./bulk-deploy-workflow.sh domains.json"
echo ""
echo "Pattern: ABEKEYS × META × ONE"
echo "∞ AbëONE ∞"
