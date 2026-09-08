// Agent UI Module
// Handles agent registry UI integration with the main app

class AgentUI {
  constructor() {
    this.agentRegistry = null;
    this.reputationRegistry = null;
    this.currentAgentId = null;
  }

  async init() {
    console.log('🤖 Initializing Agent UI...');
    
    // Wait for web3 provider
    await this.waitForWeb3();
    
    // Initialize agent registry
    if (window.web3Provider && window.web3Provider.provider) {
      const registry = await this.initializeRegistry(window.web3Provider.provider);
      if (registry) {
        this.agentRegistry = registry.agentRegistry;
        this.reputationRegistry = registry.reputationRegistry;
        console.log('✅ Agent registry initialized');
        this.setupEventListeners();
        this.loadAgents();
      }
    }
  }

  async waitForWeb3() {
    let attempts = 0;
    while (!window.web3Provider && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
  }

  async initializeRegistry(provider) {
    try {
      const { ethers } = window;
      if (!ethers) {
        console.error('Ethers not loaded');
        return null;
      }

      const signer = provider.getSigner();
      const AGENT_REGISTRY_ADDR = '0xCA96D5171bF9D83fb9546D936daed229e1C7904F';
      const REPUTATION_REGISTRY_ADDR = '0x19e04AD786E8B46276705387C6B029bD7C7E0719';

      const AGENT_ABI = [
        'function register(string uri) returns (uint256)',
        'function getAgentWallet(uint256 tokenId) view returns (address)',
        'function tokenURI(uint256 tokenId) view returns (string)',
        'function ownerOf(uint256 tokenId) view returns (address)',
        'function balanceOf(address owner) view returns (uint256)',
        'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)'
      ];

      const REPUTATION_ABI = [
        'function giveFeedback(uint256 agentId, int128 value, uint8 valueDecimals, string tag1, string tag2, string endpoint, string feedbackURI, bytes32 feedbackHash)',
        'function revokeFeedback(uint256 agentId, uint64 feedbackIndex)',
        'function getAgentReputation(uint256 agentId) view returns (uint256 weightedAverageScore, uint256 totalRatings, uint256 displayScore, uint256 effectiveFeeBps)',
        'function getEffectiveFeeBps(uint256 agentId) view returns (uint256)',
        'function calculateDiscountedFee(uint256 agentId, uint256 amount) view returns (uint256)',
        'function getRaterReputation(address rater) view returns (uint256)'
      ];

      const agentRegistry = new ethers.Contract(AGENT_REGISTRY_ADDR, AGENT_ABI, signer);
      const reputationRegistry = new ethers.Contract(REPUTATION_REGISTRY_ADDR, REPUTATION_ABI, signer);

      return { agentRegistry, reputationRegistry };
    } catch (error) {
      console.error('Failed to initialize agent registry:', error);
      return null;
    }
  }

  setupEventListeners() {
    // Refresh agents button
    const refreshBtn = document.getElementById('refreshAgentsBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => this.loadAgents());
    }

    // Register agent button
    const registerBtn = document.getElementById('registerAgentBtn');
    if (registerBtn) {
      registerBtn.addEventListener('click', () => this.showRegisterAgentModal());
    }

    // Refresh reputation button
    const refreshRepBtn = document.getElementById('refreshReputationBtn');
    if (refreshRepBtn) {
      refreshRepBtn.addEventListener('click', () => this.loadReputation());
    }

    // Agent registry search
    const searchInput = document.getElementById('agentSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.searchAgents(e.target.value));
    }

    // Listen for wallet connection events
    if (window.web3Provider) {
      window.web3Provider.on('connected', () => this.loadAgents());
      window.web3Provider.on('accountChanged', () => this.loadAgents());
    }
  }

  async loadAgents() {
    if (!this.agentRegistry) return;
    if (!window.web3Provider || !window.web3Provider.isConnected) {
      this.showEmptyState('Connect wallet to view your agents');
      return;
    }

    try {
      const address = window.web3Provider.userAddress;
      const balance = await this.agentRegistry.balanceOf(address);
      
      if (balance === 0) {
        this.showEmptyState('No agents registered yet. Register your first AI agent!');
        return;
      }

      const agents = [];
      for (let i = 0; i < balance; i++) {
        try {
          const tokenId = await this.agentRegistry.tokenOfOwnerByIndex(address, i);
          const owner = await this.agentRegistry.ownerOf(tokenId);
          const uri = await this.agentRegistry.tokenURI(tokenId);
          agents.push({ tokenId, owner, uri });
        } catch (e) {
          console.warn('Could not fetch agent', i, e);
        }
      }

      this.renderAgents(agents);
    } catch (error) {
      console.error('Error loading agents:', error);
      this.showError('Failed to load agents: ' + error.message);
    }
  }

  async loadReputation(agentId) {
    if (!this.reputationRegistry) return;
    
    // Use the first agent if none specified
    if (!agentId) {
      const agents = await this.getUserAgents();
      if (agents.length > 0) {
        agentId = agents[0].tokenId;
      }
    }

    if (!agentId) {
      this.showReputationEmpty();
      return;
    }

    try {
      const rep = await this.reputationRegistry.getAgentReputation(agentId);
      const effectiveFee = await this.reputationRegistry.getEffectiveFeeBps(agentId);
      
      const weightedAverage = Number(rep[0]) / 100;
      const totalRatings = Number(rep[1]);
      const displayScore = Number(rep[2]) / 100;
      const effectiveFeeBps = Number(effectiveFee);

      this.renderReputation(agentId, {
        weightedAverage,
        totalRatings,
        displayScore,
        effectiveFeeBps
      });
    } catch (error) {
      console.error('Error loading reputation:', error);
      this.showReputationError('Failed to load reputation: ' + error.message);
    }
  }

  async getUserAgents() {
    if (!this.agentRegistry || !window.web3Provider?.isConnected) return [];
    
    try {
      const address = window.web3Provider.userAddress;
      const balance = await this.agentRegistry.balanceOf(address);
      const agents = [];
      
      for (let i = 0; i < balance; i++) {
        const tokenId = await this.agentRegistry.tokenOfOwnerByIndex(address, i);
        agents.push({ tokenId });
      }
      return agents;
    } catch (error) {
      console.error('Error getting user agents:', error);
      return [];
    }
  }

  renderAgents(agents) {
    const container = document.getElementById('agentsGrid');
    if (!container) return;

    container.innerHTML = agents.map(agent => `
      <div class="agent-card glass-card">
        <div class="agent-header">
          <div class="agent-icon">
            <i class="fas fa-robot"></i>
          </div>
          <div class="agent-id">#${agent.tokenId}</div>
        </div>
        <div class="agent-details">
          <div class="agent-owner">
            <span class="label">Owner:</span>
            <span class="value">${agent.owner.slice(0, 6)}...${agent.owner.slice(-4)}</span>
          </div>
          <div class="agent-uri">
            <span class="label">URI:</span>
            <span class="value">${agent.uri ? agent.uri.slice(0, 30) + '...' : '—'}</span>
          </div>
        </div>
        <div class="agent-actions">
          <button class="glass-button" onclick="agentUI.viewAgent('${agent.tokenId}')">
            <i class="fas fa-eye"></i> View
          </button>
          <button class="glass-button cta-primary" onclick="agentUI.rateAgent('${agent.tokenId}')">
            <i class="fas fa-star"></i> Rate
          </button>
        </div>
      </div>
    `).join('');
  }

  showEmptyState(message) {
    const container = document.getElementById('agentsGrid');
    if (!container) return;
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-robot"></i>
        <h3>${message}</h3>
        <p>Register your first AI agent to get started</p>
        <button class="glass-button cta-primary" onclick="agentUI.showRegisterAgentModal()">
          Register Agent
        </button>
      </div>
    `;
  }

  showError(message) {
    const container = document.getElementById('agentsGrid');
    if (!container) return;
    container.innerHTML = `
      <div class="empty-state error">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Error</h3>
        <p>${message}</p>
        <button class="glass-button" onclick="agentUI.loadAgents()">
          <i class="fas fa-sync-alt"></i> Retry
        </button>
      </div>
    `;
  }

  renderReputation(agentId, reputation) {
    const container = document.getElementById('reputationScore');
    const ratingsContainer = document.getElementById('totalRatings');
    const tierContainer = document.getElementById('discountTier');
    const feeContainer = document.getElementById('effectiveFee');

    if (container) {
      const score = reputation.displayScore || reputation.weightedAverage;
      container.textContent = score > 0 ? score.toFixed(1) + '★' : '—';
    }

    if (ratingsContainer) {
      ratingsContainer.textContent = reputation.totalRatings || 0;
    }

    if (tierContainer) {
      const score = reputation.displayScore || reputation.weightedAverage;
      if (score >= 4.5) tierContainer.textContent = 'Tier 3 (4.5★+)';
      else if (score >= 4.0) tierContainer.textContent = 'Tier 2 (4.0★+)';
      else if (score >= 3.5) tierContainer.textContent = 'Tier 1 (3.5★+)';
      else tierContainer.textContent = '—';
    }

    if (feeContainer) {
      const feePercent = (reputation.effectiveFeeBps || 250) / 100;
      feeContainer.textContent = feePercent.toFixed(1) + '%';
    }
  }

  showReputationEmpty() {
    const container = document.getElementById('reputationScore');
    if (container) container.textContent = '—';
    
    const ratingsContainer = document.getElementById('totalRatings');
    if (ratingsContainer) ratingsContainer.textContent = '0';
    
    const tierContainer = document.getElementById('discountTier');
    if (tierContainer) tierContainer.textContent = '—';
    
    const feeContainer = document.getElementById('effectiveFee');
    if (feeContainer) feeContainer.textContent = '2.5%';
  }

  showReputationError(message) {
    const container = document.getElementById('reputationScore');
    if (container) container.textContent = '⚠️';
    // Show error in chart area
    const chartContainer = document.getElementById('reputationChart');
    if (chartContainer) {
      chartContainer.innerHTML = `
        <div class="chart-placeholder error">
          <i class="fas fa-exclamation-triangle"></i>
          <span>${message}</span>
        </div>
      `;
    }
  }

  async viewAgent(agentId) {
    const modal = document.getElementById('agentModal');
    const title = document.getElementById('agentModalTitle');
    const body = document.getElementById('agentModalBody');
    
    if (!modal || !title || !body) return;

    try {
      const owner = await this.agentRegistry.ownerOf(agentId);
      const uri = await this.agentRegistry.tokenURI(agentId);
      const wallet = await this.agentRegistry.getAgentWallet(agentId);
      
      // Get reputation
      const rep = await this.reputationRegistry.getAgentReputation(agentId);
      const weightedAverage = Number(rep[0]) / 100;
      const totalRatings = Number(rep[1]);
      const displayScore = Number(rep[2]) / 100;
      const effectiveFeeBps = Number(rep[3]);

      title.textContent = `Agent #${agentId} Details`;
      body.innerHTML = `
        <div class="agent-detail-card">
          <div class="detail-row">
            <span class="label">Agent ID:</span>
            <span class="value">#${agentId}</span>
          </div>
          <div class="detail-row">
            <span class="label">Owner:</span>
            <span class="value">${owner}</span>
          </div>
          <div class="detail-row">
            <span class="label">Wallet:</span>
            <span class="value">${wallet || 'Not set'}</span>
          </div>
          <div class="detail-row">
            <span class="label">URI:</span>
            <span class="value">${uri || '—'}</span>
          </div>
          <div class="detail-row">
            <span class="label">Reputation:</span>
            <span class="value">${displayScore > 0 ? displayScore.toFixed(1) + '★' : '—'}</span>
          </div>
          <div class="detail-row">
            <span class="label">Total Ratings:</span>
            <span class="value">${totalRatings}</span>
          </div>
          <div class="detail-row">
            <span class="label">Effective Fee:</span>
            <span class="value">${(effectiveFeeBps / 100).toFixed(1)}%</span>
          </div>
        </div>
      `;
      
      modal.style.display = 'block';
    } catch (error) {
      console.error('Error viewing agent:', error);
      alert('Failed to load agent details: ' + error.message);
    }
  }

  rateAgent(agentId) {
    // Show rating modal
    const modal = document.getElementById('agentModal');
    const title = document.getElementById('agentModalTitle');
    const body = document.getElementById('agentModalBody');
    
    if (!modal || !title || !body) return;

    title.textContent = `Rate Agent #${agentId}`;
    body.innerHTML = `
      <div class="rating-form">
        <div class="form-group">
          <label class="form-label">Rating (1-5 stars)</label>
          <div class="star-rating" id="starRating">
            ${[1,2,3,4,5].map(i => `<span class="star" data-value="${i}" onclick="agentUI.setStarRating(${i})">☆</span>`).join('')}
          </div>
          <input type="hidden" id="ratingValue" value="0">
        </div>
        <div class="form-group">
          <label class="form-label">Tag</label>
          <input type="text" class="glass-input" id="ratingTag" placeholder="e.g., capability, performance, reliability">
        </div>
        <div class="form-group">
          <label class="form-label">Comment</label>
          <textarea class="glass-input" id="ratingComment" placeholder="Your feedback..." rows="3"></textarea>
        </div>
        <button class="glass-button cta-primary" onclick="agentUI.submitRating('${agentId}')">
          <i class="fas fa-check"></i> Submit Rating
        </button>
        <button class="glass-button" onclick="document.getElementById('agentModal').style.display='none'">
          <i class="fas fa-times"></i> Cancel
        </button>
      </div>
    `;
    
    modal.style.display = 'block';
  }

  setStarRating(value) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      star.textContent = index < value ? '★' : '☆';
      star.style.color = index < value ? '#FFD700' : '#666';
    });
    document.getElementById('ratingValue').value = value;
  }

  async submitRating(agentId) {
    const rating = parseInt(document.getElementById('ratingValue').value);
    const tag = document.getElementById('ratingTag')?.value || 'general';
    const comment = document.getElementById('ratingComment')?.value || '';

    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    try {
      const value = rating * 100;
      const tx = await this.reputationRegistry.giveFeedback(
        agentId,
        value,
        2,
        tag,
        '',
        '',
        comment,
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      );
      
      await tx.wait();
      
      document.getElementById('agentModal').style.display = 'none';
      alert('✅ Rating submitted successfully!');
      
      // Reload reputation
      this.loadReputation(agentId);
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating: ' + error.message);
    }
  }

  showRegisterAgentModal() {
    // Show registration modal
    const modal = document.getElementById('agentModal');
    const title = document.getElementById('agentModalTitle');
    const body = document.getElementById('agentModalBody');
    
    if (!modal || !title || !body) return;

    title.textContent = 'Register New Agent';
    body.innerHTML = `
      <div class="register-agent-form">
        <div class="form-group">
          <label class="form-label">Agent Name</label>
          <input type="text" class="glass-input" id="agentNameInput" placeholder="e.g., My AI Agent">
        </div>
        <div class="form-group">
          <label class="form-label">Agent Description</label>
          <textarea class="glass-input" id="agentDescriptionInput" placeholder="Describe your agent..." rows="3"></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Agent URI (IPFS/URL)</label>
          <input type="text" class="glass-input" id="agentURIInput" placeholder="ipfs://... or https://...">
        </div>
        <div class="form-info glass-panel">
          <p><i class="fas fa-info-circle"></i> Registration requires a 1 ALSA stake. The stake is locked for 30 days.</p>
        </div>
        <button class="glass-button cta-primary" onclick="agentUI.registerAgent()">
          <i class="fas fa-plus"></i> Register Agent (1 ALSA)
        </button>
        <button class="glass-button" onclick="document.getElementById('agentModal').style.display='none'">
          <i class="fas fa-times"></i> Cancel
        </button>
      </div>
    `;
    
    modal.style.display = 'block';
  }

  async registerAgent() {
    const name = document.getElementById('agentNameInput')?.value || 'My Agent';
    const description = document.getElementById('agentDescriptionInput')?.value || '';
    const uri = document.getElementById('agentURIInput')?.value || `ipfs://${Date.now()}`;

    try {
      const tx = await this.agentRegistry.register(uri);
      await tx.wait();
      
      document.getElementById('agentModal').style.display = 'none';
      alert('✅ Agent registered successfully!');
      
      this.loadAgents();
    } catch (error) {
      console.error('Error registering agent:', error);
      alert('Failed to register agent: ' + error.message);
    }
  }

  // Search agents (placeholder for future implementation)
  searchAgents(query) {
    // This would filter the agent list
    console.log('Searching agents:', query);
  }
}

// Initialize agent UI
let agentUI;

document.addEventListener('DOMContentLoaded', () => {
  agentUI = new AgentUI();
  agentUI.init();
  window.agentUI = agentUI;
});