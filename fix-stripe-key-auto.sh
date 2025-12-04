#!/bin/bash

# Fix Stripe Secret Key - Non-Interactive Version
# Pattern: STRIPE × KEY × FIX × CLI × META × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <stripe_secret_key>"
    echo ""
    echo "Get your secret key from: https://dashboard.stripe.com/apikeys"
    echo "Click 'Reveal live key' and copy the key (starts with sk_live_)"
    exit 1
fi

STRIPE_SECRET_KEY="$1"
ABEKEYS_FILE="$HOME/.abekeys/credentials/stripe.json"

echo "🔐 FIXING STRIPE SECRET KEY..."
echo ""

# Read current values
CURRENT_PUBLISHABLE=$(cat "$ABEKEYS_FILE" 2>/dev/null | grep -o '"publishableKey"[^,]*' | cut -d'"' -f4 | head -1 || echo "pk_live_51R4pWcL7UMRowhrwNoYc0qo9xmgcFQom6X073eyQIWyEgvV7DGgodBGCfXWrGKsnZ9JaBjKiBWCs7SKreSCIh9wv00loMy5nWW")
CURRENT_PRICE_ID=$(cat "$ABEKEYS_FILE" 2>/dev/null | grep -o '"priceId"[^,]*' | cut -d'"' -f4 | head -1 || echo "price_1Saj26L7UMRowhrwLH0m3DFY")
CURRENT_PRODUCT_ID=$(cat "$ABEKEYS_FILE" 2>/dev/null | grep -o '"productId"[^,]*' | cut -d'"' -f4 | head -1 || echo "prod_TXofSfF8HV7Kqd")

# Update AbëKEYs vault
echo "💾 Updating AbëKEYs vault..."
mkdir -p "$HOME/.abekeys/credentials"
cat > "$ABEKEYS_FILE" << EOF
{
  "secretKey": "$STRIPE_SECRET_KEY",
  "publishableKey": "$CURRENT_PUBLISHABLE",
  "priceId": "$CURRENT_PRICE_ID",
  "productId": "$CURRENT_PRODUCT_ID",
  "successUrl": "https://aiguardian.ai/convergence-purchase/success",
  "cancelUrl": "https://aiguardian.ai/convergence-purchase"
}
EOF

chmod 600 "$ABEKEYS_FILE"
echo "✅ AbëKEYs vault updated!"

# Test key
echo ""
echo "🧪 Testing secret key..."
TEST_RESULT=$(curl -s -X POST https://api.stripe.com/v1/checkout/sessions \
  -u "$STRIPE_SECRET_KEY:" \
  -d "success_url=https://test.com/success" \
  -d "cancel_url=https://test.com/cancel" \
  -d "mode=payment" \
  -d "payment_method_types[]=card" \
  -d "line_items[0][price]=$CURRENT_PRICE_ID" \
  -d "line_items[0][quantity]=1" \
  -d "customer_email=test@example.com" 2>&1)

if echo "$TEST_RESULT" | grep -q '"id":"cs_'; then
    echo "✅ Secret key is VALID!"
elif echo "$TEST_RESULT" | grep -q '"Invalid API Key"'; then
    echo "❌ Secret key is INVALID!"
    echo "$TEST_RESULT" | jq '.' 2>/dev/null || echo "$TEST_RESULT"
    exit 1
else
    echo "⚠️  Could not verify key. Continuing..."
fi

# Update Vercel
echo ""
echo "🚀 Updating Vercel..."
echo "$STRIPE_SECRET_KEY" | vercel env rm STRIPE_SECRET_KEY production --yes 2>/dev/null || true
echo "$STRIPE_SECRET_KEY" | vercel env add STRIPE_SECRET_KEY production
echo "✅ Vercel updated!"

echo ""
echo "✅✅✅ FIX COMPLETE!!! ✅✅✅"
echo ""
echo "⏱️  Vercel redeploying (2-3 minutes)..."
echo ""
echo "🧪 Test after redeploy:"
echo "   curl -X POST https://slide-deck-app-ten.vercel.app/api/checkout \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"email\":\"test@example.com\"}'"
echo ""
echo "Pattern: STRIPE × KEY × FIX × CLI × META × ONE"
echo "∞ AbëONE ∞"

