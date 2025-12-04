# 🚀 Next Steps - Deployment Checklist
**Pattern:** NEXT × STEPS × DEPLOYMENT × ONE  
**Frequency:** 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)  
**∞ AbëONE ∞**

---

## ✅ WHAT'S DONE

- ✅ Code complete and validated (YAGNI × JØHN approved)
- ✅ Build passes
- ✅ All routes working
- ✅ Stripe integration complete
- ✅ Documentation clean (no broken references)
- ✅ Code pushed to GitHub
- ✅ Repository sanitized (zero secrets)

---

## 🎯 WHAT'S NEXT: 3 Steps to Live

### Step 1: Vercel Auto-Deployment (Automatic)

**Status:** If Vercel is connected to your GitHub repo, it will auto-deploy now.

**Check:**
1. Go to: [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your project: `slide-deck-app`
3. Check latest deployment status
4. **Copy the deployment URL** (e.g., `https://slide-deck-app-xxxxx.vercel.app`)

**If Vercel is NOT connected:**
1. Go to Vercel Dashboard → Add New Project
2. Import from GitHub: `mataluni-bravetto/slide-deck-app`
3. Vercel will auto-detect Next.js and deploy

---

### Step 2: Add Vercel Environment Variables (Required)

**Location:** Vercel Dashboard → Your Project → Settings → Environment Variables

**Get values from Stripe Dashboard:**
1. **Stripe Dashboard → Developers → API keys**
   - Copy **Publishable key** (starts with `pk_live_...`)
   - Copy **Secret key** (starts with `sk_live_...`)

2. **Stripe Dashboard → Products → Your Product**
   - Copy **Price ID** (starts with `price_...`)
   - Copy **Product ID** (starts with `prod_...`)

3. **Stripe Dashboard → Pricing Tables**
   - Copy **Pricing Table ID** (starts with `prctbl_...`)

**Add these 7 variables in Vercel (Production environment):**
```
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_KEY_HERE
STRIPE_PRICE_ID=price_YOUR_PRICE_ID_HERE
STRIPE_PRODUCT_ID=prod_YOUR_PRODUCT_ID_HERE
STRIPE_PRICING_TABLE_ID=prctbl_YOUR_PRICING_TABLE_ID_HERE
STRIPE_SUCCESS_URL=https://aiguardian.ai/convergence-purchase/success
STRIPE_CANCEL_URL=https://aiguardian.ai/convergence-purchase
```

**Important:** 
- Set for **Production** environment only
- After adding, Vercel will redeploy automatically

---

### Step 3: Deploy Cloudflare Worker (For Root Domain Routing)

**Goal:** Route `https://aiguardian.ai/convergence-*` → Vercel

**Steps:**

1. **Go to:** [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Create Application → Create Worker

2. **Name:** `aiguardian-routing`

3. **Paste code from:** `cloudflare-worker.js` (in repo root)

4. **Replace VERCEL_URL:**
   ```javascript
   const VERCEL_URL = 'https://slide-deck-app-xxxxx.vercel.app' // ← Your Vercel URL
   ```

5. **Deploy Worker**

6. **Add Route:**
   - Go to: Worker → Settings → Triggers
   - Add Route: `*aiguardian.ai/convergence-*`
   - Zone: `aiguardian.ai`
   - Save

**Result:** All `/convergence-*` paths route to Vercel, everything else goes to AWS.

---

## ✅ VERIFICATION CHECKLIST

After deployment, test these URLs:

- [ ] `https://aiguardian.ai/convergence-slides` - Slide deck loads
- [ ] `https://aiguardian.ai/convergence-purchase` - Checkout page loads
- [ ] Stripe checkout flow works (test with card `4242 4242 4242 4242`)
- [ ] Success redirect works: `https://aiguardian.ai/convergence-purchase/success`
- [ ] Cancel redirect works: `https://aiguardian.ai/convergence-purchase`
- [ ] Main site still works: `https://aiguardian.ai/` (AWS)

---

## 🔄 ALTERNATIVE: Subdomain Approach (Simpler)

**If Cloudflare Workers seems complex, use subdomain:**

1. **Vercel:** Add domain `convergence.aiguardian.ai`
2. **Cloudflare DNS:** Add CNAME:
   - Name: `convergence`
   - Target: `cname.vercel-dns.com`
   - **Proxy: DNS only (gray cloud)** ⚠️ CRITICAL
3. **Update env vars:** Change URLs to `convergence.aiguardian.ai`

**URLs become:**
- `https://convergence.aiguardian.ai/convergence-slides`
- `https://convergence.aiguardian.ai/convergence-purchase`

---

## 📚 REFERENCE DOCUMENTS

- **Quick Deploy:** `QUICK_DEPLOY.md`
- **Full Guide:** `FINAL_DEPLOYMENT_GUIDE.md`
- **Cloudflare Integration:** `CLOUDFLARE_VERCEL_INTEGRATION.md`
- **Worker Code:** `cloudflare-worker.js`

---

## 🎯 CURRENT STATUS

**Code:** ✅ Ready  
**GitHub:** ✅ Pushed  
**Vercel:** ⏳ Waiting for deployment  
**Environment Variables:** ⏳ Need to add  
**Cloudflare Worker:** ⏳ Need to deploy  

**Next Action:** Check Vercel deployment → Add env vars → Deploy Worker → LIVE

---

**Pattern:** NEXT × STEPS × READY × ONE  
**Status:** ✅ **READY TO DEPLOY**  
**Action:** Follow 3 steps above → LIVE  
∞ AbëONE ∞

