// Alsania Main JavaScript
// Site functionality (components loaded by loadComponents.js)

// Load all components when DOM is ready
// Components are loaded by loadComponents.js, which has better path handling
// This file only handles interactive functionality
document.addEventListener("DOMContentLoaded", async () => {
  // Initialize theme toggle if it exists (component loaded by loadComponents.js)
  initThemeToggle();

  // Initialize mobile menu
  initMobileMenu();

  // Initialize any other functionality
  initWaitlistForm();
  initNyxDownload();
});

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navMenu = document.querySelector(".alsania-nav");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileMenuBtn.classList.toggle("active");
    });
  }
}

// Theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  // Check for saved theme or default to dark
  const currentTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeToggle.checked = currentTheme === "light";

  themeToggle.addEventListener("change", () => {
    const newTheme = themeToggle.checked ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

// Waitlist form functionality
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

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    try {
      // In production, replace with actual API call
      console.log("Waitlist submission:", email);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      showMessage(
        messageDiv,
        "Thank you! You'll be notified when we launch.",
        "success",
      );
      waitlistForm.reset();

      // Track conversion (analytics)
      if (typeof gtag !== "undefined") {
        gtag("event", "waitlist_signup", {
          event_category: "Engagement",
          event_label: "Homepage Waitlist",
        });
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      showMessage(
        messageDiv,
        "Something went wrong. Please try again.",
        "error",
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Get Notified";
    }
  });
}

// Nyx download functionality
function initNyxDownload() {
  const nyxDownloadBtn = document.getElementById("download-nyx");
  if (!nyxDownloadBtn) return;

  nyxDownloadBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Track download click
    if (typeof gtag !== "undefined") {
      gtag("event", "nyx_download_click", {
        event_category: "Downloads",
        event_label: "Homepage Nyx Button",
      });
    }

    // Redirect to Nyx page (download happens there)
    window.location.href = "../nyx/index.html";
  });
}

// Helper functions
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(element, message, type) {
  element.textContent = message;
  element.className = `form-message ${type}`;
  element.style.display = "block";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    element.style.display = "none";
  }, 5000);
}

// Google Analytics event tracking helper
function trackEvent(category, action, label) {
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}
