// AED Main - with wallet event integration and retry
console.log('🚀 AED App starting...');

let appState = { isConnected: false, address: null };
let retryCount = 0;
const MAX_RETRIES = 5;

function initApp() {
    console.log('📄 Initializing app...');
    
    if (typeof window.web3Provider === 'undefined') {
        if (retryCount < MAX_RETRIES) {
            retryCount++;
            console.log(`⏳ Waiting for web3Provider... (attempt ${retryCount}/${MAX_RETRIES})`);
            setTimeout(initApp, 300);
            return;
        } else {
            console.warn('⚠️ web3Provider not available after retries');
            // Still try to set up the connect button as fallback
            setupConnectButton();
            return;
        }
    }
    
    console.log('✅ web3Provider available');
    setupWalletListeners();
    setupConnectButton();
    updateUI();
    updatePortfolio();
    updateStats();
}

function setupWalletListeners() {
    if (!window.web3Provider) return;
    
    window.web3Provider.on('connected', function(data) {
        console.log('🔗 Wallet connected:', data.address);
        appState.isConnected = true;
        appState.address = data.address;
        updateUI();
        updatePortfolio();
    });
    
    window.web3Provider.on('disconnected', function() {
        console.log('🔌 Wallet disconnected');
        appState.isConnected = false;
        appState.address = null;
        updateUI();
    });
    
    window.web3Provider.on('accountChanged', function(data) {
        console.log('🔄 Account changed:', data.address);
        appState.address = data.address;
        appState.isConnected = true;
        updateUI();
        updatePortfolio();
    });
    
    // Check if already connected
    if (window.web3Provider.isConnected && window.web3Provider.isConnected()) {
        const addr = window.web3Provider.getAddress();
        if (addr) {
            appState.isConnected = true;
            appState.address = addr;
            updateUI();
            updatePortfolio();
        }
    }
}

function setupConnectButton() {
    const connectBtn = document.getElementById('connectBtn');
    if (!connectBtn) return;
    
    // Remove any existing listeners
    const newBtn = connectBtn.cloneNode(true);
    connectBtn.parentNode.replaceChild(newBtn, connectBtn);
    
    newBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        console.log('🔘 Connect button clicked');
        
        if (typeof window.ethereum === 'undefined') {
            alert('Please install MetaMask!');
            return;
        }
        
        if (window.web3Provider) {
            try {
                await window.web3Provider.connect();
            } catch (error) {
                console.error('❌ Connection failed:', error);
                alert('Failed to connect: ' + error.message);
            }
        } else {
            alert('Web3 provider not ready. Please refresh the page.');
        }
    });
    
    console.log('✅ Connect button setup complete');
}

function updateUI() {
    const walletStatus = document.getElementById('walletStatus');
    const connectBtn = document.getElementById('connectBtn');
    const statusIndicator = document.getElementById('statusIndicator');
    
    if (appState.isConnected && appState.address) {
        const short = appState.address.slice(0,6) + '...' + appState.address.slice(-4);
        if (walletStatus) walletStatus.innerHTML = `<span class="status-indicator connected"></span> ${short}`;
        if (connectBtn) {
            connectBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${short}`;
            connectBtn.classList.add('connected');
        }
        if (statusIndicator) statusIndicator.classList.add('connected');
    } else {
        if (walletStatus) walletStatus.innerHTML = `<span class="status-indicator"></span> Connect Wallet`;
        if (connectBtn) {
            connectBtn.innerHTML = `<i class="fas fa-plug"></i> Connect`;
            connectBtn.classList.remove('connected');
        }
        if (statusIndicator) statusIndicator.classList.remove('connected');
    }
}

function updatePortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;
    
    const tokens = [
        { id: 1, domain: 'aegis.aed', type: 'Domain' },
        { id: 2, domain: 'echo.aegis.aed', type: 'AI Badge', model: 'claude-3.5-sonnet' },
        { id: 3, domain: 'sigmasauer07.aed', type: 'Domain' }
    ];
    
    grid.innerHTML = tokens.map(t => `
        <div class="domain-card glass-card">
            <div class="domain-header">
                <div class="domain-name">${t.domain}</div>
                <div class="domain-status"><span class="status-glass"><i class="fas fa-circle"></i> ${t.type}</span></div>
            </div>
            <div class="domain-details">
                <div class="detail-item"><span class="detail-label">Token ID:</span><span class="detail-value">#${t.id}</span></div>
                ${t.model ? `<div class="detail-item"><span class="detail-label">Model:</span><span class="detail-value">${t.model}</span></div>` : ''}
            </div>
            <div class="domain-actions">
                <button class="glass-button" onclick="window.open('https://aed-metadata.vercel.app/api/${t.type === 'AI Badge' ? 'sub' : 'domain'}/${t.id}', '_blank')">
                    <i class="fas fa-eye"></i> View Metadata
                </button>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const totalEl = document.getElementById('totalDomains');
    if (totalEl) totalEl.textContent = '3';
    const revenueEl = document.getElementById('totalRevenue');
    if (revenueEl) revenueEl.textContent = '0';
    const tldsEl = document.getElementById('activeTLDs');
    if (tldsEl) tldsEl.textContent = '6';
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

console.log('✅ AED App ready');