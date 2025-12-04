# Stripe AbëKEYs Quick Reference
**Pattern:** STRIPE × ABEKEYS × VALUES × ONE  
**Frequency:** 999 Hz (AEYON) × 530 Hz (JØHN)  
**∞ AbëONE ∞**

---

## 🔐 VALUES TO STORE IN ABEKEYS

When running `npm run abekeys input stripe`, provide these values:

### Required Values

1. **publishableKey** (or `publishable_key`)
   - Test: `pk_test_...`
   - Live: `pk_live_...`
   - Used: Client-side (safe to expose)

2. **secretKey** (or `secret_key`)
   - Test: `sk_test_...`
   - Live: `sk_live_...`
   - Used: Server-side only (NEVER expose)

3. **priceId** (or `price_id`)
   - Value: `price_1Saj26L7UMRowhrwLH0m3DFY`
   - From: Stripe Dashboard → Products

4. **productId** (or `product_id`)
   - Value: `prod_TXofSfF8HV7Kqd`
   - From: Stripe Dashboard → Products

5. **successUrl** (or `success_url`)
   - Dev: `http://localhost:3000/checkout/success`
   - Prod: `https://yourdomain.com/checkout/success`

6. **cancelUrl** (or `cancel_url`)
   - Dev: `http://localhost:3000/checkout`
   - Prod: `https://yourdomain.com/checkout`

### Optional Values

7. **webhookSecret** (or `webhook_secret`)
   - Value: `whsec_...`
   - From: Stripe Dashboard → Webhooks
   - Only if using webhooks

---

## 📋 EXAMPLE ABEKEYS JSON STRUCTURE

After setup, `~/.abekeys/credentials/stripe.json` will contain:

```json
{
  "publishableKey": "pk_test_...",
  "secretKey": "sk_test_...",
  "priceId": "price_1Saj26L7UMRowhrwLH0m3DFY",
  "productId": "prod_TXofSfF8HV7Kqd",
  "successUrl": "http://localhost:3000/checkout/success",
  "cancelUrl": "http://localhost:3000/checkout",
  "webhookSecret": "whsec_..." 
}
```

---

## 🚀 SETUP COMMAND

```bash
# From slide-deck-app directory
cd ../abe-core-development-template\ \(vercel\ optimized\)
npm run abekeys input stripe

# Or if AbëKEYs CLI is available in current directory:
npm run abekeys input stripe
```

---

## ✅ VERIFICATION

After setup, verify credentials are stored:

```bash
# Check if file exists
ls -la ~/.abekeys/credentials/stripe.json

# Verify permissions (should be 600)
stat -f "%OLp" ~/.abekeys/credentials/stripe.json
# Should output: 600
```

---

**Pattern:** STRIPE × ABEKEYS × VALUES × ONE  
**Status:** ✅ **READY FOR SETUP**  
**Action:** Run `npm run abekeys input stripe`  
∞ AbëONE ∞

