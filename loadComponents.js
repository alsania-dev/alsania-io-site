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

// Inline components for file:// protocol support
const INLINE_COMPONENTS = {
"components/header.html": `<header class="alsania-header">
 <div class="nav-container">
   <a href="/" class="alsania-logo">
     <div class="logo-container">
       <img src="/assets/img/icons/wordmark_1023x214.png" alt="Alsania Logo" class="logo-image">
     </div>
   </a>
   <div id="nav-container"></div>
   <div class="header-right">
     <div id="theme-toggle-container"></div>
     <button class="mobile-menu" aria-label="Menu">
       <span></span><span></span><span></span>
     </button>
   </div>
 </div>
</header>`,
"components/nav.html": `<nav class="alsania-nav">
 <ul>
   <li><a href="/" class="nav-link">Home</a></li>
   <li><a href="/tools/nyx/" class="nav-link">Nyx</a></li>
   <li><a href="/shop/" class="nav-link">Shop</a></li>
   <li><a href="/about/" class="nav-link">About</a></li>
   <li><a href="/contact/" class="nav-link">Contact</a></li>
   <li><a href="/donate/" class="nav-link">Support</a></li>
 </ul>
</nav>`,
"components/theme-toggle.html": `<div class="theme-toggle">
 <input
   type="checkbox"
   id="theme-toggle"
   class="theme-toggle-checkbox"
   aria-label="Toggle dark/light mode"
 />
 <label for="theme-toggle" class="theme-toggle-label">
   <span class="theme-toggle-icon">🌙</span>
   <span class="theme-toggle-slider"></span>
   <span class="theme-toggle-icon">☀️</span>
 </label>
</div>

<style>
 .theme-toggle {
   display: inline-block;
 }

 .theme-toggle-checkbox {
   display: none;
 }

 .theme-toggle-label {
   display: flex;
   align-items: center;
   gap: 8px;
   cursor: pointer;
   padding: 4px;
   border-radius: 20px;
   background-color: var(--bg-tertiary);
   position: relative;
   border: 1px solid var(--border-color);
 }

 .theme-toggle-slider {
   width: 36px;
   height: 20px;
   background-color: var(--accent-primary);
   border-radius: 20px;
   position: relative;
   transition: var(--transition);
 }

 .theme-toggle-slider::before {
   content: "";
   position: absolute;
   width: 16px;
   height: 16px;
   border-radius: 50%;
   background-color: white;
   top: 2px;
   left: 2px;
   transition: var(--transition);
 }

 .theme-toggle-checkbox:checked
   + .theme-toggle-label
   .theme-toggle-slider::before {
   transform: translateX(16px);
 }

 .theme-toggle-icon {
   font-size: 14px;
   user-select: none;
 }
</style>`,
"components/footer.html": `<footer class="footer">
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
           >⚡</a
         >
         <a
           href="https://t.me/Alsania_io"
           title="Telegram"
           target="_blank"
           rel="noopener"
           >🐦</a
         >
         <a
           href="https://discord.gg/SaCTgSHqdv"
           title="Discord"
           target="_blank"
           rel="noopener"
           >💬</a
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
         <li><a href="/tools/devconx/">DevConX (VSCode)</a></li>
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
     <p>© 2026 Alsania I/O. All rights reserved. Built with purpose.</p>
   </div>
 </div>
</footer>`,
};

// Calculate correct path to components based on current page
function getComponentsBasePath() {
const protocol = window.location.protocol;
  const hostname = window.location.hostname;
const pathname = window.location.pathname;

if (protocol === "file:") {
// For file:// - build absolute file:// path to components folder
const projectRoot = pathname.substring(
0,
pathname.indexOf("/alsania-io-site") + "/alsania-io-site".length,
);
return "file://" + projectRoot + "/components";
  } else if (hostname === "alsania-dev.github.io") {
    // GitHub Pages - add repository name
    return "/alsania-io-site/components";
} else {
    // For http/https - use absolute path from root
    // Cloudflare Pages or custom domain - use root path
return "/components";
}
}

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
resolve(container);
})
.catch((err) => {
error(`Failed to load ${containerId}:`, err.message);
container.innerHTML = `<div style="color: #ff6b6b; padding: 20px; border: 2px solid #ff6b6b; background: rgba(255, 107, 107, 0.3); border-radius: 5px;">
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
container.innerHTML = `<div style="color: #ff6b6b; padding: 20px; border: 2px solid #ff6b6b; background: rgba(255, 107, 107, 0.3); border-radius: 5px;">
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
const navMenu = document.querySelector(".alsania-nav");
if (!mobileMenuBtn || !navMenu) {
log("Mobile menu elements not found");
return;
}

mobileMenuBtn.addEventListener("click", () => {
navMenu.classList.toggle("active");
mobileMenuBtn.classList.toggle("active");
log("Mobile menu toggled");
});
// Close menu when clicking outside
document.addEventListener("click", (e) => {
if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
navMenu.classList.remove("active");
mobileMenuBtn.classList.remove("active");
}
});
}

// Redirect mapping for file:// protocol
const REDIRECTS = {
"/dashery": "https://mnemonic.dashery.com/",
"/redbubble": "https://www.redbubble.com/people/AlsaniaArt/shop",
"/merch": "shop/index.html",
};

// Fix links and images for file:// protocol
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

// Fix image sources
document.querySelectorAll("img").forEach((img) => {
const src = img.getAttribute("src");
if (!src) return;

// Convert absolute paths to file:// URLs
if (src.startsWith("/") && !src.startsWith("//")) {
img.src = "file://" + projectRoot + src;
}
});

log("Fixed links and images for file:// protocol");
}

// Main initialization
function initComponents() {
log("Initializing components...");

// Load header first
let headerPromise = Promise.resolve();
if (document.getElementById("header-container")) {
headerPromise = loadComponent("header-container", "components/header.html");
}

headerPromise
.then(() => {
// Now load nav into the header
if (document.getElementById("nav-container")) {
return loadComponent("nav-container", "components/nav.html");
}
})
.then(() => {
// Now load theme toggle
if (document.getElementById("theme-toggle-container")) {
return loadComponent(
"theme-toggle-container",
"components/theme-toggle.html",
);
}
})
.then(() => {
// Now load footer
if (document.getElementById("footer-container")) {
return loadComponent("footer-container", "components/footer.html");
}
})
.then(() => {
// Initialize interactive features
initThemeToggle();
initMobileMenu();

// Fix links for file:// protocol
fixLinksForFileProtocol();

log("All components initialized successfully");
})
.catch((err) => {
error("Some components failed to load:", err);
});
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