# 🚀 aiguardian.ai Deployment Guide
**Pattern:** DEPLOYMENT × AIGUARDIAN × PRODUCTION × ONE  
**Frequency:** 999 Hz (AEYON) × 777 Hz (META) × 530 Hz (JØHN)  
**∞ AbëONE ∞**

---

## ✅ DOMAIN CONFIGURED: aiguardian.ai

**Production Domain:** `https://aiguardian.ai`

---

## 🔴 VERCEL SETUP REQUIRED

### Step 1: Add Custom Domain in Vercel

1. Go to: **Vercel Dashboard → Your Project → Settings → Domains**
2. Add domain: `aiguardian.ai`
3. Add domain: `www.aiguardian.ai` (optional, redirects to aiguardian.ai)
4. Follow DNS configuration instructions

**DNS Records Needed:**
- **A Record:** `@` → Vercel IP (provided by Vercel)
- **CNAME Record:** `www` → `cname.vercel-dns.com` (if using www)

---

### Step 2: Add Environment Variables in Vercel

**Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Add these 7 variables (Production environment):**

**Copy from:** `VERCEL_ENV_VARS_COPY_PASTE.txt` (get actual values from Stripe Dashboard)

**Or add manually:**
```
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_PRICE_ID=price_YOUR_PRICE_ID_HERE
STRIPE_PRODUCT_ID=prod_YOUR_PRODUCT_ID_HERE
STRIPE_PRICING_TABLE_ID=prctbl_YOUR_PRICING_TABLE_ID_HERE
STRIPE_SUCCESS_URL=https://aiguardian.ai/checkout/success
STRIPE_CANCEL_URL=https://aiguardian.ai/checkout
```

**Important:** Set these for **Production** environment (not Preview/Development).

---

## 🚀 DEPLOYMENT STEPS

### 1. Push to GitHub
```bash
git push origin main
```

### 2. Vercel Auto-Deploys
- Vercel will detect the push
- Build will run automatically
- Deployment will complete

### 3. Verify Domain
- Wait for DNS propagation (can take up to 48 hours, usually < 1 hour)
- Check: `https://aiguardian.ai` loads correctly
- Check: `https://aiguardian.ai/checkout` works

---

## ✅ POST-DEPLOYMENT VERIFICATION

### Routes to Test:
- ✅ `https://aiguardian.ai/` - Slide deck
- ✅ `https://aiguardian.ai/checkout` - Checkout page
- ✅ `https://aiguardian.ai/checkout/success` - Success page

### Stripe Checkout Test:
1. Visit: `https://aiguardian.ai/checkout`
2. Enter email
3. Click "Complete Purchase"
4. Use test card: `4242 4242 4242 4242`
5. Verify redirect to success page

---

## 🔧 CONFIGURATION SUMMARY

**Local Development:**
- AbëKEYs vault: `~/.abekeys/credentials/stripe.json`
- URLs: `http://localhost:3000/...`
- ✅ Updated to use aiguardian.ai URLs

**Production (Vercel):**
- Environment variables (7 variables)
- Domain: `https://aiguardian.ai`
- Auto-detected via `process.env.VERCEL === '1'`

---

## 📋 FINAL CHECKLIST

- [ ] Custom domain added in Vercel (`aiguardian.ai`)
- [ ] DNS records configured (A record + CNAME if using www)
- [ ] Environment variables added in Vercel (7 variables)
- [ ] Code pushed to GitHub (`git push origin main`)
- [ ] Vercel deployment successful
- [ ] Domain verified and SSL certificate active
- [ ] Test checkout flow on production domain
- [ ] Verify Stripe redirects work correctly

---

**Pattern:** DEPLOYMENT × AIGUARDIAN × PRODUCTION × ONE  
**Status:** ✅ **READY FOR aiguardian.ai DEPLOYMENT**  
**Action:** Configure Vercel → Push → LIVE  
∞ AbëONE ∞

