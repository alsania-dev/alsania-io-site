// Web3 Provider - Simplified
console.log('🔌 Loading Web3 Provider...');

let provider = null;
let signer = null;
let userAddress = null;
let isConnected = false;

async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask!');
        return false;
    }
    
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
            userAddress = accounts[0];
            isConnected = true;
            
            const short = userAddress.slice(0,6) + '...' + userAddress.slice(-4);
            const walletStatus = document.getElementById('walletStatus');
            const connectBtn = document.getElementById('connectBtn');
            const statusIndicator = document.getElementById('statusIndicator');
            
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
            
            console.log('✅ Connected:', userAddress);
            
            // Trigger portfolio update
            if (window.app) {
                window.app.updatePortfolio();
            }
            
            return true;
        }
    } catch (error) {
        console.error('❌ Connection failed:', error);
        alert('Failed to connect: ' + error.message);
        return false;
    }
}

// Setup connect button
document.addEventListener('DOMContentLoaded', function() {
    const connectBtn = document.getElementById('connectBtn');
    if (connectBtn) {
        connectBtn.addEventListener('click', connectWallet);
    }
    
    // Listen for account changes
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function(accounts) {
            if (accounts.length > 0) {
                userAddress = accounts[0];
                isConnected = true;
                const short = userAddress.slice(0,6) + '...' + userAddress.slice(-4);
                const walletStatus = document.getElementById('walletStatus');
                const connectBtn = document.getElementById('connectBtn');
                if (walletStatus) {
                    walletStatus.innerHTML = `<span class="status-indicator connected"></span> ${short}`;
                }
                if (connectBtn) {
                    connectBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${short}`;
                    connectBtn.classList.add('connected');
                }
            } else {
                isConnected = false;
                userAddress = null;
                const walletStatus = document.getElementById('walletStatus');
                const connectBtn = document.getElementById('connectBtn');
                if (walletStatus) {
                    walletStatus.innerHTML = `<span class="status-indicator"></span> Connect Wallet`;
                }
                if (connectBtn) {
                    connectBtn.innerHTML = `<i class="fas fa-plug"></i> Connect`;
                    connectBtn.classList.remove('connected');
                }
            }
        });
    }
    
    // Expose for main.js
    window.web3Provider = {
        connect: connectWallet,
        userAddress: userAddress,
        isConnected: isConnected
    };
});
