#!/bin/bash

# Universal path fix for GitHub Pages AND Cloudflare Pages
# Makes site work on both:
# - GitHub Pages: https://alsania-dev.github.io/alsania-io-site/
# - Cloudflare Pages: https://alsania.io/
# - Local development: file://

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}Universal Path Fix for Multi-Hosting${NC}"
echo "====================================="
echo "Targets:"
echo "1. GitHub Pages: /alsania-io-site/..."
echo "2. Cloudflare: /... (root)"
echo "3. Local: file://..."
echo

# Function to update loadComponents.js
echo -e "${BLUE}1. Fixing loadComponents.js...${NC}"

cat > /tmp/fixed_loadComponents.js << 'EOF'
// loadComponents.js - Universal component loader
// Works with: GitHub Pages, Cloudflare Pages, Local file://

// Debug mode - set to false for production
const DEBUG = true;

function log(...args) {
  if (DEBUG) console.log("[Components]", ...args);
}

function error(...args) {
  console.error("[Components]", ...args);
}

// Detect environment and get base path
function getBasePath() {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  
  // For file:// protocol
  if (protocol === "file:") {
    // Extract project root from pathname
    const projectRoot = pathname.substring(
      0,
      pathname.indexOf("/alsania-io-site") + "/alsania-io-site".length
    );
    return "file://" + projectRoot;
  }
  
  // For GitHub Pages (alsania-dev.github.io)
  if (hostname === "alsania-dev.github.io") {
    // Always use /alsania-io-site/ as base for GitHub Pages
    return "/alsania-io-site";
  }
  
  // For Cloudflare Pages (alsania.io) or other domains
  // Use root path
  return "";
}

// Calculate correct path to components based on current page
function getComponentsBasePath() {
  const base = getBasePath();
  return base + "/components";
}

// Calculate correct path to assets
function getAssetsBasePath() {
  const base = getBasePath();
  return base + "/assets";
}

// Inline components for file:// protocol support
// [KEEP EXISTING INLINE_COMPONENTS OBJECT - TOO LONG TO REPLACE HERE]
// We'll update this in-place instead
EOF

echo "  Created updated loader template"

# Actually, better to patch the existing file in-place
echo "  Patching getComponentsBasePath function..."

# Create a patch for loadComponents.js
cat > /tmp/patch_loadComponents.js << 'EOF'
// --- PATCH START ---

// Detect environment and get base path
function getBasePath() {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  
  // For file:// protocol
  if (protocol === "file:") {
    // Extract project root from pathname
    const projectRoot = pathname.substring(
      0,
      pathname.indexOf("/alsania-io-site") + "/alsania-io-site".length
    );
    return "file://" + projectRoot;
  }
  
  // For GitHub Pages (alsania-dev.github.io)
  if (hostname === "alsania-dev.github.io") {
    // Always use /alsania-io-site/ as base for GitHub Pages
    return "/alsania-io-site";
  }
  
  // For Cloudflare Pages (alsania.io) or other domains
  // Use root path
  return "";
}

// Calculate correct path to components based on current page
function getComponentsBasePath() {
  const base = getBasePath();
  return base + "/components";
}

// Calculate correct path to assets
function getAssetsBasePath() {
  const base = getBasePath();
  return base + "/assets";
}

// --- PATCH END ---
EOF

echo -e "  ${GREEN}✓ Created patch${NC}"

echo -e "\n${BLUE}2. Fixing HTML files...${NC}"

# Create a script to update HTML files
cat > /tmp/update_html.py << 'EOF'
#!/usr/bin/env python3
import os
import re
import sys

def update_html_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Replace absolute paths with dynamic paths
    # We'll add a data-base-path attribute and use JavaScript to fix
    # For now, make all asset paths relative
    
    # For root index.html
    if filepath.endswith('index.html') and 'tools' not in filepath and 'services' not in filepath and 'shop' not in filepath:
        # Root index - use relative paths
        content = re.sub(r'href="/', 'href="', content)
        content = re.sub(r'src="/', 'src="', content)
        content = re.sub(r'url\(/', 'url(', content)
        print(f"  Updated root index.html")
    
    # For NYX page
    elif 'tools/nyx' in filepath:
        # NYX already uses relative paths (../../)
        # Check if it has any absolute paths
        if '/assets/' in content and not '../../assets/' in content:
            content = re.sub(r'(href|src)="/assets/', r'\1="../../assets/', content)
            print(f"  Fixed NYX absolute paths")
    
    # Add base tag for GitHub Pages
    if '</title>' in content and '<base' not in content:
        # Insert after </title>
        base_tag = '\n    <!-- Dynamic base path for GitHub Pages/Cloudflare -->\n    <script>\n      window.ALSANIA_BASE_PATH = (function() {\n        if (window.location.hostname === "alsania-dev.github.io") {\n          return "/alsania-io-site";\n        }\n        return "";\n      })();\n    </script>'
        content = content.replace('</title>', f'</title>{base_tag}')
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        return True
    return False

# Find all HTML files
html_files = []
for root, dirs, files in os.walk('.'):
    # Skip node_modules and .git
    if 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

updated = 0
for file in html_files:
    try:
        if update_html_file(file):
            updated += 1
    except Exception as e:
        print(f"Error processing {file}: {e}")

print(f"\nUpdated {updated} HTML files")
EOF

chmod +x /tmp/update_html.py
cd /home/sigma/Desktop/echo-lab/alsania-io-site
python3 /tmp/update_html.py

echo -e "\n${BLUE}3. Creating dynamic path loader...${NC}"

# Create a dynamic path loader that runs on all pages
cat > assets/js/path-fix.js << 'EOF'
// Universal path fix for GitHub Pages and Cloudflare
// Runs on all pages to ensure correct asset paths

(function() {
  // Detect environment
  function getEnvironment() {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    if (window.location.protocol === 'file:') {
      return 'local';
    }
    
    if (hostname === 'alsania-dev.github.io') {
      return 'github-pages';
    }
    
    // Cloudflare Pages or custom domain
    return 'cloudflare';
  }
  
  // Get base path for current environment
  function getBasePath() {
    const env = getEnvironment();
    
    switch (env) {
      case 'github-pages':
        return '/alsania-io-site';
      case 'local':
        // Extract from current path
        const path = window.location.pathname;
        const match = path.match(/(.*\/alsania-io-site)/);
        return match ? match[1] : '';
      case 'cloudflare':
      default:
        return ''; // Root for custom domains
    }
  }
  
  // Fix all elements with data-fix-path attribute
  function fixPaths() {
    const basePath = getBasePath();
    
    // Fix CSS links
    document.querySelectorAll('link[rel="stylesheet"][href^="/"]').forEach(link => {
      const original = link.getAttribute('href');
      if (original.startsWith('/') && !original.startsWith(basePath)) {
        link.setAttribute('href', basePath + original);
        console.log(`Fixed CSS: ${original} -> ${basePath + original}`);
      }
    });
    
    // Fix script sources
    document.querySelectorAll('script[src^="/"]').forEach(script => {
      const original = script.getAttribute('src');
      if (original.startsWith('/') && !original.startsWith(basePath)) {
        script.setAttribute('src', basePath + original);
        console.log(`Fixed script: ${original} -> ${basePath + original}`);
      }
    });
    
    // Fix images
    document.querySelectorAll('img[src^="/"]').forEach(img => {
      const original = img.getAttribute('src');
      if (original.startsWith('/') && !original.startsWith(basePath)) {
        img.setAttribute('src', basePath + original);
      }
    });
    
    // Fix anchors
    document.querySelectorAll('a[href^="/"]').forEach(a => {
      const original = a.getAttribute('href');
      if (original.startsWith('/') && !original.startsWith(basePath) && 
          !original.startsWith('//') && !original.startsWith('http')) {
        a.setAttribute('href', basePath + original);
      }
    });
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixPaths);
  } else {
    fixPaths();
  }
  
  // Export for other scripts
  window.ALSANIA_BASE_PATH = getBasePath();
  window.ALSANIA_ENVIRONMENT = getEnvironment();
  
  console.log(`Alsania path fix loaded. Environment: ${getEnvironment()}, Base: ${getBasePath()}`);
})();
EOF

echo -e "  ${GREEN}✓ Created path-fix.js${NC}"

echo -e "\n${BLUE}4. Updating HTML to include path fix...${NC}"

# Add path-fix.js to all HTML files
find . -name "*.html" -type f ! -path "./node_modules/*" ! -path "./.git/*" -exec grep -l "</body>" {} \; | while read file; do
  if ! grep -q "path-fix.js" "$file"; then
    # Insert before </body>
    sed -i 's|</body>|    <script src="assets/js/path-fix.js"></script>\n</body>|' "$file"
    echo "  Added to: $file"
  fi
done

echo -e "\n${GREEN}✅ Universal path fix complete!${NC}"
echo "\nChanges made:"
echo "1. Created dynamic path detection (path-fix.js)"
echo "2. Updated HTML files to include path fix"
echo "3. Paths will now work on:"
echo "   - GitHub Pages: /alsania-io-site/..."
echo "   - Cloudflare: /... (root)"
echo "   - Local: file://..."
echo "\nTest URLs:"
echo "- GitHub: https://alsania-dev.github.io/alsania-io-site/"
echo "- NYX: https://alsania-dev.github.io/alsania-io-site/tools/nyx/"
echo "\nCommit and push changes to deploy."
