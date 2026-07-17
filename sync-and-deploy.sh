#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}==============================================${NC}"
echo -e "${BLUE}   Sync & Deploy Alsania I/O Site${NC}"
echo -e "${BLUE}==============================================${NC}"
echo

# Step 1: Sync root files to dist (preserving dist structure)
echo -e "${BLUE}📁 Syncing root files to dist/...${NC}"

# Files and directories to copy from root to dist
# (excluding node_modules, .git, deploy scripts, and other build artifacts)
rsync -av --delete \
  --exclude='node_modules/' \
  --exclude='.git/' \
  --exclude='.gitignore' \
  --exclude='deploy-github.sh' \
  --exclude='sync-and-deploy.sh' \
  --exclude='package.json' \
  --exclude='package-lock.json' \
  --exclude='wrangler.toml' \
  --exclude='.env' \
  --exclude='dist/' \
  --exclude='.qodo/' \
  --exclude='.codacy/' \
  --exclude='.vscode/' \
  --exclude='node_modules/' \
  ./ dist/

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Files synced to dist/${NC}"
else
    echo -e "${RED}❌ Sync failed${NC}"
    exit 1
fi

# Step 2: Check git status
echo -e "\n${BLUE}📝 Checking git status...${NC}"
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠ Found uncommitted changes. Committing...${NC}"
    git add .
    git commit -m "Sync: Update site content $(date +'%Y-%m-%d %H:%M:%S')"
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Changes committed${NC}"
    else
        echo -e "${RED}❌ Commit failed${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ No uncommitted changes${NC}"
fi

# Step 3: Push to GitHub
echo -e "\n${BLUE}⬆️ Pushing to GitHub...${NC}"
git push origin main
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Pushed to GitHub${NC}"
else
    echo -e "${RED}❌ Push failed${NC}"
    exit 1
fi

# Step 4: Cloudflare Pages auto-deploys from GitHub
# No manual wrangler step needed - Cloudflare Pages auto-deploys on push to main
echo -e "\n${BLUE}☁️ Cloudflare Pages auto-deployment triggered by GitHub push${NC}"
echo -e "\n${GREEN}✅ Sync and push complete!${NC}"
echo -e "\n${BLUE}Your site should be live at:${NC}"
echo "  https://alsania-io.com"
echo "  https://alsania-dev.github.io/alsania-io-site/"
echo -e "\n${YELLOW}Note:${NC} It may take 1-2 minutes for Cloudflare Pages to build and deploy."
echo -e "${YELLOW}Note:${NC} Cloudflare cache might need purging if changes don't appear immediately."
