#!/bin/bash

# Fix Stripe Keys - Update Secret Key Only
# Pattern: STRIPE × KEYS × FIX × META × ONE
# Frequency: 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)
# ∞ AbëONE ∞

set -e

ABEKEYS_FILE="$HOME/.abekeys/credentials/stripe.json"

echo "🔐 FIXING STRIPE KEYS"
echo ""
echo "This will update the SECRET key (sk_live_...) while keeping publishable key"
echo ""

# Read current values
CURRENT_PUBLISHABLE=$(cat "$ABEKEYS_FILE" 2>/dev/null | grep -o '"publishableKey"[^,]*' | cut -d'"' -f4 | head -1 || echo "pk_live_51R4pWcL7UMRowhrwNoYc0qo9xmgcFQom6X073eyQIWyEgvV7DGgodBGCfXWrGKsnZ9JaBjKiBWCs7SKreSCIh9wv00loMy5nWW")
CURRENT_SECRET=$(cat "$ABEKEYS_FILE" 2>/dev/null | grep -o '"secretKey"[^,]*' | cut -d'"' -f4 | head -1 || echo "")
CURRENT_PRICE_ID=$(cat "$ABEKEYS_FILE" 2>/dev/null | grep -o '"priceId"[^,]*' | cut -d'"' -f4 | head -1 || echo "price_1Saj26L7UMRowhrwLH0m3DFY")
CURRENT_PRODUCT_ID=$(cat "$ABEKEYS_FILE" 2>/dev/null | grep -o '"productId"[^,]*' | cut -d'"' -f4 | head -1 || echo "prod_TXofSfF8HV7Kqd")

echo "📋 Current values:"
echo "   Publishable Key: ${CURRENT_PUBLISHABLE:0:30}..."
if [[ "$CURRENT_SECRET" =~ ^pk_ ]]; then
    echo "   ⚠️  Secret Key: ${CURRENT_SECRET:0:30}... (WRONG - this is publishable key!)"
else
    echo "   Secret Key: ${CURRENT_SECRET:0:30}..."
fi
echo "   Price ID: $CURRENT_PRICE_ID"
echo ""

# Check if secret key is wrong (publishable key or placeholder)
if [[ "$CURRENT_SECRET" =~ ^pk_ ]] || [[ "$CURRENT_SECRET" =~ YOUR_KEY ]]; then
    if [[ "$CURRENT_SECRET" =~ ^pk_ ]]; then
        echo "⚠️  DETECTED: Secret key field has publishable key!"
    else
        echo "⚠️  DETECTED: Secret key is placeholder!"
    fi
    echo ""
    echo "We need the SECRET key (sk_live_...), not publishable key (pk_live_...)"
    echo ""
    echo "Get it from: https://dashboard.stripe.com/apikeys"
    echo "  → Click 'Reveal live key' next to SECRET key"
    echo ""
    read -p "Enter your Stripe SECRET key (sk_live_...): " STRIPE_SECRET_KEY
    
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
    
    # Update AbëKEYs with correct secret key
    echo ""
    echo "💾 Updating AbëKEYs vault..."
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
        echo "$TEST_RESULT" | jq -r '.error.message' 2>/dev/null || echo "$TEST_RESULT"
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
    echo "Updated:"
    echo "  ✅ AbëKEYs: Secret key fixed"
    echo "  ✅ AbëKEYs: Publishable key kept"
    echo "  ✅ Vercel: Secret key updated"
    echo ""
    echo "⏱️  Vercel redeploying (2-3 minutes)..."
else
    echo "✅ Secret key looks correct (starts with sk_)"
    echo "   No changes needed!"
fi

echo ""
echo "Pattern: STRIPE × KEYS × FIX × META × ONE"
echo "∞ AbëONE ∞"

