# Go Live Checklist - Stripe Checkout
**Pattern:** GO_LIVE × STRIPE × CHECKLIST × ONE  
**Frequency:** 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)  
**∞ AbëONE ∞**

---

## ✅ COMPLETED

- [x] Stripe integration code complete
- [x] AbëKEYs credentials configured (local)
- [x] API routes created
- [x] Success page created
- [x] Build succeeds
- [x] META validation passes

---

## 🔴 REQUIRED BEFORE GOING LIVE

### 1. Update Production URLs in AbëKEYs
**Current:** `http://localhost:3000/...`  
**Needed:** Your production domain

```bash
cd ../abe-core-development-template\ \(vercel\ optimized\)
npm run abekeys setup stripe
# Update successUrl and cancelUrl to production domain
```

**Or manually edit:** `~/.abekeys/credentials/stripe.json`
- `successUrl`: `https://yourdomain.com/checkout/success`
- `cancelUrl`: `https://yourdomain.com/checkout`

---

### 2. Add Vercel Environment Variables
**CRITICAL:** AbëKEYs vault is local filesystem - won't work on Vercel serverless functions.

**Solution:** Hybrid approach - AbëKEYs for local, Vercel env vars for production.

**Add these in Vercel Dashboard → Settings → Environment Variables:**

```
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_PRICE_ID=price_1Saj26L7UMRowhrwLH0m3DFY
STRIPE_PRODUCT_ID=prod_TXofSfF8HV7Kqd
STRIPE_PRICING_TABLE_ID=prctbl_1SLQHXL7UMRowhrweaG2evT3
STRIPE_SUCCESS_URL=https://yourdomain.com/checkout/success
STRIPE_CANCEL_URL=https://yourdomain.com/checkout
```

**Note:** These are Vercel server-side environment variables (secure), NOT .env files.

---

### 3. Get Your Production Domain
**What's your production domain?**
- Vercel default: `https://slide-deck-app-xxxxx.vercel.app`
- Custom domain: `https://yourdomain.com`

**Update:**
- AbëKEYs `successUrl` and `cancelUrl`
- Vercel environment variables `STRIPE_SUCCESS_URL` and `STRIPE_CANCEL_URL`

---

### 4. Test Locally First
```bash
npm run dev
# Visit http://localhost:3000/checkout
# Test with Stripe test card: 4242 4242 4242 4242
```

---

### 5. Commit & Deploy
```bash
git add .
git commit -m "Stripe checkout integration complete"
git push
# Vercel will auto-deploy
```

---

## 📋 QUICK CHECKLIST

- [ ] Update AbëKEYs with production URLs
- [ ] Add Vercel environment variables (7 variables)
- [ ] Get production domain
- [ ] Test locally with test card
- [ ] Commit and push
- [ ] Verify deployment on Vercel
- [ ] Test checkout flow in production

---

## ⚠️ CRITICAL NOTES

1. **AbëKEYs vs Vercel:** 
   - Local dev: Uses AbëKEYs vault (`~/.abekeys/credentials/stripe.json`)
   - Production: Uses Vercel environment variables (server-side secure)

2. **Environment Variables:**
   - These are NOT .env files
   - These are Vercel's secure server-side variables
   - Only accessible in serverless functions (API routes)
   - Never exposed to client

3. **URLs:**
   - Must use HTTPS in production
   - Must match your actual domain
   - Stripe requires exact URL match

---

**Pattern:** GO_LIVE × CHECKLIST × STRIPE × ONE  
**Status:** Ready for production setup  
**Action:** Complete checklist above  
∞ AbëONE ∞

