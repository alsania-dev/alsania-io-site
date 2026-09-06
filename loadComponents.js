// loadComponents.js - Runs immediately
const DEBUG = true;
function log(...args) { if (DEBUG) console.log("[Components]", ...args); }
function error(...args) { console.error("[Components]", ...args); }
function getComponentsBasePath() { return window.location.origin + "/components"; }
const INLINE_COMPONENTS = {
  "header": `<header class="alsania-header">
  <div class="nav-container">
    <a href="/" class="alsania-logo">
      <div class="logo-container">
        <span class="logo-text">ALSANIA</span>
      </div>
    </a>
    <nav class="alsania-nav">
      <ul>
        <li><a href="/" class="nav-link">Home</a></li>
        <li class="dropdown">
          <a href="#" class="nav-link dropdown-toggle">Products <span class="arrow">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="/tools/nyx/">Nyx Extension</a></li>
            <li><a href="/tools/devconx/">DevConX (VSCode)</a></li>
            <li><a href="/tools/scrypgen/">ScrypGen</a></li>
            <li><a href="/tools/nyx-unified/">Nyx Unified</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="nav-link dropdown-toggle">Ecosystem <span class="arrow">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="/rep/">Agent Registry</a></li>
            <li><a href="/rating/">Rate Agents</a></li>
            <li><a href="/claim/">Alsa Faucet</a></li>
            <li><a href="/hilo/">Hi-Lo Game</a></li>
            <li><a href="/dreamai/">DreamAI Mint</a></li>
            <li><a href="/aed/">AED</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="nav-link dropdown-toggle">Community <span class="arrow">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="/about/">About</a></li>
            <li><a href="/story/">Book of Alsania</a></li>
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/contribute/">Contribute</a></li>
            <li><a href="/donate/">Donate</a></li>
          </ul>
        </li>
        <li><a href="/shop/" class="nav-link">Merch</a></li>
        <li><a href="/services/" class="nav-link">Services</a></li>
        <li><a href="/contact/" class="nav-link">Contact</a></li>
      </ul>
    </nav>
    <div class="header-right">
      <div id="theme-toggle-container"></div>
      <button class="mobile-menu" aria-label="Menu" style="display:flex;flex-direction:column;justify-content:space-between;width:30px;height:24px;background:transparent;border:none;cursor:pointer;padding:0;margin-left:12px;">
        <span style="display:block;height:3px;width:100%;background-color:#e0e0e0;border-radius:3px;transition:all 0.3s ease;"></span>
        <span style="display:block;height:3px;width:100%;background-color:#e0e0e0;border-radius:3px;transition:all 0.3s ease;"></span>
        <span style="display:block;height:3px;width:100%;background-color:#e0e0e0;border-radius:3px;transition:all 0.3s ease;"></span>
      </button>
    </div>
  </div>
</header>`,
  "footer": `<footer class="footer">
  <div class="footer-container">
    <div class="footer-grid">
      <div class="footer-section">
        <h3>Alsania I/O</h3>
        <p>Sovereign technology ecosystem. Built for creators, owned by no one, open to everyone.</p>
        <div class="social-links">
          <a href="https://github.com/alsania-dev" target="_blank" rel="noopener"><img src="/assets/img/web-icons/github-icon.svg" alt="GitHub" style="width:28px;height:28px;" /></a>
          <a href="https://x.com/sigmasauer07" target="_blank" rel="noopener"><img src="/assets/img/web-icons/x-icon.svg" alt="X" style="width:28px;height:28px;" /></a>
          <a href="https://t.me/Alsania_io" target="_blank" rel="noopener"><img src="/assets/img/web-icons/telegram-icon.svg" alt="Telegram" style="width:28px;height:28px;" /></a>
          <a href="https://discord.gg/SaCTgSHqdv" target="_blank" rel="noopener"><img src="/assets/img/web-icons/discord-icon.svg" alt="Discord" style="width:28px;height:28px;" /></a>
        </div>
      </div>
      <div class="footer-section">
        <h3>Live Projects</h3>
        <ul>
          <li><a href="/tools/nyx/">Nyx Extension</a></li>
          <li><a href="/shop/">Official Merch</a></li>
          <li><a href="/story">Book of Alsania</a></li>
          <li><a href="/claim">Faucet</a></li>
          <li><a href="/hilo/">Hi-Lo Game</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Coming Soon</h3>
        <ul>
          <li><a href="/tools/devconx/">DevConX (VSCode)</a></li>
          <li><a href="/tools/scrypgen/">ScrypGen</a></li>
          <li><a href="/tools/nyx-unified/">Nyx Unified</a></li>
          <li><a href="/services/">Services</a></li>
          <li><a href="/aed/">AED</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Legal</h3>
        <ul>
          <li><a href="/legal/privacy-policy.html">Privacy Policy</a></li>
          <li><a href="/legal/cookie-policy.html">Cookie Policy</a></li>
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
</footer>`
};
function loadComponent(containerId, componentName) {
  return new Promise((resolve, reject) => {
    const container = document.getElementById(containerId);
    if (!container) { error(`Container #${containerId} not found!`); reject(new Error(`Container not found`)); return; }
    log(`Loading ${containerId}: ${componentName}`);
    const url = getComponentsBasePath() + "/" + componentName;
    fetch(url).then(r => r.ok ? r.text() : Promise.reject(r.status)).then(html => {
      container.innerHTML = html;
      log(`✓ ${containerId} loaded from ${url}`);
      resolve(container);
    }).catch(() => {
      if (INLINE_COMPONENTS[componentName]) {
        container.innerHTML = INLINE_COMPONENTS[componentName];
        log(`✓ ${containerId} loaded from inline fallback`);
        resolve(container);
      } else {
        reject(new Error("No fallback"));
      }
    });
  });
}
function initMobileMenu() {
  const btn = document.querySelector(".mobile-menu");
  if (!btn) { log("Mobile menu button not found"); return; }
  log("Initializing mobile menu...");
  const nav = document.querySelector(".alsania-nav");
  if (!nav) { setTimeout(initMobileMenu, 300); return; }
  btn.addEventListener("click", function(e) {
    e.stopPropagation();
    nav.classList.toggle("active");
    btn.classList.toggle("active");
    log("Mobile menu toggled");
  });
  document.addEventListener("click", function(e) {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove("active");
      btn.classList.remove("active");
    }
  });
}
function initComponents() {
  log("Initializing components...");
  const promises = [];
  const hc = document.getElementById("header-container");
  const fc = document.getElementById("footer-container");
  if (hc) promises.push(loadComponent("header-container", "header"));
  if (fc) promises.push(loadComponent("footer-container", "footer"));
  if (promises.length === 0) { log("No containers found"); return; }
  Promise.all(promises).then(() => {
    log("All components loaded");
    setTimeout(initMobileMenu, 100);
  }).catch(err => error("Some components failed:", err));
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initComponents);
} else {
  initComponents();
}