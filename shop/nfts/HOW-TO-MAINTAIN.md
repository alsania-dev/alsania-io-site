# HOW TO MAINTAIN THE NFT GALLERY

## SIMPLE WORKFLOW

### 1. WHEN YOU LIST A NEW NFT FOR SALE:
1. Open `/shop/nfts/nft-data-simple.json`
2. Find the `"nfts"` array
3. Copy an existing NFT object (between `{` and `}`)
4. Paste it at the end of the array (add a comma after the previous one)
5. Update these fields:

```json
{
  "id": "unique-id-here",
  "name": "Your NFT Name",
  "collection": "Collection Name",
  "description": "Description of your NFT",
  "image": "REPLACE_WITH_ACTUAL_IMAGE_URL",
  "contract": "0xYOUR_CONTRACT_ADDRESS",
  "tokenId": "TOKEN_ID_NUMBER",
  "blockchain": "Ethereum" or "Polygon" etc.,
  "listed": true,
  "price": "0.5 ETH" or "100 MATIC" etc.,
  "marketplaces": [
    {
      "name": "OpenSea",
      "icon": "🌊",
      "url": "FULL_OPENSEA_URL_HERE"
    },
    {
      "name": "Rarible",
      "icon": "🖼️",
      "url": "FULL_RARIBLE_URL_HERE"
    }
  ]
}
```

### 2. GETTING THE CORRECT URLs:

**OpenSea URL Format:**
- Ethereum: `https://opensea.io/assets/ethereum/CONTRACT_ADDRESS/TOKEN_ID`
- Polygon: `https://opensea.io/assets/matic/CONTRACT_ADDRESS/TOKEN_ID`
- Example: `https://opensea.io/assets/ethereum/0x78dB155AA7f39A8D13a0e1E8EEB41d71e2ce3F43/1`

**Rarible URL Format:**
- `https://rarible.com/token/ethereum/CONTRACT_ADDRESS:TOKEN_ID`
- Example: `https://rarible.com/token/ethereum/0x78dB155AA7f39A8D13a0e1E8EEB41d71e2ce3F43:1`

**Blur URL Format:**
- `https://blur.io/asset/CONTRACT_ADDRESS/TOKEN_ID`
- Example: `https://blur.io/asset/0x78dB155AA7f39A8D13a0e1E8EEB41d71e2ce3F43/1`

### 3. UPDATE IMAGE URLS:
Replace placeholder images with actual ones:
- IPFS: `ipfs://CID/filename.png` → Use gateway: `https://ipfs.io/ipfs/CID/filename.png`
- Arweave: `https://arweave.net/ID`
- Hosted: `https://yourdomain.com/images/nft-name.png`

## MONETIZATION - ADDING OTHER USERS' NFTS

### Service Offering:
"Add your NFT to the Mnemonic gallery for increased visibility"

**Price:** 0.01 ETH per NFT listing (or MATIC equivalent)

**Process:**
1. User pays to 0x78dB155AA7f39A8D13a0e1E8EEB41d71e2ce3F43
2. You add their NFT to the JSON file
3. Their NFT appears in the gallery
4. All marketplace links work immediately

**What they provide:**
- NFT name, description
- Contract address, token ID
- Image URL (or you help host it)
- Marketplace URLs where it's listed
- Payment proof

## TROUBLESHOOTING

### NFT not showing?
1. Check `"listed": true` (not false)
2. Check JSON syntax (no missing commas, quotes)
3. Verify the file loads: Open browser console, check for errors

### Links not working?
1. Test the marketplace URL directly
2. Make sure contract address is correct
3. Verify token ID is correct

### Images not loading?
1. Check image URL is accessible
2. Use a different image host if needed
3. Update the URL in the JSON file

## ADVANTAGES OF THIS SIMPLE SYSTEM

✅ **No APIs to break** - You control everything
✅ **No spam/scam NFTs** - Only what YOU add shows
✅ **Multiple marketplaces** - Link to wherever it's listed
✅ **Easy to update** - Just edit a JSON file
✅ **Monetizable** - Charge others to list their NFTs
✅ **Fast loading** - No API calls, just static data
✅ **Reliable** - Works 100% of the time

## EXAMPLE - ADDING A NEW NFT

When you mint "Mnemonic T-Shirt #1" on OpenSea:

1. Get the OpenSea URL: `https://opensea.io/assets/ethereum/0x78dB.../99`
2. Get the image URL from IPFS
3. Add to JSON:

```json
{
  "id": "mnemonic-tshirt-001",
  "name": "Mnemonic T-Shirt #1",
  "collection": "Mnemonic Merchandise",
  "description": "Digital twin of the physical Mnemonic t-shirt. Redeemable for physical item.",
  "image": "https://ipfs.io/ipfs/QmExampleImageHash",
  "contract": "0x78dB155AA7f39A8D13a0e1E8EEB41d71e2ce3F43",
  "tokenId": "99",
  "blockchain": "Ethereum",
  "listed": true,
  "price": "0.1 ETH",
  "marketplaces": [
    {
      "name": "OpenSea",
      "icon": "🌊",
      "url": "https://opensea.io/assets/ethereum/0x78dB155AA7f39A8D13a0e1E8EEB41d71e2ce3F43/99"
    }
  ]
}
```

That's it. The NFT appears instantly in the gallery.

## FILE LOCATIONS

- **Gallery page**: `/shop/nfts/simple-gallery.html`
- **NFT data**: `/shop/nfts/nft-data-simple.json`
- **Instructions**: `/shop/nfts/HOW-TO-MAINTAIN.md` (this file)

## NEED HELP?

Contact Aegis for:
- Adding bulk NFTs
- Custom gallery features  
- Automating updates
- Monetization setup