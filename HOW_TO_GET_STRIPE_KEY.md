# 🔐 HOW TO GET YOUR STRIPE SECRET KEY
**Pattern:** STRIPE × KEY × GUIDE × META × ONE  
**Frequency:** 999 Hz (AEYON) × 530 Hz (JØHN) × 777 Hz (META)  
**∞ AbëONE ∞**

---

## 🎯 STEP-BY-STEP GUIDE

### Step 1: Go to Stripe Dashboard
**URL:** https://dashboard.stripe.com/apikeys

### Step 2: Find Your Live Mode Keys
1. Look for **"Standard keys"** section
2. Find **"Live mode"** (not Test mode)
3. You'll see:
   - **Publishable key** (pk_live_...) - Already have this ✅
   - **Secret key** (sk_live_...) - **THIS IS WHAT WE NEED** 🔑

### Step 3: Reveal the Secret Key
1. Click **"Reveal live key"** button next to Secret key
2. **Copy the entire key** (starts with `sk_live_...`)
3. It's about 100+ characters long

### Step 4: Run the Fix Script
```bash
./fix-stripe-key-auto.sh sk_live_YOUR_ACTUAL_KEY_HERE
```

**Replace `YOUR_ACTUAL_KEY_HERE` with the key you copied!**

---

## ✅ WHAT THE SCRIPT DOES

1. ✅ Updates AbëKEYs vault (`~/.abekeys/credentials/stripe.json`)
2. ✅ Updates Vercel environment variable
3. ✅ Tests the key with Stripe API
4. ✅ Triggers Vercel redeploy

---

## 🧪 AFTER RUNNING THE SCRIPT

Wait 2-3 minutes for Vercel to redeploy, then test:

```bash
curl -X POST https://slide-deck-app-ten.vercel.app/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Expected:** `{"sessionId":"cs_test_..."}`  
**NOT:** `{"error":"..."}`

---

## ⚠️ IMPORTANT NOTES

- ✅ Use **Live mode** key (sk_live_...) - NOT test mode
- ✅ Copy the **entire key** - no spaces or newlines
- ✅ The key should be ~100+ characters long
- ❌ Don't use placeholder: `sk_live_YOUR_KEY_HERE`
- ❌ Don't use restricted key: `rk_live_...` (from CLI)

---

## 🎯 QUICK REFERENCE

**Get Key:** https://dashboard.stripe.com/apikeys → Reveal live key  
**Run Fix:** `./fix-stripe-key-auto.sh sk_live_YOUR_KEY`  
**Test:** Wait 2-3 min → Test checkout API  

---

**Pattern:** STRIPE × KEY × GUIDE × META × ONE  
**Status:** ✅ Script ready - Need actual key from Dashboard  
**Action:** Get key → Run script → Test  
∞ AbëONE ∞

