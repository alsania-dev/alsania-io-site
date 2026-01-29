#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Verifying NYX setup..."
echo "======================="
echo

# Check if ZIP files exist
check_file() {
    if [[ -f "$1" ]]; then
        echo -e "${GREEN}✓${NC} $1"
        return 0
    else
        echo -e "${RED}✗${NC} $1 (NOT FOUND)"
        return 1
    fi
}

echo "1. Checking download files:"
check_file "downloads/win-nyx-v1.0.0.zip"
check_file "downloads/mac-nyx-v1.0.0.zip"
check_file "downloads/linux-nyx-v1.0.0.zip"
echo

# Check if HTML references correct paths
echo "2. Checking HTML references:"
if grep -q "/tools/nyx/downloads/win-nyx-v1.0.0.zip" index.html; then
    echo -e "${GREEN}✓${NC} Windows ZIP referenced correctly"
else
    echo -e "${RED}✗${NC} Windows ZIP reference missing"
fi

if grep -q "/tools/nyx/downloads/mac-nyx-v1.0.0.zip" index.html; then
    echo -e "${GREEN}✓${NC} macOS ZIP referenced correctly"
else
    echo -e "${RED}✗${NC} macOS ZIP reference missing"
fi

if grep -q "/tools/nyx/downloads/linux-nyx-v1.0.0.zip" index.html; then
    echo -e "${GREEN}✓${NC} Linux ZIP referenced correctly"
else
    echo -e "${RED}✗${NC} Linux ZIP reference missing"
fi

echo

echo "3. Checking Firefox addon references:"
if grep -q "addons.mozilla.org.*nyx-aegis" index.html; then
    echo -e "${GREEN}✓${NC} Firefox addon link present"
    firefox_link=$(grep -o 'https://addons.mozilla.org[^"]*' index.html | head -1)
    echo -e "  Link: $firefox_link"
else
    echo -e "${RED}✗${NC} Firefox addon link missing"
fi

echo

echo "4. Checking promo images:"
if [[ -f "../../assets/img/promo/get-the-addon-small.webp" ]]; then
    echo -e "${GREEN}✓${NC} Small Firefox addon button exists"
else
    echo -e "${YELLOW}⚠${NC} Small Firefox addon button not found"
fi

if [[ -f "../../assets/img/promo/get-the-addon.webp" ]]; then
    echo -e "${GREEN}✓${NC} Large Firefox addon button exists"
else
    echo -e "${YELLOW}⚠${NC} Large Firefox addon button not found"
fi

echo

echo "5. Checking JavaScript functionality:"
if grep -q "platform-download-btn" assets/js/nyx.js; then
    echo -e "${GREEN}✓${NC} Platform download buttons implemented"
else
    echo -e "${RED}✗${NC} Platform download buttons missing in JS"
fi

if grep -q "firefox_addon_click" assets/js/nyx.js; then
    echo -e "${GREEN}✓${NC} Firefox analytics tracking implemented"
else
    echo -e "${RED}✗${NC} Firefox analytics missing"
fi

echo

echo "6. Checking CSS styles:"
if grep -q "platform-download-btn" assets/css/nyx.css; then
    echo -e "${GREEN}✓${NC} Platform button styles exist"
else
    echo -e "${RED}✗${NC} Platform button styles missing"
fi

if grep -q "firefox-message" assets/css/nyx.css; then
    echo -e "${GREEN}✓${NC} Firefox message styles exist"
else
    echo -e "${RED}✗${NC} Firefox message styles missing"
fi

echo

echo "Verification complete."
echo "===================="
echo "If all checks pass, the NYX page is ready for deployment."
echo "Users will be able to:"
echo "1. Download platform-specific packages (Windows, macOS, Linux)"
echo "2. Install Firefox addon from Mozilla Addons site"
echo "3. See browser-specific messages and analytics"
echo
