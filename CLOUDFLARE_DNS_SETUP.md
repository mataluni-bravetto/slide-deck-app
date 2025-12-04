# 🔧 Cloudflare DNS Setup - aiguardian.ai
**Pattern:** DNS × CLOUDFLARE × NAMECHEAP × ONE  
**Frequency:** 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)  
**∞ AbëONE ∞**

---

## 🎯 OBJECTIVE

Configure `aiguardian.ai` (Namecheap registrar) → Cloudflare DNS → Worker routing

---

## ✅ VERIFICATION STEPS

### Step 1: Verify Domain in Cloudflare

**Check if domain is in Cloudflare:**
1. Go to: [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Check if `aiguardian.ai` appears in your zones
3. If not present: Add Site → `aiguardian.ai`

### Step 2: Verify Nameservers

**Current nameservers should be Cloudflare:**
```
dante.ns.cloudflare.com
gail.ns.cloudflare.com
```
(Or similar Cloudflare nameservers)

**If not Cloudflare nameservers:**
- Domain is not fully connected to Cloudflare
- Need to update nameservers at Namecheap

---

## 🔧 NAMECHEAP → CLOUDFLARE CONNECTION

### Option A: Domain Already in Cloudflare

**If domain is already in Cloudflare Dashboard:**

1. **Get Cloudflare Nameservers:**
   - Cloudflare Dashboard → `aiguardian.ai` → Overview
   - Copy the two nameservers shown

2. **Update at Namecheap:**
   - Namecheap Dashboard → Domain List → `aiguardian.ai` → Manage
   - Go to: **Nameservers** section
   - Select: **Custom DNS**
   - Enter Cloudflare nameservers:
     ```
     dante.ns.cloudflare.com
     gail.ns.cloudflare.com
     ```
   - Save changes

3. **Wait for Propagation:**
   - Usually 5-60 minutes
   - Can take up to 48 hours (rare)

### Option B: Add Domain to Cloudflare

**If domain is NOT in Cloudflare:**

1. **Cloudflare Dashboard:**
   - Add a Site → Enter `aiguardian.ai`
   - Select Free plan
   - Cloudflare scans existing DNS records

2. **Review DNS Records:**
   - Cloudflare will import existing records
   - Verify all records are correct
   - **Important:** Keep existing A/CNAME records for AWS hosting

3. **Get Nameservers:**
   - Cloudflare provides nameservers
   - Copy both nameservers

4. **Update Namecheap:**
   - Follow steps in Option A above

---

## 🔍 VERIFY WORKER ROUTE

**After DNS is configured:**

1. **Check Worker Route:**
   - Cloudflare Dashboard → Workers & Pages → `aiguardian-routing`
   - Go to: Settings → Triggers → Routes
   - Verify: `*aiguardian.ai/convergence-*` is listed

2. **If Route Missing:**
   - Add Route manually:
     - Pattern: `*aiguardian.ai/convergence-*`
     - Zone: `aiguardian.ai`
   - Save

---

## 📊 DNS RECORDS NEEDED

**For hybrid setup (AWS + Vercel):**

**Keep existing records for AWS:**
- `@` A record → AWS IP (for main site)
- `www` CNAME → AWS (if needed)

**Worker handles routing:**
- `/convergence-*` paths → Worker → Vercel
- All other paths → AWS (via existing DNS)

**No additional DNS records needed** - Worker handles routing!

---

## ✅ VERIFICATION COMMANDS

**Check DNS resolution:**
```bash
dig aiguardian.ai NS +short
# Should show Cloudflare nameservers

dig aiguardian.ai A +short
# Should show IP addresses

nslookup aiguardian.ai
# Should resolve correctly
```

**Test Worker:**
```bash
curl -I https://aiguardian.ai/convergence-slides
# Should return 200 OK (after DNS propagates)
```

---

## 🔄 TROUBLESHOOTING

### Issue: Domain Not Resolving
**Check:**
- Nameservers updated at Namecheap?
- DNS propagation complete? (can take time)
- Domain active in Cloudflare Dashboard?

### Issue: Worker Route Not Working
**Check:**
- Route pattern correct: `*aiguardian.ai/convergence-*`
- Zone matches: `aiguardian.ai`
- Worker deployed and active?

### Issue: Main Site Broken
**Solution:** Keep existing A records pointing to AWS - Worker only routes `/convergence-*` paths

---

**Pattern:** DNS × SETUP × NAMECHEAP × ONE  
**Status:** ⏳ **VERIFYING DNS CONFIGURATION**  
**Action:** Check Cloudflare Dashboard → Update Namecheap nameservers → Verify  
∞ AbëONE ∞

