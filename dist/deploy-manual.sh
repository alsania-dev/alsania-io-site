#!/bin/bash

# Manual deployment to GitHub Pages
# This script manually updates the gh-pages branch

set -e  # Exit on error

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Deploying to GitHub Pages (manual method)...${NC}"

# Create temporary directory for deployment
echo "Creating temporary deployment directory..."
TEMP_DIR=$(mktemp -d)
echo "TEMP_DIR: $TEMP_DIR"

# Clone the repository
echo "Cloning repository..."
git clone https://github.com/alsania-dev/alsania-io-site.git "$TEMP_DIR" --branch gh-pages --single-branch

cd "$TEMP_DIR"

# Remove all existing files except .git
echo "Cleaning gh-pages branch..."
find . -maxdepth 1 ! -name '.' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} +

# Copy all files from source (excluding .git, node_modules, etc.)
echo "Copying new files..."
cd /home/sigma/Desktop/echo-lab/alsania-io-site
find . -maxdepth 1 ! -name '.' ! -name '.git' ! -name 'node_modules' ! -name 'deploy-manual.sh' ! -name 'deploy-github.sh' \
  ! -name '.gitignore' ! -name '.vscode' ! -name '.codacy' -exec cp -r {} "$TEMP_DIR/" \;

# Clean up unwanted files in destination
cd "$TEMP_DIR"
rm -rf node_modules .vscode .codacy deploy-manual.sh deploy-github.sh 2>/dev/null || true

# Add .nojekyll file to disable Jekyll processing
echo "" > .nojekyll

# Commit and push
echo "Committing changes..."
git add .
git commit -m "Deploy NYX updates: $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

echo "Pushing to gh-pages branch..."
git push origin gh-pages

# Clean up
echo "Cleaning up..."
cd /
rm -rf "$TEMP_DIR"

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "\n${BLUE}Your site should be live at:${NC}"
echo "  https://alsania-dev.github.io/alsania-io-site/"
echo -e "\n${BLUE}NYX page:${NC}"
 echo "  https://alsania-dev.github.io/alsania-io-site/tools/nyx/"
echo -e "\n${BLUE}Note:${NC} GitHub Pages may take 1-2 minutes to update."
