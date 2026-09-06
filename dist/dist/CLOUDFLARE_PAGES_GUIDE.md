# Cloudflare Pages Deployment Guide

## Current Status
✅ **GitHub Pages:** Live at https://alsania-dev.github.io/alsania-io-site/
🔧 **Cloudflare Pages:** Needs connection to GitHub repo

## Option 1: Connect Existing Cloudflare Pages to GitHub

### If you see "Connect to Git" button:
1. Go to Cloudflare Dashboard → Pages → Your Project
2. Click "Connect to Git"
3. Authorize Cloudflare to access GitHub
4. Select repository: `alsania-dev/alsania-io-site`
5. Select branch: `main`
6. **Build Settings:**
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (root)
7. Save and deploy

## Option 2: Create New Cloudflare Pages Project

### If you CAN'T connect existing project:
1. Go to Cloudflare Dashboard → Pages
2. Click "Create a project"
3. Click "Connect to Git"
4. Select `alsania-dev/alsania-io-site` repository
5. Configure:
   - **Project name:** `alsania-io-site` (or any name)
   - **Production branch:** `main`
   - **Build settings:**
     - Framework preset: None
     - Build command: (empty)
     - Build output directory: `/`
6. Click "Save and Deploy"

## Option 3: Manual Upload (Fallback)

If you want to keep manual deployment:
1. Download the `dist/` directory
2. Go to Cloudflare Pages → Your Project → Deployments
3. Click "Upload assets"
4. Upload the entire `dist/` folder

## Custom Domain Configuration

### To connect `alsania.io`:
1. In Cloudflare Pages project, go to "Custom domains"
2. Click "Set up a custom domain"
3. Enter `alsania.io`
4. Follow DNS verification steps

### If domain is already connected to old project:
1. Remove custom domain from old project first
2. Wait a few minutes
3. Add to new project

## Important Files for Cloudflare Pages

### 1. `_headers` (Already created)
Cloudflare-specific headers file for caching and security.

### 2. `_redirects` (Already exists)
Works on both GitHub Pages and Cloudflare Pages.

### 3. `.nojekyll` (Already exists)
Prevents Jekyll processing.

## Build Process

Cloudflare Pages will:
1. Clone your GitHub repository
2. Look for build configuration (we have none - static site)
3. Deploy the entire repository as-is
4. Apply `_headers` and `_redirects` rules

## Path Handling

The site already handles both environments:
- **GitHub Pages:** `/alsania-io-site/` prefix
- **Cloudflare Pages:** Root path `/`
- **Custom domain:** Root path `/`

## Testing After Deployment

1. **Check Cloudflare Pages URL:**
   `https://alsania-io-site.pages.dev/`
   
2. **Test custom domain:**
   `https://alsania.io/`

3. **Verify components load**
4. **Test download links**
5. **Check mobile responsiveness**

## Rollback Plan

If something breaks:
1. GitHub Pages remains active
2. Cloudflare Pages keeps previous deployments
3. Can revert to any previous deployment

## Support

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **GitHub Repo:** https://github.com/alsania-dev/alsania-io-site
- **Current Status:** All fixes deployed to GitHub Pages

## Aegis Notes

All technical issues resolved:
✅ Logo size fixed
✅ Download links work
✅ Components load on GitHub Pages
✅ Ready for Cloudflare Pages deployment

**Agent ID:** agent-1762537416905-h2i52nyo2
**Last deployment:** 2026-01-29
