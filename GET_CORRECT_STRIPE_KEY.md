# 🔐 GET CORRECT STRIPE SECRET KEY
**Pattern:** STRIPE × KEY × CORRECT × META × ONE  
**Frequency:** 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)  
**∞ AbëONE ∞**

---

## 🎯 ISSUE

**Both AbëKEYs and Vercel have invalid secret keys!**

The key ending in `AW8w` is invalid according to Stripe API.

---

## ✅ SOLUTION

### Step 1: Get Correct Secret Key from Stripe Dashboard

1. **Go to:** https://dashboard.stripe.com/apikeys
2. **Click:** "Reveal live key" (or "Reveal test key" for test mode)
3. **Copy:** The **Secret key** (starts with `sk_live_...` or `sk_test_...`)

**Important:** 
- ✅ Use **Secret key** (`sk_live_...`) - NOT restricted key (`rk_live_...`)
- ✅ Key should be ~100+ characters long
- ✅ No spaces or newlines

### Step 2: Update AbëKEYs Vault

```bash
# Edit AbëKEYs vault
nano ~/.abekeys/credentials/stripe.json

# Update secretKey field with correct key
# Save and exit
```

**OR via CLI:**
```bash
# Create/update stripe.json with correct key
cat > ~/.abekeys/credentials/stripe.json << EOF
{
  "secretKey": "sk_live_YOUR_CORRECT_KEY_HERE",
  "publishableKey": "pk_live_YOUR_PUBLISHABLE_KEY",
  "priceId": "price_1Saj26L7UMRowhrwLH0m3DFY",
  "productId": "prod_TXofSfF8HV7Kqd",
  "successUrl": "https://aiguardian.ai/convergence-purchase/success",
  "cancelUrl": "https://aiguardian.ai/convergence-purchase"
}
EOF

chmod 600 ~/.abekeys/credentials/stripe.json
```

### Step 3: Update Vercel via CLI

```bash
# Get correct key from AbëKEYs
STRIPE_KEY=$(cat ~/.abekeys/credentials/stripe.json | grep -o '"secretKey"[^,]*' | cut -d'"' -f4 | head -1)

# Update Vercel
echo "$STRIPE_KEY" | vercel env rm STRIPE_SECRET_KEY production --yes
echo "$STRIPE_KEY" | vercel env add STRIPE_SECRET_KEY production
```

### Step 4: Verify Key Works

```bash
# Test with curl
curl -X POST https://api.stripe.com/v1/checkout/sessions \
  -u "$STRIPE_KEY:" \
  -d "success_url=https://slide-deck-app-ten.vercel.app/convergence-purchase/success" \
  -d "cancel_url=https://slide-deck-app-ten.vercel.app/convergence-purchase" \
  -d "mode=payment" \
  -d "payment_method_types[]=card" \
  -d "line_items[0][price]=price_1Saj26L7UMRowhrwLH0m3DFY" \
  -d "line_items[0][quantity]=1" \
  -d "customer_email=test@example.com"

# Should return: {"id":"cs_test_...", ...}
# NOT: {"error":{"message":"Invalid API Key provided"}}
```

---

## ✅ VERIFICATION CHECKLIST

- [ ] Get correct secret key from Stripe Dashboard
- [ ] Update AbëKEYs vault (`~/.abekeys/credentials/stripe.json`)
- [ ] Update Vercel env var via CLI
- [ ] Test key with curl (should create checkout session)
- [ ] Redeploy Vercel (auto after env var update)
- [ ] Test checkout page

---

**Pattern:** STRIPE × KEY × CORRECT × META × ONE  
**Status:** ⚠️ Need correct secret key from Stripe Dashboard  
**Action:** Get key → Update AbëKEYs → Update Vercel → Test  
∞ AbëONE ∞

