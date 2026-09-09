// Web3 Provider with Event Emitter
console.log('🔌 Loading Web3 Provider...');

let userAddress = null;
let isConnected = false;
const eventListeners = {
    connected: [],
    disconnected: [],
    accountChanged: []
};

// Simple event emitter
function on(event, callback) {
    if (eventListeners[event]) {
        eventListeners[event].push(callback);
    }
}

function emit(event, data) {
    if (eventListeners[event]) {
        eventListeners[event].forEach(cb => cb(data));
    }
}

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
            updateUI();
            console.log('✅ Connected:', userAddress);
            emit('connected', { address: userAddress });
            return true;
        }
    } catch (error) {
        console.error('❌ Connection failed:', error);
        alert('Failed to connect: ' + error.message);
        return false;
    }
}

function disconnectWallet() {
    isConnected = false;
    userAddress = null;
    updateUI();
    emit('disconnected', {});
}

function updateUI() {
    const short = userAddress ? userAddress.slice(0,6) + '...' + userAddress.slice(-4) : '';
    const walletStatus = document.getElementById('walletStatus');
    const connectBtn = document.getElementById('connectBtn');
    const statusIndicator = document.getElementById('statusIndicator');
    
    if (isConnected && userAddress) {
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

// Setup
function setupWallet() {
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
                updateUI();
                emit('accountChanged', { address: userAddress });
            } else {
                disconnectWallet();
            }
        });
        
        // Listen for chain changes
        window.ethereum.on('chainChanged', function() {
            window.location.reload();
        });
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupWallet);
} else {
    setupWallet();
}

// Expose for app.js
window.web3Provider = {
    connect: connectWallet,
    disconnect: disconnectWallet,
    on: on,
    getAddress: () => userAddress,
    isConnected: () => isConnected
};