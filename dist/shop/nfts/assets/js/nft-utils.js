// NFT Gallery Utilities

// Configuration
const CONFIG = {
    demoMode: false,
    apiKey: 'cqt_rQJpWVjvYH4xTv8QWyF7D3qYqB8k', // Covalent Unified API key
    itemsPerPage: 12,
    chains: [
        { id: 1, name: 'Ethereum', symbol: 'eth', apiName: 'eth-mainnet' },
        { id: 137, name: 'Polygon', symbol: 'matic', apiName: 'matic-mainnet' },
        { id: 42161, name: 'Arbitrum', symbol: 'arb', apiName: 'arbitrum-mainnet' },
        { id: 10, name: 'Optimism', symbol: 'op', apiName: 'optimism-mainnet' },
        { id: 56, name: 'BSC', symbol: 'bsc', apiName: 'bsc-mainnet' },
        { id: 43114, name: 'Avalanche', symbol: 'avax', apiName: 'avalanche-mainnet' }
    ],
    categories: [
        { id: 'all', name: 'All NFTs', icon: '🖼️' },
        { id: 'art', name: 'Art', icon: '🎨' },
        { id: 'collectible', name: 'Collectibles', icon: '🏆' },
        { id: 'pfp', name: 'Profile Pictures', icon: '👤' },
        { id: 'utility', name: 'Utility', icon: '⚙️' },
        { id: 'gaming', name: 'Gaming', icon: '🎮' },
        { id: 'land', name: 'Virtual Land', icon: '🌐' }
    ]
};

// Marketplace URL generators
const marketplaceUrls = {
    opensea: (contract, tokenId, chain) => {
        const chainPaths = {
            'ethereum': '',
            'matic': 'matic/',
            'arbitrum': 'arbitrum/',
            'optimism': 'optimism/',
            'polygon': 'matic/',
            'bsc': '',
            'avalanche': ''
        };
        const path = chainPaths[chain] || '';
        return `https://opensea.io/assets/${path}${contract}/${tokenId}`;
    },
    
    rarible: (contract, tokenId, chain) => {
        const chainNames = {
            'ethereum': 'ethereum',
            'matic': 'polygon',
            'polygon': 'polygon',
            'arbitrum': 'arbitrum',
            'optimism': 'optimism',
            'bsc': '',
            'avalanche': ''
        };
        const chainName = chainNames[chain];
        if (!chainName) return null;
        return `https://rarible.com/token/${chainName}/${contract}:${tokenId}`;
    },
    
    blur: (contract, tokenId, chain) => {
        if (chain !== 'ethereum') return null;
        return `https://blur.io/asset/${contract}/${tokenId}`;
    },
    
    looksrare: (contract, tokenId, chain) => {
        if (chain !== 'ethereum') return null;
        return `https://looksrare.org/collections/${contract}/${tokenId}`;
    }
};

// Generate all marketplace links for an NFT
function generateMarketplaceLinks(nft) {
    const links = [];
    
    // Check if nft has marketplaceLinks from manual data
    if (nft.marketplaceLinks) {
        Object.entries(nft.marketplaceLinks).forEach(([marketplace, url]) => {
            if (url) {
                links.push({
                    name: marketplace.charAt(0).toUpperCase() + marketplace.slice(1),
                    url: url,
                    icon: getMarketplaceIcon(marketplace)
                });
            }
        });
        return links;
    }
    
    // Generate links from contract data
    const marketplaces = ['opensea', 'rarible', 'blur', 'looksrare'];
    marketplaces.forEach(marketplace => {
        const url = marketplaceUrls[marketplace](
            nft.contract_address || nft.contract,
            nft.token_id || nft.tokenId,
            nft.chain || 'ethereum'
        );
        
        if (url) {
            links.push({
                name: marketplace.charAt(0).toUpperCase() + marketplace.slice(1),
                url: url,
                icon: getMarketplaceIcon(marketplace)
            });
        }
    });
    
    return links;
}

function getMarketplaceIcon(marketplace) {
    const icons = {
        opensea: '🌊',
        rarible: '🖼️',
        blur: '🌀',
        looksrare: '👀'
    };
    return icons[marketplace] || '🔗';
}

// Format wallet address
function formatWalletAddress(address) {
    if (!address) return 'Not set';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Validate Ethereum address
function isValidEthereumAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Fetch NFTs from Covalent API
async function fetchNFTsFromAPI(walletAddress, chainId) {
    if (CONFIG.demoMode) {
        return await loadDemoNFTs();
    }
    
    try {
        const chain = CONFIG.chains.find(c => c.id === chainId);
        if (!chain) throw new Error(`Unsupported chain: ${chainId}`);
        
        const url = `https://api.covalenthq.com/v1/${chain.apiName}/address/${walletAddress}/balances_v2/?nft=true&key=${CONFIG.apiKey}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        
        const data = await response.json();
        
        // Process API response
        const nfts = [];
        if (data.data && data.data.items) {
            data.data.items.forEach(item => {
                if (item.nft_data && item.nft_data.length > 0) {
                    item.nft_data.forEach(nft => {
                        nfts.push({
                            id: `${item.contract_address}_${nft.token_id}`,
                            name: nft.external_data?.name || `#${nft.token_id}`,
                            collection: item.contract_name || 'Unknown Collection',
                            description: nft.external_data?.description || 'No description',
                            image: nft.external_data?.image || nft.external_data?.image_256 || 'https://via.placeholder.com/400x400/2a3147/00d4ff?text=NFT',
                            contract: item.contract_address,
                            tokenId: nft.token_id,
                            category: determineCategory(item.contract_ticker_symbol || '', nft.external_data?.description || ''),
                            chain: chain.symbol,
                            attributes: nft.external_data?.attributes || [],
                            contract_name: item.contract_name
                        });
                    });
                }
            });
        }
        
        return nfts;
    } catch (error) {
        console.error('Error fetching NFTs from API:', error);
        // Fallback to demo NFTs
        return await loadDemoNFTs();
    }
}

// Load demo NFTs from local data
async function loadDemoNFTs() {
    try {
        const response = await fetch('nft-data.json');
        if (!response.ok) throw new Error('Failed to load demo data');
        
        const data = await response.json();
        return data.manualNFTs || [];
    } catch (error) {
        console.error('Error loading demo NFTs:', error);
        // Return hardcoded fallback NFTs
        return [
            {
                id: 'demo-1',
                name: 'Demo NFT #1',
                collection: 'Demo Collection',
                description: 'This is a demo NFT for testing the gallery.',
                image: 'https://via.placeholder.com/400x400/00d4ff/0a0e17?text=Demo+NFT+1',
                contract: '0x0000000000000000000000000000000000000000',
                tokenId: '1',
                category: 'art',
                chain: 'ethereum',
                attributes: [
                    { trait_type: 'Type', value: 'Demo' },
                    { trait_type: 'Purpose', value: 'Testing' }
                ]
            },
            {
                id: 'demo-2',
                name: 'Demo NFT #2',
                collection: 'Demo Collection',
                description: 'Another demo NFT for testing purposes.',
                image: 'https://via.placeholder.com/400x400/4caf50/1a1f2e?text=Demo+NFT+2',
                contract: '0x0000000000000000000000000000000000000000',
                tokenId: '2',
                category: 'collectible',
                chain: 'ethereum',
                attributes: [
                    { trait_type: 'Type', value: 'Demo' },
                    { trait_type: 'Purpose', value: 'Testing' }
                ]
            }
        ];
    }
}

// Determine NFT category based on name and description
function determineCategory(ticker, description) {
    const lowerDesc = description.toLowerCase();
    const lowerTicker = ticker.toLowerCase();
    
    if (lowerDesc.includes('profile picture') || lowerDesc.includes('pfp') || lowerTicker.includes('pfp')) {
        return 'pfp';
    }
    if (lowerDesc.includes('game') || lowerDesc.includes('gaming') || lowerTicker.includes('game')) {
        return 'gaming';
    }
    if (lowerDesc.includes('land') || lowerDesc.includes('parcel') || lowerDesc.includes('estate')) {
        return 'land';
    }
    if (lowerDesc.includes('utility') || lowerDesc.includes('access') || lowerDesc.includes('ticket')) {
        return 'utility';
    }
    if (lowerDesc.includes('collectible') || lowerDesc.includes('card') || lowerDesc.includes('figure')) {
        return 'collectible';
    }
    return 'art';
}

// Filter NFTs based on category and search term
function filterNFTs(nfts, category, searchTerm) {
    return nfts.filter(nft => {
        // Category filter
        if (category !== 'all' && nft.category !== category) {
            return false;
        }
        
        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return (
                nft.name.toLowerCase().includes(term) ||
                nft.collection.toLowerCase().includes(term) ||
                nft.description.toLowerCase().includes(term) ||
                (nft.attributes && nft.attributes.some(attr => 
                    attr.value.toLowerCase().includes(term)
                ))
            );
        }
        
        return true;
    });
}

// Get category color
function getCategoryColor(category) {
    const colors = {
        art: '#00d4ff',
        collectible: '#4caf50',
        pfp: '#ffc107',
        utility: '#f44336',
        gaming: '#9c27b0',
        land: '#3f51b5'
    };
    return colors[category] || '#607d8b';
}

// Export utilities
window.NFTUtils = {
    CONFIG,
    generateMarketplaceLinks,
    formatWalletAddress,
    isValidEthereumAddress,
    fetchNFTsFromAPI,
    filterNFTs,
    getCategoryColor,
    loadDemoNFTs
};