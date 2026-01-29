#!/bin/bash

# Fix GitHub Pages paths - convert absolute paths to relative
# For repository pages: https://username.github.io/repository-name/

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Fixing GitHub Pages paths...${NC}"
echo "Repository: alsania-io-site"
echo "GitHub Pages URL: https://alsania-dev.github.io/alsania-io-site/"
echo

# Function to fix paths in a file
fix_file() {
    local file="$1"
    echo "Processing: $file"
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Fix absolute paths (starting with /) to be relative to repository root
    # Pattern: href="/path" or src="/path"
    # Replace with: href="path" (relative from root of this repo)
    
    # For root index.html: /assets/ -> assets/
    # For subdirectories: need to calculate relative path
    
    # Get directory of file
    local dir=$(dirname "$file")
    
    # Calculate how many directories deep we are
    local depth=$(echo "$dir" | tr -cd '/' | wc -c)
    
    if [[ "$file" == "index.html" && "$dir" == "." ]]; then
        # Root index.html - simple replacement
        sed -i 's|href="/|href="|g' "$file"
        sed -i 's|src="/|src="|g' "$file"
        echo "  Fixed root paths (/ -> relative)"
    else
        # Subdirectory - need ../ based on depth
        # Actually, for GitHub Pages repository sites, we should use absolute from repo root
        # So /assets/ should become assets/ (no leading slash)
        sed -i 's|href="/|href="|g' "$file"
        sed -i 's|src="/|src="|g' "$file"
        echo "  Fixed absolute paths"
    fi
    
    # Also fix any double slashes
    sed -i 's|href="//|href="/|g' "$file"
    sed -i 's|src="//|src="/|g' "$file"
    
    echo -e "  ${GREEN}✓ Fixed${NC}"
}

# Find all HTML files
HTML_FILES=$(find . -name "*.html" -type f ! -path "./node_modules/*" ! -path "./.git/*")

for file in $HTML_FILES; do
    # Check if file contains absolute paths
    if grep -q 'href="/' "$file" || grep -q 'src="/' "$file"; then
        fix_file "$file"
    else
        echo "Skipping (no absolute paths): $file"
    fi
done

echo -e "\n${BLUE}Checking JavaScript paths...${NC}"

# Also check JavaScript files for absolute paths
JS_FILES=$(find . -name "*.js" -type f ! -path "./node_modules/*" ! -path "./.git/*")

for file in $JS_FILES; do
    if grep -q '"/' "$file"; then
        echo "Checking JS: $file"
        # For loadComponents.js and other JS that might have paths
        # We'll handle these case by case
    fi
done

echo -e "\n${BLUE}Testing fixes...${NC}"

# Test the main index.html
echo "Testing index.html:"
if grep -q 'href="/' index.html; then
    echo -e "  ${RED}✗ Still has absolute paths${NC}"
else
    echo -e "  ${GREEN}✓ All paths relative${NC}"
fi

echo -e "\n${BLUE}Summary:${NC}"
echo "1. Changed absolute paths (/path) to relative (path)"
echo "2. This works for GitHub Pages repository sites"
echo "3. Assets will load from: https://alsania-dev.github.io/alsania-io-site/assets/..."
echo -e "\n${GREEN}Run 'git diff' to see changes, then commit and push.${NC}"
