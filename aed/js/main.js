// AED Main - Simplified version
console.log('🚀 AED App starting...');

// Global state
let appState = {
    isConnected: false,
    address: null,
    chainId: null
};

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM ready');
    
    // Connect button
    const connectBtn = document.getElementById('connectBtn');
    if (connectBtn) {
        connectBtn.addEventListener('click', async function() {
            if (window.web3Provider) {
                try {
                    await window.web3Provider.connect();
                } catch (e) {
                    console.error('Connection failed:', e);
                    alert('Failed to connect: ' + e.message);
                }
            } else {
                alert('Please install MetaMask');
            }
        });
    }
    
    // Wallet status update from web3 provider
    if (window.web3Provider) {
        window.web3Provider.on('connected', function(data) {
            console.log('🔗 Connected:', data);
            appState.isConnected = true;
            appState.address = data.address;
            updateUI();
            updatePortfolio();
        });
        window.web3Provider.on('disconnected', function() {
            console.log('🔌 Disconnected');
            appState.isConnected = false;
            appState.address = null;
            updateUI();
        });
        window.web3Provider.on('accountChanged', function(address) {
            console.log('👤 Account changed:', address);
            appState.address = address;
            appState.isConnected = true;
            updateUI();
            updatePortfolio();
        });
    }
    
    // Update portfolio with real data
    updatePortfolio();
    updateStats();
});

function updateUI() {
    const walletStatus = document.getElementById('walletStatus');
    const connectBtn = document.getElementById('connectBtn');
    const statusIndicator = document.getElementById('statusIndicator');
    
    if (appState.isConnected && appState.address) {
        const short = appState.address.slice(0,6) + '...' + appState.address.slice(-4);
        if (walletStatus) {
            walletStatus.innerHTML = `<span class="status-indicator connected"></span> ${short}`;
        }
        if (connectBtn) {
            connectBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${short}`;
            connectBtn.classList.add('connected');
        }
        if (statusIndicator) {
            statusIndicator.classList.add('connected');
        }
    } else {
        if (walletStatus) {
            walletStatus.innerHTML = `<span class="status-indicator"></span> Connect Wallet`;
        }
        if (connectBtn) {
            connectBtn.innerHTML = `<i class="fas fa-plug"></i> Connect`;
            connectBtn.classList.remove('connected');
        }
        if (statusIndicator) {
            statusIndicator.classList.remove('connected');
        }
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
                <div class="domain-status">
                    <span class="status-glass">
                        <i class="fas fa-circle"></i> ${t.type}
                    </span>
                </div>
            </div>
            <div class="domain-details">
                <div class="detail-item">
                    <span class="detail-label">Token ID:</span>
                    <span class="detail-value">#${t.id}</span>
                </div>
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

console.log('✅ AED App ready');
