// NFT Gallery Main Logic

class NFTGallery {
    constructor() {
        this.currentWallet = '0x78dB155AA7f39A8D13a0e1E8EEB41d71e2ce3F43';
        this.currentChain = 1; // Ethereum
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.allNFTs = [];
        this.filteredNFTs = [];
        this.currentPage = 0;
        this.itemsPerPage = NFTUtils.CONFIG.itemsPerPage;
        
        this.initialize();
    }
    
    async initialize() {
        this.setupEventListeners();
        this.renderChainSelector();
        this.renderCategoryFilter();
        this.updateWalletDisplay();
        await this.loadNFTs();
    }
    
    setupEventListeners() {
        // Search box
        const searchBox = document.getElementById('nft-search');
        if (searchBox) {
            searchBox.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.filterAndRenderNFTs();
            });
        }
        
        // Refresh button
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadNFTs());
        }
        
        // Load wallet button
        const loadWalletBtn = document.getElementById('load-wallet-btn');
        if (loadWalletBtn) {
            loadWalletBtn.addEventListener('click', () => this.loadWalletNFTs());
        }
        
        // Wallet input
        const walletInput = document.getElementById('wallet-address-input');
        if (walletInput) {
            walletInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.loadWalletNFTs();
                }
            });
        }
        
        // Quick wallet buttons
        document.querySelectorAll('.quick-wallet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const address = e.target.dataset.address;
                document.getElementById('wallet-address-input').value = address;
                this.loadWalletNFTs();
            });
        });
        
        // Use my wallet link
        const useMyWalletLink = document.getElementById('use-my-wallet');
        if (useMyWalletLink) {
            useMyWalletLink.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Wallet connection would be implemented here with MetaMask/WalletConnect.');
            });
        }
        
        // Use demo mode link
        const useDemoLink = document.getElementById('use-demo-mode');
        if (useDemoLink) {
            useDemoLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentWallet = 'demo';
                this.updateWalletDisplay();
                this.loadNFTs();
            });
        }
        
        // Try demo button
        const tryDemoBtn = document.getElementById('try-demo-btn');
        if (tryDemoBtn) {
            tryDemoBtn.addEventListener('click', () => {
                this.currentWallet = 'demo';
                this.updateWalletDisplay();
                this.loadNFTs();
            });
        }
        
        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMoreNFTs());
        }
        
        // Change wallet link
        const changeWalletLink = document.getElementById('change-wallet-link');
        if (changeWalletLink) {
            changeWalletLink.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('wallet-input').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }
    
    renderChainSelector() {
        const container = document.getElementById('chain-selector');
        if (!container) return;
        
        container.innerHTML = '';
        NFTUtils.CONFIG.chains.forEach(chain => {
            const btn = document.createElement('button');
            btn.className = `chain-btn ${chain.id === this.currentChain ? 'active' : ''}`;
            btn.textContent = chain.name;
            btn.dataset.chainId = chain.id;
            btn.addEventListener('click', () => this.setChain(chain.id));
            container.appendChild(btn);
        });
    }
    
    renderCategoryFilter() {
        const container = document.getElementById('filter-selector');
        if (!container) return;
        
        container.innerHTML = '';
        NFTUtils.CONFIG.categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${category.id === this.currentCategory ? 'active' : ''}`;
            btn.innerHTML = `${category.icon} ${category.name}`;
            btn.dataset.category = category.id;
            btn.addEventListener('click', () => this.setCategory(category.id));
            container.appendChild(btn);
        });
    }
    
    setChain(chainId) {
        this.currentChain = chainId;
        this.currentPage = 0;
        this.renderChainSelector();
        this.updateStats();
        this.loadNFTs();
    }
    
    setCategory(category) {
        this.currentCategory = category;
        this.currentPage = 0;
        this.renderCategoryFilter();
        this.filterAndRenderNFTs();
    }
    
    updateWalletDisplay() {
        const walletDisplay = document.getElementById('current-wallet');
        if (walletDisplay) {
            walletDisplay.textContent = this.currentWallet === 'demo' 
                ? 'Demo Mode' 
                : NFTUtils.formatWalletAddress(this.currentWallet);
        }
    }
    
    updateStats() {
        const chain = NFTUtils.CONFIG.chains.find(c => c.id === this.currentChain);
        
        document.getElementById('total-nfts').textContent = this.allNFTs.length;
        document.getElementById('active-filter').textContent = 
            NFTUtils.CONFIG.categories.find(c => c.id === this.currentCategory)?.name || 'All';
        document.getElementById('current-chain').textContent = chain?.name || 'Ethereum';
        document.getElementById('visible-nfts').textContent = this.filteredNFTs.length;
    }
    
    async loadNFTs() {
        this.showLoading();
        
        try {
            if (this.currentWallet === 'demo') {
                this.allNFTs = await NFTUtils.loadDemoNFTs();
            } else {
                this.allNFTs = await NFTUtils.fetchNFTsFromAPI(this.currentWallet, this.currentChain);
            }
            
            this.filterAndRenderNFTs();
            this.hideLoading();
        } catch (error) {
            console.error('Error loading NFTs:', error);
            this.showEmptyState('Failed to load NFTs. Please try again.');
        }
    }
    
    async loadWalletNFTs() {
        const input = document.getElementById('wallet-address-input');
        if (!input) return;
        
        const address = input.value.trim();
        if (!address) {
            alert('Please enter a wallet address.');
            return;
        }
        
        if (!NFTUtils.isValidEthereumAddress(address)) {
            alert('Please enter a valid Ethereum address (starting with 0x and 42 characters).');
            return;
        }
        
        this.currentWallet = address;
        this.currentPage = 0;
        this.updateWalletDisplay();
        await this.loadNFTs();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    filterAndRenderNFTs() {
        this.filteredNFTs = NFTUtils.filterNFTs(
            this.allNFTs,
            this.currentCategory,
            this.searchTerm
        );
        
        this.updateStats();
        this.renderNFTs();
    }
    
    renderNFTs() {
        const container = document.getElementById('nft-grid');
        const loadMoreContainer = document.getElementById('load-more-container');
        
        if (!container) return;
        
        if (this.filteredNFTs.length === 0) {
            this.showEmptyState('No NFTs found with the current filters.');
            return;
        }
        
        // Show grid
        container.style.display = 'grid';
        document.getElementById('empty-state').style.display = 'none';
        
        // Calculate NFTs to show
        const startIndex = 0;
        const endIndex = Math.min((this.currentPage + 1) * this.itemsPerPage, this.filteredNFTs.length);
        const nftsToShow = this.filteredNFTs.slice(startIndex, endIndex);
        
        // Clear existing content
        container.innerHTML = '';
        
        // Render NFTs
        nftsToShow.forEach(nft => {
            const nftElement = this.createNFTElement(nft);
            container.appendChild(nftElement);
        });
        
        // Show/hide load more button
        if (loadMoreContainer) {
            if (endIndex < this.filteredNFTs.length) {
                loadMoreContainer.style.display = 'block';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    }
    
    createNFTElement(nft) {
        const div = document.createElement('div');
        div.className = 'nft-card';
        
        const categoryColor = NFTUtils.getCategoryColor(nft.category);
        const marketplaceLinks = NFTUtils.generateMarketplaceLinks(nft);
        
        div.innerHTML = `
            <div class="nft-image-container">
                <img 
                    src="${nft.image}" 
                    alt="${nft.name}" 
                    class="nft-image" 
                    loading="lazy"
                    onerror="this.src='https://via.placeholder.com/400x400/2a3147/00d4ff?text=NFT+Image'"
                />
                <span class="nft-category-badge" style="background: ${categoryColor};">
                    ${nft.category.toUpperCase()}
                </span>
            </div>
            <div class="nft-content">
                <h3 class="nft-title">${this.escapeHTML(nft.name)}</h3>
                <p class="nft-collection">${this.escapeHTML(nft.collection)}</p>
                <p class="nft-description">${this.escapeHTML(nft.description)}</p>
                
                ${nft.attributes && nft.attributes.length > 0 ? `
                    <div class="nft-attributes">
                        ${nft.attributes.slice(0, 3).map(attr => `
                            <span class="attribute-badge">
                                ${this.escapeHTML(attr.trait_type)}: ${this.escapeHTML(attr.value)}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="marketplace-links">
                    ${marketplaceLinks.map(link => `
                        <a 
                            href="${link.url}" 
                            class="marketplace-btn" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onclick="if(typeof gtag !== 'undefined') gtag('event', 'marketplace_click', { 'event_category': 'NFT', 'event_label': '${nft.name}' })"
                        >
                            <span>${link.icon}</span>
                            ${link.name}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
        
        return div;
    }
    
    loadMoreNFTs() {
        this.currentPage++;
        this.renderNFTs();
    }
    
    showLoading() {
        document.getElementById('loading-state').style.display = 'block';
        document.getElementById('empty-state').style.display = 'none';
        document.getElementById('nft-grid').style.display = 'none';
        document.getElementById('load-more-container').style.display = 'none';
    }
    
    hideLoading() {
        document.getElementById('loading-state').style.display = 'none';
    }
    
    showEmptyState(message = 'No NFTs found.') {
        document.getElementById('loading-state').style.display = 'none';
        document.getElementById('nft-grid').style.display = 'none';
        document.getElementById('load-more-container').style.display = 'none';
        
        const emptyState = document.getElementById('empty-state');
        const messageElement = document.getElementById('empty-state-message');
        
        if (emptyState && messageElement) {
            messageElement.textContent = message;
            emptyState.style.display = 'block';
        }
    }
    
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.nftGallery = new NFTGallery();
});