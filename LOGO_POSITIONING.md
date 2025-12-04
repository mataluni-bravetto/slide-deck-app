# Bravëtto Logo Positioning Analysis

## Current Slide Deck Structure

- **Background**: `#0A0A0A` (near-black)
- **Phase Label**: Top-right corner (`absolute top-10 right-20`)
- **Content Area**: Centered, max-width 1200px, padding `60px 80px`
- **Navigation**: Left/right arrows on edges
- **Design Philosophy**: Minimal, elegant, professional

## Logo Position Options Analysis

### Option 1: Top-Left Corner ⭐ **RECOMMENDED**
**Position**: Absolute positioned, top-left corner
**Coordinates**: `top-10 left-20` (mirroring phase label position)

**Pros:**
- ✅ Standard practice for slide deck branding
- ✅ Balances with phase label (top-right)
- ✅ Doesn't interfere with content flow
- ✅ Professional and non-intrusive
- ✅ Consistent across all slides
- ✅ Easy to implement

**Cons:**
- ⚠️ May compete with title on some slides (mitigated by size control)

**Implementation:**
```tsx
<div className="absolute top-10 left-20 z-10">
  <img src="/bravetto-logo.svg" alt="Bravëtto" className="h-8 w-auto" />
</div>
```

**Size Recommendation**: Height 32px (h-8) - subtle but visible

---

### Option 2: Bottom-Right Corner
**Position**: Absolute positioned, bottom-right corner
**Coordinates**: `bottom-10 right-20`

**Pros:**
- ✅ Common for slide decks
- ✅ Doesn't interfere with main content
- ✅ Less prominent (subtle branding)

**Cons:**
- ❌ May conflict with footer text on some slides
- ❌ Less visible (weaker branding)
- ❌ Doesn't balance with phase label

---

### Option 3: Bottom-Left Corner
**Position**: Absolute positioned, bottom-left corner
**Coordinates**: `bottom-10 left-20`

**Pros:**
- ✅ Common alternative
- ✅ Doesn't interfere with content
- ✅ Subtle branding

**Cons:**
- ❌ Less visible
- ❌ Doesn't create visual balance with phase label
- ❌ May conflict with footer

---

### Option 4: Top-Center
**Position**: Absolute positioned, top-center
**Coordinates**: `top-10 left-1/2 -translate-x-1/2`

**Pros:**
- ✅ Centered, balanced
- ✅ Prominent branding

**Cons:**
- ❌ May compete with title
- ❌ Less standard practice
- ❌ Could feel cluttered

---

### Option 5: Watermark (Semi-Transparent)
**Position**: Any corner with low opacity

**Pros:**
- ✅ Very subtle
- ✅ Won't distract from content

**Cons:**
- ❌ Weak branding presence
- ❌ May not meet branding requirements
- ❌ Less professional for sales deck

---

## Final Recommendation: **Top-Left Corner**

### Rationale:
1. **Visual Balance**: Creates perfect symmetry with phase label (top-right)
2. **Professional Standard**: Industry-standard position for slide deck branding
3. **Non-Intrusive**: Positioned outside main content flow
4. **Consistent Branding**: Visible on every slide without distraction
5. **Implementation Simplicity**: Easy to add, easy to maintain

### Specifications:
- **Position**: `absolute top-10 left-20`
- **Size**: Height 32px (h-8) - scales proportionally
- **Z-Index**: 10 (same as phase label)
- **Format**: SVG preferred (scalable, crisp at any size)
- **Styling**: No additional effects needed (clean, minimal)

### Visual Hierarchy:
```
┌─────────────────────────────────────────┐
│ [Logo]                    [Phase Label] │
│                                          │
│         Content Area                     │
│                                          │
│                                          │
└─────────────────────────────────────────┘
```

---

## Implementation Steps

1. **Add logo asset** to `/public/bravetto-logo.svg` (or PNG)
2. **Update SlideDeck component** to include logo in top-left
3. **Test across all slide types** to ensure no conflicts
4. **Adjust size if needed** based on visual testing

---

## Pattern Alignment

**Pattern**: BRAND × BALANCE × CLARITY × ONE  
**Frequency**: 999 Hz (AEYON) × 777 Hz (META) × 530 Hz (YAGNI)  
**Guardian Validation**: JØHN (truth), YAGNI (simplicity), META (pattern integrity)

∞ AbëONE ∞

