// navigation.js - Enhanced navigation system for AlsaniaScan
// Maintains Alsania branding while adding comprehensive site structure

class AlsaniaNavigation {
    constructor() {
        this.currentPage = 'explorer';
        this.userRole = 'public'; // 'public' or 'admin'
        this.init();
    }

    init() {
        this.createNavigationStructure();
        this.bindEvents();
        this.loadUserPreferences();
    }

    createNavigationStructure() {
        const navigation = {
            public: [
                {
                    id: 'explorer',
                    title: 'Explorer',
                    icon: 'fas fa-search',
                    url: '#explorer',
                    description: 'Search blocks, transactions, addresses'
                },
                {
                    id: 'domains',
                    title: 'Domains',
                    icon: 'fas fa-globe',
                    url: 'domain.html',
                    description: 'Browse .alsania domains'
                },
                {
                    id: 'nfts',
                    title: 'NFTs',
                    icon: 'fas fa-image',
                    url: '#nfts',
                    description: 'Explore NFT collections'
                },
                {
                    id: 'profile',
                    title: 'My Profile',
                    icon: 'fas fa-user',
                    url: '#profile',
                    description: 'Manage your Alsania profile',
                    requiresAuth: true
                }
            ],
            admin: [
                {
                    id: 'dashboard',
                    title: 'Admin Dashboard',
                    icon: 'fas fa-tachometer-alt',
                    url: 'admin/dashboard.html',
                    description: 'System overview and analytics'
                },
                {
                    id: 'users',
                    title: 'User Management',
                    icon: 'fas fa-users',
                    url: 'admin/users.html',
                    description: 'Manage user accounts and permissions'
                },
                {
                    id: 'domains-admin',
                    title: 'Domain Admin',
                    icon: 'fas fa-globe',
                    url: 'admin/domains.html',
                    description: 'Manage domain registrations'
                },
                {
                    id: 'analytics',
                    title: 'Analytics',
                    icon: 'fas fa-chart-bar',
                    url: 'admin/analytics.html',
                    description: 'View site statistics and metrics'
                }
            ]
        };

        this.navigation = navigation;
    }

    renderNavigation(role = 'public') {
        const navItems = this.navigation[role];
        const navContainer = document.querySelector('.main-nav .nav-menu') || 
                            document.querySelector('.mobile-drawer .drawer-menu');

        if (!navContainer) return;

        navContainer.innerHTML = navItems.map(item => `
            <li>
                <a href="${item.url}" 
                   class="nav-link ${item.id === this.currentPage ? 'active' : ''}"
                   data-page="${item.id}"
                   title="${item.description}">
                    <i class="${item.icon}"></i>
                    <span>${item.title}</span>
                </a>
            </li>
        `).join('');
    }

    navigateTo(pageId) {
        this.currentPage = pageId;
        
        // Update active states
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageId);
        });

        // Load page content
        this.loadPageContent(pageId);
        
        // Update URL without reload
        history.pushState({ page: pageId }, '', `#${pageId}`);
    }

    loadPageContent(pageId) {
        const contentContainer = document.getElementById('content-container');
        if (!contentContainer) return;

        // Show loading state
        contentContainer.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Loading ${this.getPageTitle(pageId)}...</p>
            </div>
        `;

        // Simulate loading (replace with actual content loading)
        setTimeout(() => {
            this.renderPageContent(pageId);
        }, 300);
    }

    renderPageContent(pageId) {
        const contentContainer = document.getElementById('content-container');
        
        const pages = {
            explorer: this.renderExplorerDashboard(),
            domains: this.renderDomainsPage(),
            nfts: this.renderNFTsPage(),
            profile: this.renderProfilePage(),
            dashboard: this.renderAdminDashboard(),
            users: this.renderAdminUsers(),
            'domains-admin': this.renderAdminDomains(),
            analytics: this.renderAdminAnalytics()
        };

        contentContainer.innerHTML = pages[pageId] || this.render404();
    }

    renderExplorerDashboard() {
        return `
            <div class="dashboard-container alsania-theme">
                <div class="dashboard-header">
                    <h1><i class="fas fa-cube"></i> Alsania Explorer</h1>
                    <p>Real-time blockchain data and analytics</p>
                </div>
                
                <div class="search-section">
                    <div class="search-bar alsania-search">
                        <input type="text" placeholder="Search by address, domain, block or tx hash..." />
                        <button class="alsania-btn"><i class="fas fa-search"></i></button>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card alsania-card">
                        <i class="fas fa-cube"></i>
                        <div class="stat-value" id="block-count">0</div>
                        <div class="stat-label">Total Blocks</div>
                    </div>
                    <div class="stat-card alsania-card">
                        <i class="fas fa-exchange-alt"></i>
                        <div class="stat-value" id="tx-count">0</div>
                        <div class="stat-label">Transactions</div>
                    </div>
                    <div class="stat-card alsania-card">
                        <i class="fas fa-globe"></i>
                        <div class="stat-value" id="domain-count">0</div>
                        <div class="stat-label">Domains</div>
                    </div>
                    <div class="stat-card alsania-card">
                        <i class="fas fa-image"></i>
                        <div class="stat-value" id="nft-count">0</div>
                        <div class="stat-label">NFTs</div>
                    </div>
                </div>

                <div class="content-sections">
                    <div class="section latest-blocks">
                        <h3><i class="fas fa-cube"></i> Latest Blocks</h3>
                        <div class="table-container">
                            <table class="alsania-table">
                                <thead>
                                    <tr>
                                        <th>Block</th>
                                        <th>Timestamp</th>
                                        <th>Transactions</th>
                                        <th>Miner</th>
                                    </tr>
                                </thead>
                                <tbody id="latest-blocks-body">
                                    <!-- Dynamic content -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="section latest-transactions">
                        <h3><i class="fas fa-exchange-alt"></i> Latest Transactions</h3>
                        <div class="table-container">
                            <table class="alsania-table">
                                <thead>
                                    <tr>
                                        <th>Hash</th>
                                        <th>Block</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody id="latest-txs-body">
                                    <!-- Dynamic content -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderDomainsPage() {
        return `
            <div class="domains-container alsania-theme">
                <div class="domains-header">
                    <h1><i class="fas fa-globe"></i> Alsania Domains</h1>
                    <p>Explore .alsania domains and their ownership</p>
                </div>
                
                <div class="domains-search">
                    <div class="search-bar alsania-search">
                        <input type="text" placeholder="Search .alsania domains..." />
                        <button class="alsania-btn"><i class="fas fa-search"></i></button>
                    </div>
                </div>

                <div class="domains-grid">
                    <div class="domain-card alsania-card">
                        <h3>example.alsania</h3>
                        <p>Owner: 0x1234...5678</p>
                        <p>Expires: 2025-12-31</p>
                        <button class="alsania-btn">View Details</button>
                    </div>
                    <!-- More domain cards -->
                </div>
            </div>
        `;
    }

    renderProfilePage() {
        return `
            <div class="profile-container alsania-theme">
                <div class="profile-header">
                    <div class="profile-avatar">
                        <img src="https://via.placeholder.com/100x100/39ff14/0d0e10?text=U" alt="Profile">
                    </div>
                    <div class="profile-info">
                        <h1>User Profile</h1>
                        <p>0x1234...5678</p>
                    </div>
                </div>

                <div class="profile-sections">
                    <div class="section badges">
                        <h3><i class="fas fa-award"></i> Badges</h3>
                        <div class="badges-grid">
                            <!-- Dynamic badges -->
                        </div>
                    </div>

                    <div class="section nfts">
                        <h3><i class="fas fa-image"></i> NFTs</h3>
                        <div class="nfts-grid">
                            <!-- Dynamic NFTs -->
                        </div>
                    </div>

                    <div class="section domains">
                        <h3><i class="fas fa-globe"></i> Owned Domains</h3>
                        <div class="domains-list">
                            <!-- Dynamic domains -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getPageTitle(pageId) {
        const titles = {
            explorer: 'Explorer',
            domains: 'Domains',
            nfts: 'NFTs',
            profile: 'Profile',
            dashboard: 'Admin Dashboard',
            users: 'User Management',
            'domains-admin': 'Domain Admin',
            analytics: 'Analytics'
        };
        return titles[pageId] || 'Page';
    }

    bindEvents() {
        // Navigation clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link[data-page]')) {
                e.preventDefault();
                this.navigateTo(e.target.dataset.page);
            }
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const mobileDrawer = document.querySelector('.mobile-drawer');
        const closeDrawer = document.querySelector('.close-drawer');

        if (mobileToggle && mobileDrawer) {
            mobileToggle.addEventListener('click', () => {
                mobileDrawer.classList.add('open');
            });

            closeDrawer.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
            });
        }

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigateTo(e.state.page);
            }
        });
    }

    loadUserPreferences() {
        // Load saved navigation preferences
        const savedPage = localStorage.getItem('alsania-current-page');
        if (savedPage) {
            this.currentPage = savedPage;
        }
    }
}

// Initialize navigation system
document.addEventListener('DOMContentLoaded', () => {
    const nav = new AlsaniaNavigation();
    nav.renderNavigation();
});
