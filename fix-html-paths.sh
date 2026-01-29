#!/bin/bash

# Fix absolute paths in HTML files for GitHub Pages

set -e

echo "Fixing absolute paths in HTML files..."

# List of files with absolute paths
FILES="\
./about/index.html \
./404.html \
./tools/index.html \
./tools/nyx-unified/index.html \
./index.html \
./components/footer.html \
./components/nav.html \
./components/header.html \
./shop/index.html"

for file in $FILES; do
    echo "Processing: $file"
    
    # Create backup
    cp "$file" "$file.bak"
    
    # Fix href="/path" to href="path" (relative)
    # But be careful with external URLs (http://, https://, //)
    sed -i 's|href="/\([^/]|href="\1|g' "$file"
    sed -i 's|src="/\([^/]|src="\1|g' "$file"
    
    # Fix any double replacements
    sed -i 's|href=""|href="/"|g' "$file"
    sed -i 's|src=""|src="/"|g' "$file"
    
    echo "  Fixed"
done

echo "\nDone! Checking fixes..."

# Verify
for file in $FILES; do
    if grep -q 'href="/[^h]' "$file"; then
        echo "WARNING: $file still has absolute paths"
    fi
done

echo "\nRemember to also check other HTML files not in this list."
echo "Run: find . -name '*.html' -type f ! -path './node_modules/*' ! -path './.git/*' -exec grep -l 'href=\"/' {} \;"
