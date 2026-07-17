// Path fix for GitHub Pages and Cloudflare Pages
// v1.0.1 - Added version comment to trigger deployment
(function() {
  'use strict';
  
  // Auto-detect if we're on a subpath (GitHub Pages) or root domain
  var isSubpath = window.location.pathname.startsWith('/alsania-io-site/');
  
  // If we're on a subpath, add base path to all links
  if (isSubpath) {
    var basePath = '/alsania-io-site';
    document.querySelectorAll('a, link, script, img').forEach(function(el) {
      var attr = el.getAttribute('href') || el.getAttribute('src');
      if (attr && attr.startsWith('/') && !attr.startsWith('//')) {
        var newPath = basePath + attr;
        if (el.tagName === 'A') el.setAttribute('href', newPath);
        else if (el.tagName === 'LINK' || el.tagName === 'SCRIPT') el.setAttribute('href' in el ? 'href' : 'src', newPath);
        else if (el.tagName === 'IMG') el.setAttribute('src', newPath);
      }
    });
  }
  
  console.log('[fix-paths] Loaded successfully v1.0.1');
})();
