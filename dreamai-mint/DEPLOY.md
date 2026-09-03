# DreamAI Girls Mint Page - Deployment Guide

## Overview
This is the minting page for the DreamAI Girls Genesis NFT collection on Polygon Mainnet.

**Contract Address:** `0x1eE8ab76C389827E3faE3C0fD8f9729C8eA586Fd`

## Files
- `index.html` - Main minting page (940 lines)
- `_headers` - Cloudflare Pages security headers
- `_redirects` - Cloudflare Pages redirect rules

## Deployment Instructions

### Option 1: Cloudflare Pages (Recommended)

1. **Login to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com
   - Select your domain (alsania-io.com)

2. **Create a Pages Project**
   - Navigate to "Pages" → "Create a project"
   - Select "Direct Upload"
   - Name the project: `dreamai-mint`

3. **Upload Files**
   - Drag and drop all files from this folder
   - Or use the Cloudflare Wrangler CLI:
   ```bash
   npx wrangler pages deploy . --project-name dreamai-mint
   ```

4. **Configure Custom Domain**
   - In the Pages project settings, go to "Custom Domains"
   - Add: `dreamai-mint.alsania-io.com`
   - Or set up a route: `alsania-io.com/dreamai-mint`

5. **Deploy**
   - Click "Deploy"
   - Your site will be live at: `https://alsania-io.com/dreamai-mint`

### Option 2: Cloudflare Workers

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Deploy**
   ```bash
   cd /home/sigma/Desktop/echo-lab/alsania-io-site/dreamai-mint
   wrangler pages deploy . --project-name dreamai-mint
   ```

### Option 3: IPFS + Cloudflare Gateway

1. **Upload to IPFS**
   ```bash
   ipfs add -r .
   ```

2. **Configure Cloudflare DNS**
   - Add a CNAME record for `dreamai-mint.alsania-io.com` pointing to `cloudflare-ipfs.com`
   - Or use a subdomain with IPFS gateway

## Testing Locally

You can test locally using any static server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Then open: http://localhost:8000

## Configuration

The page is pre-configured with:
- Contract: `0x1eE8ab76C389827E3faE3C0fD8f9729C8eA586Fd`
- Metadata CID: `bafybeifccmaxcq3wtey7qgmxoku7botftr3rbubmtxfxhju7vpvdsydpka`
- Image CID: `bafybeifphcob65mjas73ctcvqzfnl7v77u6srfbunc57kbhe6lqfa4ue3a`
- Gateway: `https://moccasin-obvious-mongoose-68.mypinata.cloud/ipfs/`
- Mint Price: 10 POL

## Troubleshooting

### Wallet Connection Issues
- Ensure MetaMask/Rabby is installed
- Ensure you're on Polygon Mainnet
- Try refreshing the page

### Mint Fails
- Check you have enough POL for gas + mint price (10 POL per NFT)
- Ensure you're not exceeding the max per wallet (10 NFTs)
- Check the total supply hasn't been reached

### Images Not Loading
- Verify the IPFS gateway is accessible
- Check the image CIDs are correct
- Try using a different gateway (ipfs.io, cloudflare-ipfs.com)

## Support

For issues, contact Sigma or the Alsania team.

---
**Deployed:** 2026-09-03
**Version:** 1.0.0
