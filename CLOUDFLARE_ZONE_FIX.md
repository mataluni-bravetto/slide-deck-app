# 🔧 Cloudflare Zone Configuration Fix
**Pattern:** ZONE × FIX × CLOUDFLARE × ONE  
**Frequency:** 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)  
**∞ AbëONE ∞**

---

## ✅ VERIFIED STATUS

**Domain:** `aiguardian.ai`  
**Registrar:** Namecheap  
**Nameservers:** ✅ Cloudflare
- `drake.ns.cloudflare.com`
- `marissa.ns.cloudflare.com`

**Issue:** DNS not resolving (no A records found)

---

## 🔧 FIX REQUIRED: Add DNS Records in Cloudflare

**The domain is in Cloudflare, but DNS records need to be configured.**

### Step 1: Access Cloudflare Dashboard

1. **Go to:** [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Select:** `aiguardian.ai` zone
3. **Go to:** DNS → Records

### Step 2: Add Required DNS Records

**For hybrid setup (AWS + Vercel via Worker):**

**Keep existing AWS records:**
- `@` A record → Your AWS IP (for main site)
- `www` CNAME → Your AWS hostname (if needed)

**Worker handles routing automatically:**
- No additional DNS records needed for `/convergence-*` paths
- Worker routes these paths to Vercel

### Step 3: Verify Worker Route

**Check Worker route is active:**
1. Cloudflare Dashboard → Workers & Pages → `aiguardian-routing`
2. Settings → Triggers → Routes
3. Verify: `*aiguardian.ai/convergence-*` is listed
4. If missing, add:
   - Pattern: `*aiguardian.ai/convergence-*`
   - Zone: `aiguardian.ai`

---

## 📊 DNS RECORDS CONFIGURATION

**Minimum required records:**

```
Type    Name    Content                    Proxy
A       @       YOUR_AWS_IP                Proxied (orange cloud)
CNAME   www     YOUR_AWS_HOSTNAME          Proxied (orange cloud)
```

**Note:** Worker routes `/convergence-*` paths, so no DNS records needed for those.

---

## ✅ VERIFICATION

**After adding DNS records:**

1. **Check DNS resolution:**
   ```bash
   dig aiguardian.ai A +short
   # Should return IP address
   ```

2. **Test main site:**
   ```bash
   curl -I https://aiguardian.ai/
   # Should return 200 OK (AWS site)
   ```

3. **Test Worker route:**
   ```bash
   curl -I https://aiguardian.ai/convergence-slides
   # Should return 200 OK (Vercel via Worker)
   ```

4. **Check Worker logs:**
   ```bash
   wrangler tail aiguardian-routing
   # Should show requests when route is hit
   ```

---

## 🔍 TROUBLESHOOTING

### Issue: DNS Still Not Resolving
**Check:**
- DNS records added in Cloudflare?
- Records are "Proxied" (orange cloud) or "DNS only" (gray cloud)?
- DNS propagation complete? (can take 5-60 minutes)

### Issue: Worker Route Not Working
**Check:**
- Route pattern: `*aiguardian.ai/convergence-*`
- Zone matches: `aiguardian.ai`
- Worker is deployed and active

### Issue: Main Site Broken
**Solution:** Ensure A record points to AWS IP and is proxied through Cloudflare

---

**Pattern:** ZONE × FIX × DNS × ONE  
**Status:** ⚠️ **DNS RECORDS NEEDED**  
**Action:** Add DNS records in Cloudflare → Verify → Test  
∞ AbëONE ∞

