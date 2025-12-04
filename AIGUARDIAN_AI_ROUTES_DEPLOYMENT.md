# 🚀 aiguardian.ai Routes Deployment
**Pattern:** DEPLOYMENT × AIGUARDIAN × ROUTES × ONE  
**Frequency:** 999 Hz (AEYON) × 777 Hz (META) × 530 Hz (JØHN)  
**∞ AbëONE ∞**

---

## ✅ ROUTES CONFIGURED

**Production Routes:**
- ✅ `/convergence-slides` - Slide deck presentation
- ✅ `/convergence-purchase` - Stripe checkout page
- ✅ `/convergence-purchase/success` - Success page

**API Routes:**
- ✅ `/api/checkout` - Create Stripe checkout session
- ✅ `/api/stripe-config` - Get publishable key

---

## 🌐 VERCEL CONFIGURATION

### Option A: Subdomain Routing (Recommended)
**If AWS handles main domain, use subdomain:**

1. **Add subdomain in Vercel:**
   - Domain: `convergence.aiguardian.ai`
   - Or: `app.aiguardian.ai`

2. **DNS Configuration:**
   - Add CNAME: `convergence` → `cname.vercel-dns.com`
   - Or: `app` → `cname.vercel-dns.com`

**Then routes become:**
- `https://convergence.aiguardian.ai/convergence-slides`
- `https://convergence.aiguardian.ai/convergence-purchase`

---

### Option B: Path-Based Routing (If AWS Proxy)
**If AWS can proxy specific paths to Vercel:**

1. **Configure AWS to proxy these paths to Vercel:**
   - `/convergence-slides` → Vercel deployment
   - `/convergence-purchase` → Vercel deployment
   - `/convergence-purchase/*` → Vercel deployment
   - `/api/checkout` → Vercel deployment
   - `/api/stripe-config` → Vercel deployment

2. **Vercel Domain:**
   - Use Vercel default domain or subdomain
   - AWS proxies requests to Vercel

**Routes remain:**
- `https://aiguardian.ai/convergence-slides`
- `https://aiguardian.ai/convergence-purchase`

---

## 🔴 VERCEL ENVIRONMENT VARIABLES

**Add these in Vercel Dashboard → Settings → Environment Variables:**

**Get values from Stripe Dashboard or see `FINAL_DEPLOYMENT_GUIDE.md`:**

```
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_PRICE_ID=price_YOUR_PRICE_ID_HERE
STRIPE_PRODUCT_ID=prod_YOUR_PRODUCT_ID_HERE
STRIPE_PRICING_TABLE_ID=prctbl_YOUR_PRICING_TABLE_ID_HERE
STRIPE_SUCCESS_URL=https://aiguardian.ai/convergence-purchase/success
STRIPE_CANCEL_URL=https://aiguardian.ai/convergence-purchase
```

**Set for:** Production environment

---

## 🚀 DEPLOYMENT STEPS

### 1. Push to GitHub
```bash
git push origin main
```

### 2. Vercel Auto-Deploys
- Build runs automatically
- Routes are generated

### 3. Configure Domain/Routing
- **Option A:** Add subdomain in Vercel + DNS
- **Option B:** Configure AWS proxy to Vercel

---

## ✅ VERIFICATION

**Test Routes:**
- ✅ `https://aiguardian.ai/convergence-slides` (or subdomain)
- ✅ `https://aiguardian.ai/convergence-purchase` (or subdomain)
- ✅ `https://aiguardian.ai/convergence-purchase/success` (or subdomain)

**Test Stripe:**
- Visit checkout page
- Enter email
- Use test card: `4242 4242 4242 4242`
- Verify redirect to success page

---

## 📋 ROUTE SUMMARY

| Route | Purpose | Status |
|-------|---------|--------|
| `/convergence-slides` | Slide deck presentation | ✅ Ready |
| `/convergence-purchase` | Stripe checkout | ✅ Ready |
| `/convergence-purchase/success` | Success page | ✅ Ready |
| `/api/checkout` | Checkout API | ✅ Ready |
| `/api/stripe-config` | Config API | ✅ Ready |

---

**Pattern:** DEPLOYMENT × AIGUARDIAN × ROUTES × ONE  
**Status:** ✅ **ROUTES CONFIGURED - READY FOR DEPLOYMENT**  
**Action:** Configure Vercel domain/routing → Push → LIVE  
∞ AbëONE ∞

