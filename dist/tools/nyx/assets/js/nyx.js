/* Nyx Page JavaScript - Separated from HTML */

// DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  initDownloadButton();
  initPlatformAnimation();
  initFeatureHover();
  initMobileMenu();

  // Track analytics events
  initAnalytics();

  // Smooth scrolling for anchor links
  initSmoothScroll();
});

// Download button functionality
function initDownloadButton() {
  const downloadBtn = document.getElementById("nyx-download-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Track download attempt
      if (typeof gtag !== "undefined") {
        gtag("event", "nyx_download_click", {
          event_category: "Engagement",
          event_label: "Nyx Download Button",
        });
      }

      // Show loading state
      const originalText = downloadBtn.textContent;
      downloadBtn.textContent = "Preparing Download...";
      downloadBtn.disabled = true;

      // Simulate download delay (in production, this would be real file download)
      setTimeout(() => {
        // Create and trigger download
        const zipUrl = "/downloads/nyx-package.zip"; // This should be the actual zip file
        const link = document.createElement("a");
        link.href = zipUrl;
        link.download = "nyx-extension.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Restore button
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;

        // Show success message
        showDownloadSuccess();
      }, 1000);
    });
  }
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
function showDownloadSuccess() {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "download-notification";
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✅</span>
            <div>
                <h4>Download Started!</h4>
                <p>Check your downloads folder for nyx-extension.zip</p>
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
    }
  }, 5000);
}

// Platform compatibility check
function checkBrowserCompatibility() {
  const isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isEdge = /Edg/.test(navigator.userAgent);
  const isOpera = /OPR/.test(navigator.userAgent);

  if (!isChrome && !isEdge && !isOpera) {
    showBrowserWarning();
  }
}

function showBrowserWarning() {
  const warning = document.createElement("div");
  warning.className = "browser-warning";
  warning.innerHTML = `
        <p>⚠️ Nyx works best with Chrome, Edge, or other Chromium-based browsers.</p>
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

// Initialize browser check on load
window.addEventListener("load", checkBrowserCompatibility);
