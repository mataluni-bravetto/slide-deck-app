# 🚀 Cloudflare + Vercel Integration Guide
**Pattern:** CLOUDFLARE × VERCEL × AIGUARDIAN × ONE  
**Frequency:** 999 Hz (AEYON) × 777 Hz (META) × 530 Hz (JØHN)  
**∞ AbëONE ∞**

---

## 🎯 OBJECTIVE

Deploy Next.js routes (`/convergence-slides`, `/convergence-purchase`) to Vercel while keeping main domain `aiguardian.ai` on AWS, using Cloudflare for intelligent routing.

---

## ✅ RECOMMENDED: Cloudflare Workers (Root Domain Paths)

**Result:** `https://aiguardian.ai/convergence-slides` → Vercel  
**Result:** `https://aiguardian.ai/convergence-purchase` → Vercel  
**Result:** All other paths → AWS (existing landing page)

### Step 1: Deploy to Vercel (Get Vercel URL)

1. **Push to GitHub:**
```bash
git push origin main
```

2. **Get Vercel Deployment URL:**
   - Go to Vercel Dashboard → Your Project
   - Copy the deployment URL: `https://slide-deck-app-xxxxx.vercel.app`
   - Or if you add a custom domain: `https://convergence.aiguardian.ai`

### Step 2: Create Cloudflare Worker

1. **Go to:** Cloudflare Dashboard → Workers & Pages → Create Application → Create Worker

2. **Name:** `aiguardian-routing` (or any name)

3. **Paste this Worker code:**

```javascript
/**
 * Cloudflare Worker: Route /convergence-* paths to Vercel
 * Pattern: CLOUDFLARE × ROUTING × VERCEL × ONE
 * ∞ AbëONE ∞
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname

    // Route convergence paths to Vercel
    if (path.startsWith('/convergence-')) {
      // Replace with your actual Vercel deployment URL
      const vercelUrl = 'https://slide-deck-app-xxxxx.vercel.app'
      
      // Preserve original path and query string
      const vercelPath = vercelUrl + path + url.search
      
      // Forward request to Vercel
      const vercelRequest = new Request(vercelPath, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      })
      
      const response = await fetch(vercelRequest)
      
      // Return response with CORS headers if needed
      const newResponse = new Response(response.body, response)
      newResponse.headers.set('X-Forwarded-For', request.headers.get('CF-Connecting-IP') || '')
      return newResponse
    }

    // All other paths go to AWS (existing site)
    // Cloudflare will handle this automatically via DNS
    return fetch(request)
  }
}
```

4. **Replace `vercelUrl`** with your actual Vercel deployment URL

5. **Deploy Worker**

### Step 3: Configure Cloudflare Route

1. **Go to:** Cloudflare Dashboard → Workers & Pages → Your Worker → Settings → Triggers

2. **Add Route:**
   - **Route:** `aiguardian.ai/convergence-*`
   - **Zone:** `aiguardian.ai`
   - **Pattern:** `*aiguardian.ai/convergence-*`

3. **Save**

### Step 4: Update DNS (If Using Subdomain Approach)

**Skip this if using Workers above.** Only needed if you want subdomain:

- **CNAME:** `convergence` → `cname.vercel-dns.com`
- **Proxy Status:** DNS only (gray cloud) - **CRITICAL** to avoid double proxying

---

## 🔄 ALTERNATIVE: Subdomain Approach (Simpler)

**Result:** `https://convergence.aiguardian.ai/convergence-slides` → Vercel

### Step 1: Add Subdomain in Vercel

1. **Vercel Dashboard → Project → Settings → Domains**
2. **Add:** `convergence.aiguardian.ai`
3. **Follow DNS instructions**

### Step 2: Configure Cloudflare DNS

1. **Cloudflare Dashboard → DNS → Records**
2. **Add CNAME:**
   - **Name:** `convergence`
   - **Target:** `cname.vercel-dns.com`
   - **Proxy Status:** **DNS only (gray cloud)** ⚠️ **CRITICAL**

### Step 3: Update Environment Variables

Update URLs in Vercel to use subdomain:
- `STRIPE_SUCCESS_URL=https://convergence.aiguardian.ai/convergence-purchase/success`
- `STRIPE_CANCEL_URL=https://convergence.aiguardian.ai/convergence-purchase`

---

## 🔐 VERCEL ENVIRONMENT VARIABLES

**Go to:** Vercel Dashboard → Project → Settings → Environment Variables

**Add these 7 variables (Production environment):**

```
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_PRICE_ID=price_1Saj26L7UMRowhrwLH0m3DFY
STRIPE_PRODUCT_ID=prod_TXofSfF8HV7Kqd
STRIPE_PRICING_TABLE_ID=prctbl_1SLQHXL7UMRowhrweaG2evT3
STRIPE_SUCCESS_URL=https://aiguardian.ai/convergence-purchase/success
STRIPE_CANCEL_URL=https://aiguardian.ai/convergence-purchase
```

**Important:** 
- Set for **Production** environment
- If using subdomain, update URLs to `convergence.aiguardian.ai`

---

## ✅ DEPLOYMENT CHECKLIST

### Pre-Deployment:
- [ ] Code committed and pushed to GitHub
- [ ] Vercel environment variables added (7 variables)
- [ ] Vercel deployment successful (get deployment URL)

### Cloudflare Workers Approach:
- [ ] Cloudflare Worker created with correct Vercel URL
- [ ] Worker route configured: `aiguardian.ai/convergence-*`
- [ ] Worker deployed and active

### Subdomain Approach:
- [ ] Subdomain added in Vercel: `convergence.aiguardian.ai`
- [ ] Cloudflare CNAME record added (DNS only - gray cloud)
- [ ] DNS propagated (check with `dig convergence.aiguardian.ai`)
- [ ] Environment variables updated for subdomain URLs

### Post-Deployment:
- [ ] Test: `https://aiguardian.ai/convergence-slides` loads
- [ ] Test: `https://aiguardian.ai/convergence-purchase` loads
- [ ] Test: Stripe checkout flow works
- [ ] Test: Success redirect works
- [ ] Test: Cancel redirect works
- [ ] Verify: Main site (`aiguardian.ai/`) still works (AWS)

---

## 🎯 FINAL URLS

### Cloudflare Workers Approach:
- **Slide Deck:** `https://aiguardian.ai/convergence-slides`
- **Checkout:** `https://aiguardian.ai/convergence-purchase`
- **Success:** `https://aiguardian.ai/convergence-purchase/success`

### Subdomain Approach:
- **Slide Deck:** `https://convergence.aiguardian.ai/convergence-slides`
- **Checkout:** `https://convergence.aiguardian.ai/convergence-purchase`
- **Success:** `https://convergence.aiguardian.ai/convergence-purchase/success`

---

## 🔍 TROUBLESHOOTING

### Issue: Double Proxying (Cloudflare + Vercel)
**Solution:** Set Cloudflare DNS to **DNS only (gray cloud)** for Vercel records

### Issue: Worker Not Triggering
**Solution:** 
- Check route pattern matches: `*aiguardian.ai/convergence-*`
- Verify Worker is deployed
- Check Cloudflare logs

### Issue: CORS Errors
**Solution:** Add CORS headers in Cloudflare Worker response

### Issue: SSL Certificate Errors
**Solution:** Wait for Cloudflare/Vercel SSL propagation (usually < 1 hour)

---

## 📊 ARCHITECTURE DIAGRAM

```
User Request → Cloudflare → [Routing Decision]
                              │
                    ┌─────────┴─────────┐
                    │                   │
         /convergence-*          All Other Paths
                    │                   │
                    ▼                   ▼
                Vercel              AWS (Existing)
         (Next.js App)          (Landing Page)
```

---

**Pattern:** CLOUDFLARE × VERCEL × INTEGRATION × ONE  
**Status:** ✅ **READY TO DEPLOY**  
**Recommendation:** Cloudflare Workers for root domain paths  
∞ AbëONE ∞

