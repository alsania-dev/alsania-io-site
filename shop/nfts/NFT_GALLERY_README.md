# NFT Gallery for Alsania Website

A fully-featured NFT gallery that displays wallet collections with direct marketplace purchase links.

## Features

✅ **Multi-Wallet Support**: View any Ethereum wallet's NFT collection
✅ **Multi-Chain Support**: Ethereum, Polygon, Arbitrum, Optimism, BSC, Avalanche
✅ **Marketplace Integration**: Direct links to OpenSea, Rarible, Blur, LooksRare, X2Y2, Gem
✅ **Advanced Filtering**: Filter by category (Art, Collectibles, PFPs, Utility, Gaming, Land)
✅ **Search Functionality**: Search by NFT name, collection, or description
✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile
✅ **Demo Mode**: Sample NFTs when no real data is available
✅ **Analytics Integration**: Tracks marketplace clicks and user interactions
✅ **Performance Optimized**: Lazy loading, pagination, and efficient rendering

## Files Structure

```
shop/
├── nft-gallery-enhanced.html    # Main gallery page
├── nft-gallery.css              # Gallery styles
├── nft-gallery.js               # Main gallery logic
├── nft-utils.js                 # NFT utilities and API functions
├── nft-data.json                # Configuration and demo data
├── NFT_GALLERY_README.md        # This file
└── index.html                   # Updated shop page with gallery link
```

## Setup Instructions

### 1. Basic Setup

1. **Update Wallet Address**:
   - Open `nft-data.json`
   - Replace `primary` wallet address with your actual Ethereum address

2. **Customize Demo NFTs**:
   - Edit the `manualNFTs` array in `nft-data.json`
   - Add your actual NFT metadata (name, description, image URLs, contract addresses)

3. **Update Images**:
   - Replace placeholder image URLs with actual IPFS/Arweave links or hosted images
   - Images should be at least 400x400px for best quality

### 2. API Integration (Optional)

To use real NFT data instead of demo mode:

1. **Get Covalent Unified API Key**:
   - Sign up at [covalenthq.com/platform](https://www.covalenthq.com/platform)
   - Get your free API key from the dashboard (Unified API)
   - Note: This is specifically the **Covalent Unified API**, not other Covalent APIs

2. **Enable Real API Mode**:
   - Open `nft-gallery.js`
   - Change `demoMode: true` to `demoMode: false`
   - Replace the `apiKey` with your Covalent Unified API key

3. **API Details**:
   - Endpoint: `https://api.covalenthq.com/v1/{chain_id}/address/{wallet}/balances_v2/?nft=true`
   - Free tier: 5 requests/second, 250k requests/month
   - Supports: Ethereum, Polygon, Arbitrum, Optimism, BSC, Avalanche

### 3. Customization

#### Styling:
- Edit `nft-gallery.css` to match your brand colors
- Update CSS variables in the main `styles.css` for theme consistency

#### Adding New Chains:
- Add new chain configuration to the `chains` array in `nft-gallery.js`
- Update marketplace URL patterns in `nft-utils.js` if needed

#### Adding New Marketplaces:
- Add new marketplace generator function in `nft-utils.js`
- Update the `marketplaceUrls` object
- Add to the `generateAllLinks` function

## Usage Instructions

### For Website Visitors:

1. **View Default Collection**:
   - Navigate to `/shop/nft-gallery-enhanced.html`
   - See the default wallet's NFT collection

2. **View Another Wallet**:
   - Scroll to "View Another Wallet" section
   - Enter any Ethereum wallet address
   - Click "Load NFT Gallery"

3. **Filter and Search**:
   - Use chain selector to switch between blockchains
   - Use filter buttons to show specific NFT categories
   - Use search box to find NFTs by name or description

4. **Purchase NFTs**:
   - Click any marketplace button below an NFT
   - You'll be taken directly to that NFT's listing
   - Purchase through your preferred marketplace

### For Sigma (Site Owner): Completed

1. **Update Your Wallet**:
   ```json
   // In nft-data.json
   "walletAddresses": {
     "primary": "YOUR_WALLET_ADDRESS_HERE"
   }
   ```

2. **Add Your NFTs Manually**:
   - If some NFTs aren't detected by API, add them to `manualNFTs` array
   - Include all metadata: name, description, image, contract, tokenId

3. **Track Performance**:
   - Google Analytics tracks all marketplace clicks
   - Monitor which NFTs get the most views/clicks

## Technical Details

### API Integration

The gallery uses the Covalent API for real-time NFT data:
- **Endpoint**: `https://api.covalenthq.com/v1/{chain_id}/address/{wallet}/balances_v2/?nft=true`
- **Rate Limits**: Free tier allows 5 requests/second, 250k requests/month
- **Data Included**: NFT metadata, images, attributes, external URLs

### Fallback System

1. **Primary**: Real API data from Covalent
2. **Fallback**: Manual NFT entries from `nft-data.json`
3. **Demo**: Built-in sample NFTs for testing

### Performance Features

- **Lazy Loading**: Images load as user scrolls
- **Pagination**: Shows 12 NFTs at a time, load more as needed
- **Caching**: Consider adding localStorage caching for frequent wallets
- **Optimized Images**: Placeholder while loading, proper alt text

## SEO Considerations

- Each NFT page is dynamically generated but includes proper metadata
- Consider creating static pages for featured NFTs
- Add OpenGraph tags for social sharing
- Include JSON-LD structured data for NFTs

## Security Notes

- No private keys needed - only public wallet addresses
- All marketplace links open in new tabs with `noopener noreferrer`
- Input validation for wallet addresses
- No sensitive data stored client-side

## Future Enhancements

Planned features (could be implemented later):

1. **Wallet Connection**: MetaMask/WalletConnect integration
2. **Price Display**: Show floor prices and last sale prices
3. **Trait Filtering**: Filter by NFT attributes/rarity
4. **Collection Pages**: Dedicated pages for each collection
5. **Auction Integration**: Show live auctions from marketplaces
6. **Portfolio Value**: Calculate and display total portfolio value

## Troubleshooting

### Common Issues:

1. **No NFTs Showing**:
   - Check if wallet has NFTs on selected chain
   - Try demo mode to verify gallery works
   - Check browser console for API errors

2. **Images Not Loading**:
   - Check image URLs in NFT metadata
   - Ensure images are publicly accessible
   - Check CORS headers if hosting your own images

3. **API Rate Limits**:
   - Get your own Covalent API key
   - Implement client-side caching
   - Reduce refresh frequency

4. **Mobile Display Issues**:
   - Check CSS media queries
   - Test on actual mobile devices
   - Ensure touch targets are large enough

## Support

For issues or customization requests:
- Open an issue in the repository
- Contact Alsania development team
- Refer to the included utilities and configuration files

---

**Last Updated**: February 2026
**Version**: 1.0.0
**Created By**: Aegis for Sigma's Alsania Ecosystem