# Alsania I/O Site

Sovereign technology ecosystem website.

## 📁 Project Structure

```
├── index.html          # 👈 EDIT HERE - Main page
├── assets/             # 👈 EDIT HERE - CSS, JS, images
├── components/         # 👈 EDIT HERE - Header, footer, nav
├── tools/              # 👈 EDIT HERE - Nyx, ScrypGen, DevConX pages
├── blog/               # 👈 EDIT HERE - Blog posts
├── dist/               # 📦 DEPLOYMENT FOLDER - Auto-generated, don't edit manually
├── sync-and-deploy.sh  # 🚀 DEPLOY SCRIPT - Run this to publish changes
└── package.json        # 📦 DEPRECATED - Kept for reference only
```

## 🚀 Deployment Workflow

1. **Edit files in the root directory** (not in `dist/`)
2. **Run the deployment script:**
   ```bash
   ./sync-and-deploy.sh
   ```
3. **Wait a minute** for Cloudflare Pages to update

## 🔧 What the deploy script does

- Syncs all root files to `dist/` (excluding build artifacts)
- Commits and pushes changes to GitHub
- Deploys to Cloudflare Pages using Wrangler

## ⚠️ Important Notes

- **DO NOT edit files in `dist/`** - they get overwritten on deploy
- **The `dist/` folder is served by Cloudflare Pages**
- **Always edit the root versions** of files
- **If you see `dist/` in your editor, close it and open the root file**

## 🔗 Live URLs

- https://alsania-io.com (production)
- https://alsania-dev.github.io/alsania-io-site/ (GitHub Pages)

## 🧹 Cleanup Notes

The Node.js build system (`package.json`, `node_modules/`, `gh-pages`, `wrangler`) is no longer needed for the site. The `sync-and-deploy.sh` script handles everything.

## 📝 Contact

Questions? Ask Sigma or open an issue.
