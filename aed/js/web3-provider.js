// Web3 Provider - Real MetaMask Connection

class Web3Provider {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
        this.isConnected = false;
        this.network = null;
        this.chainId = null;
        this.eventListeners = {
            connected: [],
            disconnected: [],
            accountChanged: [],
            transactionSent: [],
            transactionConfirmed: [],
            transactionFailed: []
        };
        
        this.init();
    }

    init() {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            console.log('🦊 MetaMask detected');
            this.provider = window.ethereum;
            
            // Handle account changes
            this.provider.on('accountsChanged', (accounts) => {
                console.log('🔄 Accounts changed:', accounts);
                if (accounts.length > 0) {
                    this.userAddress = accounts[0];
                    this.isConnected = true;
                    this.emit('accountChanged', this.userAddress);
                    this.emit('connected', { address: this.userAddress });
                    this.updateUI();
                } else {
                    this.disconnect();
                }
            });
            
            // Handle chain changes
            this.provider.on('chainChanged', (chainId) => {
                console.log('🔄 Chain changed:', chainId);
                this.chainId = parseInt(chainId, 16);
                this.updateUI();
            });
            
            // Check if already connected
            this.provider.request({ method: 'eth_accounts' })
                .then(accounts => {
                    if (accounts && accounts.length > 0) {
                        this.userAddress = accounts[0];
                        this.isConnected = true;
                        this.emit('connected', { address: this.userAddress });
                        this.updateUI();
                    }
                })
                .catch(err => console.error('Error checking accounts:', err));
                
            // Check chain ID
            this.provider.request({ method: 'eth_chainId' })
                .then(chainId => {
                    this.chainId = parseInt(chainId, 16);
                    console.log('Chain ID:', this.chainId);
                })
                .catch(err => console.error('Error getting chain ID:', err));
                
        } else {
            console.log('❌ MetaMask not detected');
            document.getElementById('connectBtn')?.addEventListener('click', () => {
                alert('Please install MetaMask to use this dApp');
            });
        }
    }

    async connect() {
        if (!this.provider) {
            alert('Please install MetaMask');
            return;
        }
        
        try {
            // Request account access
            const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
            
            if (accounts.length > 0) {
                this.userAddress = accounts[0];
                this.isConnected = true;
                
                // Get chain ID
                const chainId = await this.provider.request({ method: 'eth_chainId' });
                this.chainId = parseInt(chainId, 16);
                
                console.log('✅ Connected:', this.userAddress);
                console.log('Chain ID:', this.chainId);
                
                this.emit('connected', { address: this.userAddress });
                this.updateUI();
                
                return { address: this.userAddress, chainId: this.chainId };
            }
        } catch (error) {
            console.error('❌ Connection failed:', error);
            this.emit('transactionFailed', error);
            throw error;
        }
    }

    disconnect() {
        this.userAddress = null;
        this.isConnected = false;
        this.emit('disconnected');
        this.updateUI();
    }

    async getSigner() {
        if (!this.provider) return null;
        if (!this.isConnected) {
            await this.connect();
        }
        
        try {
            const { ethers } = window;
            if (!ethers) {
                console.error('Ethers not loaded');
                return null;
            }
            const provider = new ethers.BrowserProvider(this.provider);
            this.signer = await provider.getSigner();
            return this.signer;
        } catch (error) {
            console.error('Error getting signer:', error);
            return null;
        }
    }

    async getContract(contractAddress, abi) {
        try {
            const signer = await this.getSigner();
            if (!signer) return null;
            
            const { ethers } = window;
            if (!ethers) return null;
            
            this.contract = new ethers.Contract(contractAddress, abi, signer);
            return this.contract;
        } catch (error) {
            console.error('Error getting contract:', error);
            return null;
        }
    }

    async sendTransaction(tx) {
        try {
            this.emit('transactionSent', tx);
            const receipt = await tx.wait();
            this.emit('transactionConfirmed', receipt);
            return receipt;
        } catch (error) {
            console.error('Transaction failed:', error);
            this.emit('transactionFailed', error);
            throw error;
        }
    }

    updateUI() {
        const connectBtn = document.getElementById('connectBtn');
        const walletAddress = document.getElementById('walletAddress');
        const statusIndicator = document.getElementById('statusIndicator');
        
        if (this.isConnected && this.userAddress) {
            const shortAddress = `${this.userAddress.slice(0, 6)}...${this.userAddress.slice(-4)}`;
            
            if (walletAddress) {
                walletAddress.textContent = shortAddress;
                walletAddress.style.color = '#39ff14';
            }
            
            if (connectBtn) {
                connectBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${shortAddress}`;
                connectBtn.classList.add('connected');
                connectBtn.style.background = 'rgba(57, 255, 20, 0.15)';
                connectBtn.style.border = '1px solid #39ff14';
                connectBtn.style.color = '#39ff14';
            }
            
            if (statusIndicator) {
                statusIndicator.classList.add('connected');
                statusIndicator.style.background = '#39ff14';
                statusIndicator.style.boxShadow = '0 0 10px #39ff14';
            }
        } else {
            if (walletAddress) {
                walletAddress.textContent = 'Connect Wallet';
                walletAddress.style.color = '';
            }
            
            if (connectBtn) {
                connectBtn.innerHTML = '<i class="fas fa-plug"></i> Connect';
                connectBtn.classList.remove('connected');
                connectBtn.style.background = 'linear-gradient(135deg, #00f5ff, #ff00ff)';
                connectBtn.style.border = 'none';
                connectBtn.style.color = '#000';
            }
            
            if (statusIndicator) {
                statusIndicator.classList.remove('connected');
                statusIndicator.style.background = '#ff4444';
                statusIndicator.style.boxShadow = 'none';
            }
        }
    }

    // Event emitter methods
    on(event, callback) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].push(callback);
        }
    }

    off(event, callback) {
        if (this.eventListeners[event]) {
            this.eventListeners[event] = this.eventListeners[event].filter(cb => cb !== callback);
        }
    }

    emit(event, data) {
        if (this.eventListeners[event]) {
            this.eventListeners[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in ${event} listener:`, error);
                }
            });
        }
    }
}

// Initialize global web3 provider
const web3Provider = new Web3Provider();
window.web3Provider = web3Provider;

// Setup connect button
document.addEventListener('DOMContentLoaded', () => {
    const connectBtn = document.getElementById('connectBtn');
    if (connectBtn) {
        connectBtn.addEventListener('click', async () => {
            try {
                await web3Provider.connect();
            } catch (error) {
                console.error('Connection error:', error);
            }
        });
    }
    
    // Initial UI update
    web3Provider.updateUI();
});
