// Universal path fix for GitHub Pages and Cloudflare Pages
// Detects environment and fixes all absolute paths

(function() {
  'use strict';
  
  // Don't run on file:// protocol
  if (window.location.protocol === 'file:') return;
  
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  
  // Determine base path
  let basePath = '';
  if (hostname === 'alsania-dev.github.io') {
    // GitHub Pages - repository site
    basePath = '/alsania-io-site';
  }
  // For alsania.io or other domains, basePath remains '' (root)
  
  // If we don't need to fix anything, exit early
  if (basePath === '') return;
  
  // Function to fix an element's attribute
  function fixAttribute(element, attrName) {
    const value = element.getAttribute(attrName);
    if (!value) return;
    
    // Only fix internal absolute paths starting with /
    // Don't fix: //example.com, http://, https://, #, mailto:, etc.
    if (value.startsWith('/') && 
        !value.startsWith('//') && 
        !value.startsWith('/' + basePath + '/') &&
        !value.match(/^\/[a-z0-9]+:/i)) { // Don't match /http:// etc
      
      const newValue = basePath + value;
      element.setAttribute(attrName, newValue);
      
      if (window.ALSANIA_DEBUG) {
        console.log(`Fixed ${attrName}: ${value} -> ${newValue}`, element);
      }
    }
  }
  
  // Fix all elements on page
  function fixAllPaths() {
    // Fix links
    document.querySelectorAll('a[href]').forEach(link => {
      fixAttribute(link, 'href');
    });
    
    // Fix stylesheets
    document.querySelectorAll('link[rel="stylesheet"][href]').forEach(link => {
      fixAttribute(link, 'href');
    });
    
    // Fix scripts
    document.querySelectorAll('script[src]').forEach(script => {
      fixAttribute(script, 'src');
    });
    
    // Fix images
    document.querySelectorAll('img[src]').forEach(img => {
      fixAttribute(img, 'src');
    });
    
    // Fix favicon
    document.querySelectorAll('link[rel="icon"][href], link[rel="shortcut icon"][href]').forEach(link => {
      fixAttribute(link, 'href');
    });
    
    // Fix meta images (og:image, twitter:image)
    document.querySelectorAll('meta[content]').forEach(meta => {
      const content = meta.getAttribute('content');
      if (content && content.startsWith('/') && !content.startsWith('//')) {
        const property = meta.getAttribute('property') || meta.getAttribute('name');
        if (property && (property.includes('image') || property.includes('logo'))) {
          meta.setAttribute('content', basePath + content);
        }
      }
    });
    
    console.log(`Alsania path fix applied. Base: ${basePath || '(root)'}`);
  }
  
  // Function to fix newly added elements
  function fixNewElements(mutations) {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        // Check added nodes
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Fix links in added nodes
            if (node.matches('a[href]')) {
              fixAttribute(node, 'href');
            }
            // Fix images in added nodes
            if (node.matches('img[src]')) {
              fixAttribute(node, 'src');
            }
            // Fix links and images within added nodes
            node.querySelectorAll?.('a[href]').forEach(link => fixAttribute(link, 'href'));
            node.querySelectorAll?.('img[src]').forEach(img => fixAttribute(img, 'src'));
          }
        });
      }
    }
  }
  
  // Set up MutationObserver for dynamically added content
  function setupMutationObserver() {
    if (!basePath) return; // No need if we're at root
    
    const observer = new MutationObserver(fixNewElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    if (window.ALSANIA_DEBUG) {
      console.log('MutationObserver set up for dynamic content');
    }
  }
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      fixAllPaths();
      setupMutationObserver();
    });
  } else {
    fixAllPaths();
    setupMutationObserver();
  }
  
  // Export for debugging
  window.ALSANIA_BASE_PATH = basePath;
  window.ALSANIA_DEBUG = false; // Set to true for debugging
  
})();
