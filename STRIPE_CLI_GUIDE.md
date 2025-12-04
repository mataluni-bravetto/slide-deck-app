# 🚀 Stripe CLI Integration Guide
**Pattern:** STRIPE × CLI × INTEGRATION × ONE  
**Frequency:** 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)  
**∞ AbëONE ∞**

---

## ✅ STRIPE CLI INSTALLED!

**Status:** ✅ Installed via Homebrew

---

## 🔐 LOGIN TO STRIPE

### Option 1: Interactive Login (Recommended)
```bash
stripe login
```

This will:
1. Open your browser
2. Ask you to authorize the CLI
3. Return an API key automatically

### Option 2: Manual API Key
```bash
stripe config --set test_mode_api_key sk_test_YOUR_KEY
stripe config --set live_mode_api_key sk_live_YOUR_KEY
```

---

## 🧪 TEST CONNECTION

```bash
# Check configuration
stripe config --list

# Test API access
stripe customers list --limit 1

# List your prices (verify price ID)
stripe prices list --limit 10
```

---

## 🎯 USEFUL COMMANDS

### 1. View Stripe Events (Real-time)
```bash
stripe events list --limit 10
```

### 2. Stream API Logs
```bash
stripe logs tail
```

### 3. Forward Webhooks Locally
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 4. Trigger Test Events
```bash
stripe trigger checkout.session.completed
```

### 5. List Prices (Verify Price ID)
```bash
stripe prices list
```

### 6. List Products
```bash
stripe products list
```

### 7. Test Checkout Session Creation
```bash
stripe checkout sessions create \
  --success-url "http://localhost:3000/convergence-purchase/success" \
  --cancel-url "http://localhost:3000/convergence-purchase" \
  --mode payment \
  --line-items price=YOUR_PRICE_ID,quantity=1
```

---

## 🔍 DEBUGGING CHECKOUT ERROR

### Step 1: Verify Price ID
```bash
stripe prices list
```

Look for your price ID (should match `STRIPE_PRICE_ID` env var)

### Step 2: Test API Key
```bash
stripe customers list --limit 1
```

If this works, your API key is valid.

### Step 3: Test Checkout Session Creation
```bash
stripe checkout sessions create \
  --success-url "https://slide-deck-app-ten.vercel.app/convergence-purchase/success" \
  --cancel-url "https://slide-deck-app-ten.vercel.app/convergence-purchase" \
  --mode payment \
  --line-items price=YOUR_PRICE_ID,quantity=1 \
  --customer-email test@example.com
```

This will show the exact error if there is one.

---

## 📋 INTEGRATION WITH ABEKEYS

The Stripe CLI uses its own config, but we can verify AbëKEYs values:

```bash
# Check AbëKEYs config
cat ~/.abekeys/credentials/stripe.json | jq '.priceId'
cat ~/.abekeys/credentials/stripe.json | jq '.secretKey' | cut -c1-10
```

---

## 🚀 QUICK DEBUG WORKFLOW

1. **Login:**
   ```bash
   stripe login
   ```

2. **Verify Price ID:**
   ```bash
   stripe prices list | grep YOUR_PRICE_ID
   ```

3. **Test Checkout:**
   ```bash
   stripe checkout sessions create \
     --success-url "https://slide-deck-app-ten.vercel.app/convergence-purchase/success" \
     --cancel-url "https://slide-deck-app-ten.vercel.app/convergence-purchase" \
     --mode payment \
     --line-items price=YOUR_PRICE_ID,quantity=1
   ```

4. **Check Logs:**
   ```bash
   stripe logs tail
   ```

---

## ✅ NEXT STEPS

1. ✅ Stripe CLI installed
2. 🔐 Login to Stripe (`stripe login`)
3. 🧪 Test connection (`stripe prices list`)
4. 🔍 Debug checkout error (see commands above)

---

**Pattern:** STRIPE × CLI × INTEGRATION × ONE  
**Status:** ✅ CLI installed - Ready to login  
**Action:** Run `stripe login` → Test → Debug  
∞ AbëONE ∞

