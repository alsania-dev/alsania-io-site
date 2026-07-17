// loadComponents.js - Robust component loader for Alsania.io
// Works with both file:// protocol and web servers

// Debug mode - set to false for production
const DEBUG = true;

function log(...args) {
  if (DEBUG) console.log("[Components]", ...args);
}

function error(...args) {
  console.error("[Components]", ...args);
}

// Calculate correct path to components based on current page
function getComponentsBasePath() {
  const protocol = window.location.protocol;
  const pathname = window.location.pathname;
  if (protocol === "file:") {
    // For file:// - build absolute file:// path to components folder
    // pathname example: /home/sigma/Desktop/insidedev/alsania-io-site/index.html
    // or: /home/sigma/Desktop/insidedev/alsania-io-site/tools/nyx/index.html
    // Find project root by locating 'alsania-io-site'
    const projectRoot = pathname.substring(
      0,
      pathname.indexOf("/alsania-io-site") + "/alsania-io-site".length,
    );
    return "file://" + projectRoot + "/components";
  } else {
    // For http/https - use absolute path from root
    return "/components";
  }
}

// Inline component content for file:// protocol fallback
const INLINE_COMPONENTS = {
  "header.html": `<header class="alsania-header">
  <div class="nav-container">
    <a href="/" class="alsania-logo">
      <div class="logo-container">
        <span class="logo-text">
          ALSANIA
        </span>
      </div>
    </a>
    <nav class="alsania-nav">
      <ul>
        <li><a href="/" class="nav-link">Home</a></li>
        <li><a href="/story/" class="nav-link">Story</a></li>
        <li><a href="/tools/nyx/" class="nav-link">Nyx</a></li>
        <li><a href="/hilo/" class="nav-link">Hi-Lo Game</a></li>
        <li><a href="/shop/" class="nav-link">Shop</a></li>
        <li><a href="/about/" class="nav-link">About</a></li>
        <li><a href="/contact/" class="nav-link">Contact</a></li>
        <li><a href="/token/" class="nav-link">Token</a></li>
        <li><a href="/claim/" class="nav-link">Claim</a></li>
        <li><a href="/donate/" class="nav-link">Support</a></li>
      </ul>
    </nav>
    <div class="header-right">
      <div id="theme-toggle-container"></div>
      <button class="mobile-menu" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>`,
  "footer.html": `<footer class="footer">
  <div class="footer-container">
    <div class="footer-grid">
      <div class="footer-section">
        <h3>Alsania</h3>
        <p>
          Sovereign technology ecosystem. Built for creators, owned by no one,
          open to everyone.
        </p>
        <div class="social-links">
          <a
            href="https://github.com/alsania-dev"
            title="GitHub"
            target="_blank"
            rel="noopener"
            ><img src="/assets/img/web-icons/github-icon.svg" alt="GitHub" style="width:28px;height:28px;" /></a
          >
          <a
            href="https://x.com/alsania_io"
            title="X"
            target="_blank"
            rel="noopener"
            ><img src="/assets/img/web-icons/x-icon.svg" alt="X" style="width:28px;height:28px;" /></a
          >
          <a
            href="https://t.me/Alsania_io"
            title="Telegram"
            target="_blank"
            rel="noopener"
            ><img src="/assets/img/web-icons/telegram-icon.svg" alt="Telegram" style="width:28px;height:28px;" /></a
          >
          <a
            href="https://discord.gg/SaCTgSHqdv"
            title="Discord"
            target="_blank"
            rel="noopener"
            ><img src="/assets/img/web-icons/discord-icon.svg" alt="Discord" style="width:28px;height:28px;" /></a
          >
        </div>
      </div>
      <div class="footer-section">
        <h3>Live Projects</h3>
        <ul>
          <li><a href="/tools/nyx/">Nyx Extension</a></li>
          <li><a href="/shop/">Official Merch</a></li>
          <li><a href="/redbubble">Redbubble Store</a></li>
          <li><a href="/dashery">Dashery Store</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Coming Soon</h3>
        <ul>
          <li><a href="/tools/devcon/">DevCon (VSCode)</a></li>
          <li><a href="/tools/scrypgen/">ScrypGen</a></li>
          <li><a href="/tools/nyx-unified/">Nyx Unified</a></li>
          <li><a href="/aed/">Enhanced Domains</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Legal</h3>
        <ul>
          <li><a href="/legal/privacy-policy.html">Privacy Policy</a></li>
          <li><a href="/legal/terms.html">Terms of Service</a></li>
          <li><a href="/legal/disclaimer.html">Disclaimer</a></li>
          <li><a href="/legal/refund-policy.html">Refund Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Alsania I/O. All rights reserved. Built with purpose.</p>
    </div>
  </div>
</footer>`,
};

// Load a single component
function loadComponent(containerId, componentName) {
  return new Promise((resolve, reject) => {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        error(`Container #${containerId} not found!`);
        reject(new Error(`Container #${containerId} not found`));
        return;
      }

      log(`Loading ${containerId}: ${componentName}`);

      if (window.location.protocol === "file:") {
        // Use inline components for file:// protocol
        if (INLINE_COMPONENTS[componentName]) {
          container.innerHTML = INLINE_COMPONENTS[componentName];
          log(`✓ ${containerId} loaded from inline`);
          setTimeout(() => {
            initThemeToggle();
            initMobileMenu();
          }, 0);
          resolve(container);
        } else {
          throw new Error(`Inline component not found: ${componentName}`);
        }
      } else {
        // Use fetch for http/https
        const basePath = getComponentsBasePath();
        const url = `${basePath}/${componentName}`;

        log(`Fetching from ${url}`);

        fetch(url)
          .then((response) => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.text();
          })
          .then((html) => {
            container.innerHTML = html;
            log(`✓ ${containerId} loaded successfully`);
            setTimeout(() => {
              initThemeToggle();
              initMobileMenu();
            }, 0);
            resolve(container);
          })
          .catch((err) => {
            error(`Failed to load ${containerId}:`, err.message);
            container.innerHTML = `<div style="color: #ff6b6b; padding: 20px; border: 2px solid #ff6b6b; background: rgba(255, 107, 107, 0.1); border-radius: 5px;">
                            <strong>⚠️ Component Load Error:</strong> ${err.message}<br>
                            <small style="color: #999;">Check browser console (F12) for more details</small>
                        </div>`;
            reject(err);
          });
      }
    } catch (err) {
      error(`Failed to load ${containerId}:`, err.message);
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = `<div style="color: #ff6b6b; padding: 20px; border: 2px solid #ff6b6b; background: rgba(255, 107, 107, 0.1); border-radius: 5px;">
                    <strong>⚠️ Component Load Error:</strong> ${err.message}<br>
                    <small style="color: #999;">Check browser console (F12) for more details</small>
                </div>`;
      }
      reject(err);
    }
  });
}

// Initialize theme toggle
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) {
    log("Theme toggle checkbox not found");
    return;
  }

  // Get saved theme or default to dark
  const savedTheme = localStorage.getItem("alsania-theme");
  const currentTheme = savedTheme || "dark";

  // Apply theme
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeToggle.checked = currentTheme === "light";

  log(`Theme initialized: ${currentTheme} (saved: ${savedTheme || "none"})`);

  // Add change listener
  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("alsania-theme", newTheme);
    log(`Theme changed to: ${newTheme}`);
  });
}

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  if (!mobileMenuBtn) return;
  
  let attempts = 0;
  let attached = false;
  function attachNav() {
    if (attached) return;
    const navMenu = document.querySelector(".alsania-nav");
    if (!navMenu) {
      attempts++;
      if (attempts < 5) { setTimeout(attachNav, 500); }
      return;
    }
    attached = true;
    const btn = document.querySelector(".mobile-menu");
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      btn.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !btn.contains(e.target)) {
        navMenu.classList.remove("active");
        btn.classList.remove("active");
      }
    });
  }
  attachNav();
}

// Redirect mapping for file:// protocol
const REDIRECTS = {
  "/dashery": "https://mnemonic.dashery.com/",
  "/redbubble": "https://www.redbubble.com/people/AlsaniaArt/shop",
  "/merch": "shop/index.html",
};

// Fix links for file:// protocol
function fixLinksForFileProtocol() {
  if (window.location.protocol !== "file:") return;

  // Get the project root from current pathname
  const pathname = window.location.pathname;
  const projectRoot = pathname.substring(
    0,
    pathname.indexOf("/alsania-io-site") + "/alsania-io-site".length,
  );

  // Fix all navigation links
  document.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // Check if this is a redirect link
    if (REDIRECTS[href]) {
      link.href = REDIRECTS[href];
      // Keep target="_blank" for external redirects
      return;
    }

    // Convert internal absolute paths to file:// URLs
    if (href.startsWith("/") && !href.startsWith("//")) {
      // Determine if it needs index.html
      let filePath = href;
      if (href.endsWith("/") || !href.includes(".")) {
        filePath = href.endsWith("/")
          ? href + "index.html"
          : href + "/index.html";
      }
      link.href = "file://" + projectRoot + filePath;
    }
  });

  log("Fixed links for file:// protocol");
}

// Main initialization
function initComponents() {
  log("Initializing components...");

  // Load components in sequence - nav depends on header
  const promises = [];

  if (document.getElementById("header-container")) {
    promises.push(
      loadComponent("header-container", "header.html").then(() => {
        // After header loads, load nav into the nav-container
        if (document.getElementById("nav-container")) {
          return loadComponent("nav-container", "nav.html");
        }
      })
    );
  }

  if (document.getElementById("footer-container")) {
    promises.push(loadComponent("footer-container", "footer.html"));
  }

  // Wait for all components to load
  Promise.all(promises)
    .then(() => {
      // Initialize interactive features
      initThemeToggle();
      initMobileMenu();

      // Fix links for file:// protocol
      fixLinksForFileProtocol();

      // Initialize cookie consent banner (moved from footer)
      initCookieConsent();

      log("All components initialized successfully");
    })
    .catch((err) => {
      error("Some components failed to load:", err);
    });
}

// Cookie consent banner initialization
function initCookieConsent() {
  log("Initializing cookie consent...");

  // Check if banner already exists
  var banner = document.getElementById('cookie-consent');
  var acceptBtn = document.getElementById('accept-cookies');
  var rejectBtn = document.getElementById('reject-cookies');
  var settingsBtn = document.getElementById('cookie-settings');

  // If banner doesn't exist, create it
  if (!banner) {
    log("Creating cookie banner...");
    banner = document.createElement('div');
    banner.id = 'cookie-consent';
    banner.style.cssText = 'position: fixed; bottom: 0; left: 0; right: 0; background: #1a1a1a; border-top: 1px solid #333; padding: 20px; z-index: 10000; font-family: system-ui, -apple-system, sans-serif;';
    banner.innerHTML = `
      <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 12px;">
        <p style="margin: 0; font-size: 14px; color: #e5e5e5; text-align: center;">
          🍪 We use cookies and similar technologies to improve your experience, analyze traffic, and serve relevant content.
          You can choose to accept all cookies or manage your preferences.
          <a href="/legal/privacy-policy.html" style="color: #10b981; text-decoration: none; font-weight: 500;">Learn more</a>
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
          <button id="accept-cookies" style="background: #10b981; color: white; border: none; padding: 10px 28px; border-radius: 5px; cursor: pointer; font-weight: 600; font-size: 14px;">Accept All</button>
          <button id="reject-cookies" style="background: #4a4a4a; color: white; border: none; padding: 10px 28px; border-radius: 5px; cursor: pointer; font-weight: 500; font-size: 14px;">Reject All</button>
          <button id="cookie-settings" style="background: transparent; color: #a0a0b0; border: 1px solid #4a4a4a; padding: 10px 28px; border-radius: 5px; cursor: pointer; font-weight: 500; font-size: 14px;">Manage Settings</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    // Update references
    acceptBtn = document.getElementById('accept-cookies');
    rejectBtn = document.getElementById('reject-cookies');
    settingsBtn = document.getElementById('cookie-settings');
  }

  // Check if user has already made a choice
  var cookiePreference = localStorage.getItem('cookie-consent');
  if (cookiePreference === 'accepted' || cookiePreference === 'rejected') {
    if (banner) banner.style.display = 'none';
    log("Cookie preference already set: " + cookiePreference);
    return;
  }

  // Show the banner
  if (banner) banner.style.display = 'block';

  // Handle Accept All
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.setItem('cookie-consent', 'accepted');
      if (banner) banner.style.display = 'none';
      log('Cookies accepted');
    });
  }

  // Handle Reject All
  if (rejectBtn) {
    rejectBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.setItem('cookie-consent', 'rejected');
      if (banner) banner.style.display = 'none';
      log('Cookies rejected');
    });
  }

  // Handle Manage Settings
  if (settingsBtn) {
    settingsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      var choice = confirm(
        'Cookie Settings\n\n' +
        'Essential cookies are required for basic site functionality.\n' +
        'Analytics cookies help us understand how visitors use our site.\n\n' +
        'Click OK to accept analytics cookies, or Cancel to reject them.'
      );
      if (choice) {
        localStorage.setItem('cookie-consent', 'accepted');
        if (banner) banner.style.display = 'none';
      } else {
        localStorage.setItem('cookie-consent', 'rejected');
        if (banner) banner.style.display = 'none';
      }
      log('Cookie settings saved: ' + localStorage.getItem('cookie-consent'));
    });
  }

  log("Cookie consent initialized");
}

// Start when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initComponents);
} else {
  // DOM already loaded
  initComponents();
}

// Make functions available globally for debugging
window.alsaniaComponents = {
  reload: initComponents,
  getComponentsBasePath,
  debug: DEBUG,
};