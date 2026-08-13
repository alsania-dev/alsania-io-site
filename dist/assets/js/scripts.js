// Alsania Page Functionality
// This file handles page-specific interactive features
// loadComponents.js handles header, footer, theme, mobile menu, and cookie consent

document.addEventListener("DOMContentLoaded", function() {
  initWaitlistForm();
  initNyxDownload();
  initNyxPageButtons();
});

// ============================================================
// WAITLIST FORM
// ============================================================
function initWaitlistForm() {
  const waitlistForm = document.getElementById("waitlist-form");
  if (!waitlistForm) return;

  waitlistForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("waitlist-email");
    const submitBtn = waitlistForm.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById("waitlist-message");

    if (!emailInput || !submitBtn || !messageDiv) return;

    const email = emailInput.value.trim();
    if (!email || !isValidEmail(email)) {
      showMessage(messageDiv, "Please enter a valid email address.", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      // In production, replace with actual API call
      console.log("Waitlist submission:", email);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showMessage(
        messageDiv,
        "Thank you! You'll be notified when we launch.",
        "success"
      );
      waitlistForm.reset();

      trackEvent("Engagement", "waitlist_signup", "Homepage Waitlist");
    } catch (error) {
      console.error("Waitlist submission error:", error);
      showMessage(
        messageDiv,
        "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Get Notified";
    }
  });
}

// ============================================================
// NYX DOWNLOAD
// ============================================================
function initNyxDownload() {
  const nyxDownloadBtn = document.getElementById("download-nyx");
  if (!nyxDownloadBtn) return;

  nyxDownloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    trackEvent("Downloads", "nyx_download_click", "Homepage Nyx Button");
    window.location.href = "../nyx/index.html";
  });
}

// ============================================================
// NYX PAGE PLATFORM DOWNLOAD BUTTONS
// ============================================================
function initNyxPageButtons() {
  const downloadButtons = document.querySelectorAll(".platform-download-btn");
  if (!downloadButtons.length) return;

  downloadButtons.forEach((btn) => {
    btn.addEventListener("click", function() {
      const platform = this.getAttribute("data-platform");
      const zipFiles = {
        windows: "/tools/nyx/downloads/Nyx-Control-v4.0.2.zip",
        macos: "/tools/nyx/downloads/Nyx-Control-v4.0.2.zip",
        linux: "/tools/nyx/downloads/Nyx-Control-v4.0.2.zip"
      };
      
      if (zipFiles[platform]) {
        trackEvent("Downloads", "nyx_platform_download", platform);
        const link = document.createElement("a");
        link.href = zipFiles[platform];
        link.download = `nyx-${platform}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  });
}

// ============================================================
// HELPERS
// ============================================================
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMessage(element, message, type) {
  element.textContent = message;
  element.className = `form-message ${type}`;
  element.style.display = "block";
  setTimeout(() => {
    element.style.display = "none";
  }, 5000);
}

function trackEvent(category, action, label) {
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}
