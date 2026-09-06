#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}==============================================${NC}"
echo -e "${BLUE}   Deploying Alsania I/O Site to GitHub Pages${NC}"
echo -e "${BLUE}==============================================${NC}"
echo

# Check if we're in git repo
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Not a git repository${NC}"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${BLUE}⚠ Found uncommitted changes. Committing first...${NC}"
    
    # Add all changes
    git add .
    
    # Commit with timestamp
    COMMIT_MSG="Deploy NYX updates: Firefox addon + platform packages $(date +'%Y-%m-%d %H:%M:%S')"
    git commit -m "$COMMIT_MSG"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Changes committed${NC}"
    else
        echo -e "${RED}❌ Commit failed${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ No uncommitted changes${NC}"
fi

# Push to main branch first
echo -e "\n${BLUE}Pushing to main branch...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Pushed to main branch${NC}"
else
    echo -e "${RED}❌ Push to main failed${NC}"
    exit 1
fi

# Deploy to GitHub Pages
echo -e "\n${BLUE}Deploying to GitHub Pages...${NC}"

# Check if dist directory exists, create if not
if [ ! -d "dist" ]; then
    echo "Creating dist directory..."
    mkdir -p dist
    
    # Copy all files to dist, excluding node_modules and .git
    echo "Copying files to dist..."
    find . -maxdepth 1 ! -name '.' ! -name 'dist' ! -name 'node_modules' ! -name '.git' ! -name '.gitignore' ! -name 'deploy-github.sh' -exec cp -r {} dist/ \;
    
    # Clean up any unwanted files in dist
    rm -rf dist/node_modules dist/.git dist/deploy-github.sh 2>/dev/null || true
    
    echo -e "${GREEN}✓ Created dist directory${NC}"
fi

# Deploy using gh-pages
npx gh-pages -d dist --dotfiles

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}✅ Deployment successful!${NC}"
    echo -e "\n${BLUE}Your site should be live at:${NC}"
    echo "  https://alsania-dev.github.io/alsania-io-site/"
    echo -e "\n${BLUE}NYX page:${NC}"
    echo "  https://alsania-dev.github.io/alsania-io-site/tools/nyx/"
    echo -e "\n${BLUE}Note:${NC} It may take a few minutes for GitHub Pages to update."
else
    echo -e "\n${RED}❌ Deployment failed${NC}"
    exit 1
fi
