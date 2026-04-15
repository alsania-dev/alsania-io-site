/* Nyx Page JavaScript - Separated from HTML */

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  initDownloadButtons();
  initPlatformAnimation();
  initFeatureHover();
  initMobileMenu();

  // Track analytics events
  initAnalytics();

  // Smooth scrolling for anchor links
  initSmoothScroll();

  // Initialize platform download buttons
  initPlatformDownloads();
});

// Download buttons functionality
function initDownloadButtons() {
  const downloadBtn = document.getElementById("nyx-download-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Track download attempt
      if (typeof gtag !== "undefined") {
        gtag("event", "nyx_download_click", {
          event_category: "Engagement",
          event_label: "Nyx Main Download Button",
        });
      }

      // Show platform selection dialog
      showPlatformSelection();
    });
  }
}

// Platform download buttons
function initPlatformDownloads() {
  document.querySelectorAll('.platform-download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const platform = this.getAttribute('data-platform');
      downloadPlatformPackage(platform, this); // Pass the button element
    });
  });
}

// Download specific platform package
function downloadPlatformPackage(platform, buttonElement) {
  const platformNames = {
    windows: "Windows",
    macos: "macOS",
    linux: "Linux"
  };

  // Get base path for GitHub Pages
  const getBasePath = () => {
    if (window.location.hostname === 'alsania-dev.github.io') {
      return '/alsania-io-site';
    }
    return '';
  };
  
  const basePath = getBasePath();
  const zipFiles = {
    windows: basePath + "/tools/nyx/downloads/win-nyx-v1.0.0.zip",
    macos: basePath + "/tools/nyx/downloads/mac-nyx-v1.0.0.zip",
    linux: basePath + "/tools/nyx/downloads/linux-nyx-v1.0.0.zip"
  };

  // Track platform download
  if (typeof gtag !== "undefined") {
    gtag("event", "platform_download", {
      event_category: "Engagement",
      event_label: `Nyx - ${platformNames[platform]}`,
    });
  }

  // Get the button that was clicked
  const button = buttonElement || document.querySelector(`.platform-download-btn[data-platform="${platform}"]`);
  
  if (button) {
    // Show loading state
    const originalText = button.textContent;
    button.textContent = "Downloading...";
    button.disabled = true;

    // Create and trigger download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = zipFiles[platform];
      link.download = `nyx-${platform}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Restore button
      button.textContent = originalText;
      button.disabled = false;

      // Show success message
      showDownloadSuccess(platformNames[platform]);
    }, 500);
  } else {
    // No button found, just trigger download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = zipFiles[platform];
      link.download = `nyx-${platform}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
      showDownloadSuccess(platformNames[platform]);
    }, 500);
  }
}

// Show platform selection dialog
function showPlatformSelection() {
  const dialog = document.createElement('div');
  dialog.className = 'platform-selection-dialog';
  dialog.innerHTML = `
    <div class="dialog-content">
      <h3>Select Your Platform</h3>
      <p>Choose your operating system to download the appropriate package:</p>
      <div class="platform-options">
        <button class="platform-option" data-platform="windows">
          <span class="platform-icon">🪟</span>
          <span class="platform-name">Windows</span>
          <span class="platform-desc">.bat scripts, desktop shortcut</span>
        </button>
        <button class="platform-option" data-platform="macos">
          <span class="platform-icon">🍎</span>
          <span class="platform-name">macOS</span>
          <span class="platform-desc">.command launchers, shell scripts</span>
        </button>
        <button class="platform-option" data-platform="linux">
          <span class="platform-icon">🐧</span>
          <span class="platform-name">Linux</span>
          <span class="platform-desc">Shell scripts, desktop entry</span>
        </button>
      </div>
      <button class="dialog-close">Cancel</button>
    </div>
  `;

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .platform-selection-dialog {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 10, 10, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .dialog-content {
      background: linear-gradient(135deg, var(--nyx-purple) 0%, var(--nyx-dark-purple) 100%);
      border: 2px solid var(--nyx-neon);
      border-radius: 12px;
      padding: 40px;
      max-width: 600px;
      width: 90%;
      text-align: center;
    }
    .dialog-content h3 {
      color: var(--nyx-accent);
      margin-bottom: 15px;
      font-size: 1.8rem;
    }
    .dialog-content p {
      color: var(--nyx-text);
      margin-bottom: 30px;
    }
    .platform-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .platform-option {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--nyx-border);
      border-radius: 8px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .platform-option:hover {
      border-color: var(--nyx-accent);
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(57, 255, 20, 0.3);
    }
    .platform-icon {
      font-size: 2.5rem;
      margin-bottom: 10px;
    }
    .platform-name {
      color: var(--nyx-neon);
      font-weight: 600;
      font-size: 1.2rem;
      margin-bottom: 5px;
    }
    .platform-desc {
      color: var(--nyx-text);
      font-size: 0.9rem;
    }
    .dialog-close {
      background: transparent;
      color: var(--nyx-text);
      border: 1px solid var(--nyx-text);
      border-radius: 4px;
      padding: 10px 30px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .dialog-close:hover {
      color: var(--nyx-neon);
      border-color: var(--nyx-neon);
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(dialog);

  // Add event listeners
  dialog.querySelectorAll('.platform-option').forEach(option => {
    option.addEventListener('click', function() {
      const platform = this.getAttribute('data-platform');
      downloadPlatformPackage(platform, null); // Pass null for button element
      document.body.removeChild(dialog);
      document.head.removeChild(style);
    });
  });

  dialog.querySelector('.dialog-close').addEventListener('click', function() {
    document.body.removeChild(dialog);
    document.head.removeChild(style);
  });

  // Close on background click
  dialog.addEventListener('click', function(e) {
    if (e.target === dialog) {
      document.body.removeChild(dialog);
      document.head.removeChild(style);
    }
  });
}

// Platform tags animation
function initPlatformAnimation() {
  const platforms = document.querySelectorAll(".nyx-platform");
  platforms.forEach((platform, index) => {
    // Staggered animation
    platform.style.animationDelay = `${index * 0.1}s`;
    platform.classList.add("animate-in");
  });
}

// Feature card hover effects
function initFeatureHover() {
  const features = document.querySelectorAll(".nyx-feature");
  features.forEach((feature) => {
    feature.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    feature.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Mobile menu toggle (if needed on Nyx page)
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      const nav = document.querySelector(".nyx-nav");
      nav.classList.toggle("active");
      this.classList.toggle("active");
    });
  }
}

// Analytics tracking
function initAnalytics() {
  // Track section visibility
  const sections = document.querySelectorAll(".nyx-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && typeof gtag !== "undefined") {
          const sectionName = entry.target.id || "unnamed_section";
          gtag("event", "section_view", {
            event_category: "Engagement",
            event_label: `Nyx - ${sectionName}`,
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  sections.forEach((section) => observer.observe(section));

  // Track feature clicks
  document.querySelectorAll(".nyx-feature").forEach((feature) => {
    feature.addEventListener("click", function () {
      const featureName = this.querySelector("h3").textContent;
      if (typeof gtag !== "undefined") {
        gtag("event", "feature_click", {
          event_category: "Engagement",
          event_label: `Nyx - ${featureName}`,
        });
      }
    });
  });

  // Track platform clicks
  document.querySelectorAll(".nyx-platform").forEach((platform) => {
    platform.addEventListener("click", function () {
      const platformName = this.textContent;
      if (typeof gtag !== "undefined") {
        gtag("event", "platform_click", {
          event_category: "Engagement",
          event_label: `Nyx - ${platformName}`,
        });
      }
    });
  });

  // Track Firefox addon clicks
  const firefoxBtn = document.querySelector('a[href*="addons.mozilla.org"]');
  if (firefoxBtn) {
    firefoxBtn.addEventListener('click', function() {
      if (typeof gtag !== "undefined") {
        gtag("event", "firefox_addon_click", {
          event_category: "Engagement",
          event_label: "Nyx Firefox Addon",
        });
      }
    });
  }
}

// Smooth scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

// Download success notification
function showDownloadSuccess(platform) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "download-notification";
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✅</span>
            <div>
                <h4>${platform ? platform + ' ' : ''}Download Started!</h4>
                <p>Check your downloads folder for ${platform ? 'the ' + platform + ' package' : 'nyx-extension.zip'}</p>
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2A004F, #1a0033);
        border: 1px solid #00F6FF;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 20px rgba(0,246,255,0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

  const content = notification.querySelector(".notification-content");
  content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 15px;
    `;

  // Close button
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #00F6FF;
        font-size: 24px;
        cursor: pointer;
        margin-left: auto;
    `;

  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  });

  // Add keyframe animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
  document.head.appendChild(style);

  // Add to page and auto-remove after 5 seconds
  document.body.appendChild(notification);
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
      document.head.removeChild(style);
    }
  }, 5000);
}

// Platform compatibility check
function checkBrowserCompatibility() {
  const isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isEdge = /Edg/.test(navigator.userAgent);
  const isOpera = /OPR/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);

  if (!isChrome && !isEdge && !isOpera && !isFirefox) {
    showBrowserWarning();
  } else if (isFirefox) {
    showFirefoxMessage();
  }
}

function showBrowserWarning() {
  const warning = document.createElement("div");
  warning.className = "browser-warning";
  warning.innerHTML = `
        <p>⚠️ Nyx works best with Chrome, Edge, Firefox, or other Chromium-based browsers.</p>
    `;
  warning.style.cssText = `
        background: rgba(255, 193, 7, 0.1);
        border: 1px solid #ffc107;
        border-radius: 8px;
        padding: 10px 15px;
        margin: 20px 0;
        color: #ffc107;
        text-align: center;
    `;

  const hero = document.querySelector(".nyx-header");
  if (hero) {
    hero.parentNode.insertBefore(warning, hero.nextSibling);
  }
}

function showFirefoxMessage() {
  const message = document.createElement("div");
  message.className = "firefox-message";
  message.innerHTML = `
        <p>🔥 <strong>Firefox user detected!</strong> Nyx is available as a Firefox addon. 
        <a href="https://addons.mozilla.org/en-US/firefox/addon/nyx-aegis/" target="_blank" style="color: #00F6FF; text-decoration: underline;">Get it here</a></p>
    `;
  message.style.cssText = `
        background: rgba(0, 246, 255, 0.1);
        border: 1px solid #00F6FF;
        border-radius: 8px;
        padding: 10px 15px;
        margin: 20px 0;
        color: #00F6FF;
        text-align: center;
    `;

  const hero = document.querySelector(".nyx-header");
  if (hero) {
    hero.parentNode.insertBefore(message, hero.nextSibling);
  }
}

// Initialize browser check on load
window.addEventListener("load", checkBrowserCompatibility);
