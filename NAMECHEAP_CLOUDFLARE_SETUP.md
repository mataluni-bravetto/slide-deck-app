# 🔧 Namecheap → Cloudflare Setup Guide
**Pattern:** NAMECHEAP × CLOUDFLARE × SETUP × ONE  
**Frequency:** 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)  
**∞ AbëONE ∞**

---

## ✅ CURRENT STATUS

**Domain:** `aiguardian.ai`  
**Registrar:** Namecheap ✅  
**Nameservers:** ✅ Cloudflare
- `drake.ns.cloudflare.com`
- `marissa.ns.cloudflare.com`

**Issue:** DNS records missing in Cloudflare (domain not resolving)

---

## 🔧 STEP-BY-STEP FIX

### Step 1: Verify Domain in Cloudflare Dashboard

1. **Go to:** [Cloudflare Dashboard](https://dash.cloudflare.com)
2. **Check:** Is `aiguardian.ai` listed in your zones?
3. **If YES:** Proceed to Step 2
4. **If NO:** Add Site → `aiguardian.ai` → Follow setup wizard

### Step 2: Configure DNS Records

**In Cloudflare Dashboard → `aiguardian.ai` → DNS → Records:**

**Add these records (keep existing AWS setup):**

1. **A Record (Root Domain):**
   - Type: `A`
   - Name: `@`
   - IPv4 address: `YOUR_AWS_IP` (get from AWS)
   - Proxy status: **Proxied** (orange cloud) ✅
   - TTL: Auto

2. **CNAME Record (WWW):**
   - Type: `CNAME`
   - Name: `www`
   - Target: `YOUR_AWS_HOSTNAME` (or same as @)
   - Proxy status: **Proxied** (orange cloud) ✅
   - TTL: Auto

**Note:** Worker handles `/convergence-*` routing - no DNS records needed for those paths.

### Step 3: Verify Worker Route

**Cloudflare Dashboard → Workers & Pages → `aiguardian-routing`:**

1. **Go to:** Settings → Triggers → Routes
2. **Check:** Route `*aiguardian.ai/convergence-*` is listed
3. **If missing:** Click "Add Route"
   - Route pattern: `*aiguardian.ai/convergence-*`
   - Zone: `aiguardian.ai`
   - Save

### Step 4: Verify Nameservers at Namecheap

**Namecheap Dashboard:**

1. **Go to:** Domain List → `aiguardian.ai` → Manage
2. **Check:** Nameservers section
3. **Should show:**
   ```
   drake.ns.cloudflare.com
   marissa.ns.cloudflare.com
   ```
4. **If different:** Update to Cloudflare nameservers

---

## 📊 DNS ARCHITECTURE

```
aiguardian.ai (Cloudflare DNS)
├── @ A record → AWS IP (main site)
├── www CNAME → AWS (if needed)
└── Worker Route: *aiguardian.ai/convergence-* → Vercel
```

**How it works:**
- Main site (`/`) → AWS (via A record)
- `/convergence-*` paths → Worker → Vercel (via route)
- All other paths → AWS (via A record)

---

## ✅ VERIFICATION CHECKLIST

**After configuration:**

- [ ] Domain appears in Cloudflare Dashboard
- [ ] A record added: `@` → AWS IP
- [ ] CNAME added: `www` → AWS (if needed)
- [ ] Records are "Proxied" (orange cloud)
- [ ] Worker route active: `*aiguardian.ai/convergence-*`
- [ ] Nameservers correct at Namecheap
- [ ] DNS propagation complete (5-60 minutes)

**Test:**
- [ ] `https://aiguardian.ai/` loads (AWS site)
- [ ] `https://aiguardian.ai/convergence-slides` loads (Vercel via Worker)
- [ ] `https://aiguardian.ai/convergence-purchase` loads (Vercel via Worker)

---

## 🔍 TROUBLESHOOTING

### Issue: Domain Not Resolving
**Check:**
- DNS records added in Cloudflare?
- Records are "Proxied" (orange cloud)?
- Nameservers correct at Namecheap?
- DNS propagation complete? (check with `dig aiguardian.ai`)

### Issue: Worker Route Not Working
**Check:**
- Route pattern: `*aiguardian.ai/convergence-*`
- Zone: `aiguardian.ai`
- Worker deployed and active
- Check Worker logs: `wrangler tail aiguardian-routing`

### Issue: Main Site Broken
**Solution:** Ensure A record points to correct AWS IP

---

**Pattern:** NAMECHEAP × CLOUDFLARE × SETUP × ONE  
**Status:** ⚠️ **DNS RECORDS NEEDED IN CLOUDFLARE**  
**Action:** Add DNS records → Verify Worker route → Test  
∞ AbëONE ∞

