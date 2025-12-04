#!/bin/bash

# Fix Stripe Secret Key - Automated Update Script
# Pattern: STRIPE × KEY × FIX × CLI × META × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

echo "🔐 STRIPE SECRET KEY FIX - AUTOMATED UPDATE"
echo ""
echo "This script will:"
echo "  1. Prompt for correct Stripe secret key"
echo "  2. Update AbëKEYs vault"
echo "  3. Update Vercel environment variable"
echo "  4. Test the key"
echo ""

# Get current config
ABEKEYS_FILE="$HOME/.abekeys/credentials/stripe.json"

if [ ! -f "$ABEKEYS_FILE" ]; then
    echo "❌ AbëKEYs Stripe config not found!"
    echo "   Creating new file..."
    mkdir -p "$HOME/.abekeys/credentials"
    echo '{}' > "$ABEKEYS_FILE"
fi

# Read current values
CURRENT_PUBLISHABLE=$(cat "$ABEKEYS_FILE" | grep -o '"publishableKey"[^,]*' | cut -d'"' -f4 | head -1 || echo "")
CURRENT_PRICE_ID=$(cat "$ABEKEYS_FILE" | grep -o '"priceId"[^,]*' | cut -d'"' -f4 | head -1 || echo "price_1Saj26L7UMRowhrwLH0m3DFY")
CURRENT_PRODUCT_ID=$(cat "$ABEKEYS_FILE" | grep -o '"productId"[^,]*' | cut -d'"' -f4 | head -1 || echo "prod_TXofSfF8HV7Kqd")

echo "📋 Current configuration:"
echo "   Publishable Key: ${CURRENT_PUBLISHABLE:0:20}..."
echo "   Price ID: $CURRENT_PRICE_ID"
echo "   Product ID: $CURRENT_PRODUCT_ID"
echo ""

# Prompt for secret key
echo "🔐 Enter your Stripe SECRET key (starts with sk_live_ or sk_test_):"
echo "   Get it from: https://dashboard.stripe.com/apikeys"
echo "   Click 'Reveal live key' or 'Reveal test key'"
echo ""
read -p "Secret Key: " STRIPE_SECRET_KEY

if [ -z "$STRIPE_SECRET_KEY" ]; then
    echo "❌ Secret key cannot be empty!"
    exit 1
fi

if [[ ! "$STRIPE_SECRET_KEY" =~ ^sk_(live|test)_ ]]; then
    echo "⚠️  Warning: Secret key should start with 'sk_live_' or 'sk_test_'"
    read -p "Continue anyway? (y/n): " CONTINUE
    if [ "$CONTINUE" != "y" ]; then
        exit 1
    fi
fi

# Prompt for publishable key if not set
if [ -z "$CURRENT_PUBLISHABLE" ]; then
    echo ""
    echo "🔐 Enter your Stripe PUBLISHABLE key (starts with pk_live_ or pk_test_):"
    read -p "Publishable Key: " STRIPE_PUBLISHABLE_KEY
else
    STRIPE_PUBLISHABLE_KEY="$CURRENT_PUBLISHABLE"
    echo ""
    echo "✅ Using existing publishable key"
fi

# Update AbëKEYs vault
echo ""
echo "💾 Updating AbëKEYs vault..."
cat > "$ABEKEYS_FILE" << EOF
{
  "secretKey": "$STRIPE_SECRET_KEY",
  "publishableKey": "${STRIPE_PUBLISHABLE_KEY:-pk_live_51R4pWcL7UMRowhrwNoYc0qo9xmgcFQom6X073eyQIWyEgvV7DGgodBGCfXWrGKsnZ9JaBjKiBWCs7SKreSCIh9wv00loMy5nWW}",
  "priceId": "$CURRENT_PRICE_ID",
  "productId": "$CURRENT_PRODUCT_ID",
  "successUrl": "https://aiguardian.ai/convergence-purchase/success",
  "cancelUrl": "https://aiguardian.ai/convergence-purchase"
}
EOF

chmod 600 "$ABEKEYS_FILE"
echo "✅ AbëKEYs vault updated!"

# Test key with Stripe API
echo ""
echo "🧪 Testing secret key with Stripe API..."
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
    echo "✅ Secret key is VALID! Stripe API accepted it."
elif echo "$TEST_RESULT" | grep -q '"Invalid API Key"'; then
    echo "❌ Secret key is INVALID! Stripe API rejected it."
    echo "   Error: $TEST_RESULT"
    exit 1
else
    echo "⚠️  Could not verify key. Continuing anyway..."
fi

# Update Vercel
echo ""
echo "🚀 Updating Vercel environment variable..."
echo "$STRIPE_SECRET_KEY" | vercel env rm STRIPE_SECRET_KEY production --yes 2>/dev/null || true
echo "$STRIPE_SECRET_KEY" | vercel env add STRIPE_SECRET_KEY production
echo "✅ Vercel environment variable updated!"

# Summary
echo ""
echo "✅✅✅ STRIPE KEY FIX COMPLETE!!! ✅✅✅"
echo ""
echo "Updated:"
echo "  ✅ AbëKEYs vault: $ABEKEYS_FILE"
echo "  ✅ Vercel env var: STRIPE_SECRET_KEY (production)"
echo ""
echo "⏱️  Vercel will auto-redeploy with new key (2-3 minutes)"
echo ""
echo "🧪 Test after redeploy:"
echo "   curl -X POST https://slide-deck-app-ten.vercel.app/api/checkout \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"email\":\"test@example.com\"}'"
echo ""
echo "Pattern: STRIPE × KEY × FIX × CLI × META × ONE"
echo "∞ AbëONE ∞"

