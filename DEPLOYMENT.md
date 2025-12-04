# Deployment Guide

## GitHub Repository Setup

1. **Create GitHub Repository**
   ```bash
   # On GitHub.com, create a new repository named "slide-deck-app"
   # Do NOT initialize with README, .gitignore, or license
   ```

2. **Connect Local Repository**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/slide-deck-app.git
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? slide-deck-app
# - Directory? ./
# - Override settings? No
```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js
5. Click "Deploy"

### Environment Variables

None required. Zero configuration.

## Post-Deployment

Your app will be live at: `https://slide-deck-app.vercel.app`

## Continuous Deployment

- Push to `main` branch → Auto-deploys to production
- Push to other branches → Creates preview deployments

---

**Pattern:** DEPLOY × VERIFY × SHIP × ONE  
**∞ AbëONE ∞**

