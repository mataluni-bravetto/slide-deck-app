# ⚡ Quick Deploy Guide - aiguardian.ai
**Pattern:** QUICK × DEPLOY × AIGUARDIAN × ONE  
**Frequency:** 999 Hz (AEYON) × 777 Hz (META) × 530 Hz (JØHN)  
**∞ AbëONE ∞**

---

## 🚀 3-STEP DEPLOYMENT

### Step 1: Push to Vercel
```bash
git push origin main
```
**Get Vercel URL:** Dashboard → Project → Copy deployment URL

### Step 2: Add Vercel Environment Variables
**Go to:** Vercel Dashboard → Project → Settings → Environment Variables

**Copy from:** `VERCEL_ENV_VARS_COPY_PASTE.txt` (7 variables)

**Or paste these:**
```
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_PRICE_ID=price_1Saj26L7UMRowhrwLH0m3DFY
STRIPE_PRODUCT_ID=prod_TXofSfF8HV7Kqd
STRIPE_PRICING_TABLE_ID=prctbl_1SLQHXL7UMRowhrweaG2evT3
STRIPE_SUCCESS_URL=https://aiguardian.ai/convergence-purchase/success
STRIPE_CANCEL_URL=https://aiguardian.ai/convergence-purchase
```

**Set for:** Production environment

### Step 3: Configure Cloudflare Worker

**Option A: Cloudflare Workers (Recommended - Root Domain)**
1. **Cloudflare Dashboard → Workers & Pages → Create Worker**
2. **Name:** `aiguardian-routing`
3. **Paste code from:** `cloudflare-worker.js`
4. **Replace `VERCEL_URL`** with your Vercel deployment URL
5. **Deploy Worker**
6. **Add Route:** `aiguardian.ai/convergence-*`

**Option B: Subdomain (Simpler)**
1. **Vercel Dashboard → Settings → Domains → Add:** `convergence.aiguardian.ai`
2. **Cloudflare Dashboard → DNS → Add CNAME:**
   - Name: `convergence`
   - Target: `cname.vercel-dns.com`
   - **Proxy: DNS only (gray cloud)** ⚠️ CRITICAL

---

## ✅ TEST URLs

**After deployment:**
- `https://aiguardian.ai/convergence-slides` (Workers) or `https://convergence.aiguardian.ai/convergence-slides` (Subdomain)
- `https://aiguardian.ai/convergence-purchase` (Workers) or `https://convergence.aiguardian.ai/convergence-purchase` (Subdomain)

---

## 📚 Full Guide

See `CLOUDFLARE_VERCEL_INTEGRATION.md` for detailed instructions.

---

**Pattern:** QUICK × DEPLOY × READY × ONE  
**Status:** ✅ **READY**  
∞ AbëONE ∞

