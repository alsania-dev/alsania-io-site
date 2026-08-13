# Alsania I/O — Sovereign Technology Ecosystem

[![Website](https://img.shields.io/badge/Website-alsania--io.com-00ff7f?style=flat-square&logo=google-chrome)](https://alsania-io.com)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live-181717?style=flat-square&logo=github)](https://alsania-dev.github.io/alsania-io-site/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-Deployed-F38020?style=flat-square&logo=cloudflare)](https://alsania-io.com)
[![License](https://img.shields.io/badge/License-MIT-00ff7f?style=flat-square)](LICENSE)

**Alsania I/O** is the official website and digital presence for the Alsania ecosystem — a sovereign technology collective building tools for creators, innovators, and visionaries who believe technology should empower individuals, not corporations.

---

## 🌐 Live Sites

| Environment | URL | Purpose |
|-------------|-----|---------|
| **Production** | [https://alsania-io.com](https://alsania-io.com) | Main website (Cloudflare Pages) |
| **GitHub Pages** | [https://alsania-dev.github.io/alsania-io-site/](https://alsania-dev.github.io/alsania-io-site/) | Fallback / GitHub Pages |
| **Staging** | [alsania-io-site.pages.dev](https://alsania-io-site.pages.dev) | Cloudflare Pages staging |

---

## 📦 Project Structure

```
alsania-io-site/
├── index.html              # 🏠 Homepage
├── about/                  # 📖 About Alsania
├── blog/                   # ✍️ Blog posts (5+ for SEO)
├── services/               # 💼 Services & pricing
├── tools/                  # 🛠️ Tool pages
│   ├── nyx/               # Nyx browser extension
│   ├── devconx/           # DevConX VSCode extension
│   ├── scrypgen/          # ScrypGen script generator
│   └── nyx-unified/       # Nyx Unified (premium)
├── legal/                  # ⚖️ Legal pages
│   ├── privacy-policy.html
│   ├── cookie-policy.html
│   ├── terms.html
│   ├── disclaimer.html
│   └── refund-policy.html
├── components/             # 🧩 Reusable components
│   ├── header.html
│   ├── footer.html
│   └── nav.html
├── assets/                 # 🎨 Static assets
│   ├── css/
│   ├── js/
│   └── img/
├── hilo/                   # 🎲 Hi-Lo game
├── rep/                    # 🤖 Agent Registry
├── rating/                 # ⭐ Agent Rating
├── claim/                  # 💧 Faucet
├── shop/                   # 🛒 Merchandise
├── story/                  # 📚 Book of Alsania
├── dist/                   # 📦 Build output (auto-generated)
├── sync-and-deploy.sh      # 🚀 Deployment script
├── _headers                # 🔧 Cloudflare headers config
├── _redirects              # 🔄 Cloudflare redirects config
└── README.md               # 📄 This file
```

---

## 🚀 Deployment

### Quick Deploy

The site deploys via a single script that syncs changes to `dist/` and pushes to GitHub:

```bash
./sync-and-deploy.sh
```

This script:
1. Syncs all root files to `dist/`
2. Commits and pushes changes to GitHub
3. Triggers Cloudflare Pages and GitHub Pages deployments

### Manual Deployment

```bash
# Sync to dist/
rsync -av --delete --exclude='.git' --exclude='node_modules' --exclude='dist' . dist/

# Commit and push
git add .
git commit -m "Update site"
git push origin main
```

### Cloudflare Pages

The site is configured for automatic deployment via Cloudflare Pages:
- **Build command:** None (static site)
- **Output directory:** `dist/`
- **Environment:** Production branch → `main`

---

## 🛠️ Development

### Prerequisites

- Any modern web browser
- Code editor (VS Code recommended)
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/alsania-dev/alsania-io-site.git
cd alsania-io-site

# Open in browser (file:// protocol works)
open index.html

# Or use a local server
python3 -m http.server 8000
# Visit http://localhost:8000
```

### Important Rules

- ✅ **EDIT** files in the **root directory**
- ❌ **DO NOT edit** files in `dist/` (they get overwritten)
- ✅ **COMMIT** from the root directory
- ❌ **DO NOT commit** from `dist/`

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `_headers` | Cloudflare Pages custom headers (security, CORS) |
| `_redirects` | Cloudflare Pages redirect rules |
| `.nojekyll` | Disable Jekyll processing for GitHub Pages |
| `assets/css/styles.css` | Global styles and theme variables |
| `loadComponents.js` | Component loader and cookie consent banner |

---

## 📝 Content Guidelines

### Adding a Blog Post

1. Create a new HTML file in `/blog/`
2. Include proper metadata (title, description, date)
3. Update `/blog/index.html` to link to it
4. Run `./sync-and-deploy.sh`

### Adding a New Page

1. Create a new directory or HTML file in the root
2. Include the header/footer via `loadComponents.js`
3. Ensure all links use absolute paths (starting with `/`)
4. Add to navigation in `/components/header.html`
5. Run `./sync-and-deploy.sh`

### SEO Best Practices

- Every page must have a unique `<title>` and `<meta name="description">`
- Use semantic HTML structure
- Include Open Graph meta tags for social sharing
- Maintain proper heading hierarchy (h1 → h2 → h3)

---

## 🤝 Contributing

We welcome contributions to the Alsania website! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes** in the root directory
4. **Test locally** before deploying
5. **Commit with a clear message**
6. **Submit a pull request**

### Code Style

- HTML: Semantic, accessible, well-commented
- CSS: Use CSS variables from `styles.css`
- JavaScript: Clean, modern ES6+

---

## 🔗 Related Repositories

| Project | Repository | Description |
|---------|------------|-------------|
| **Nyx** | [alsania-dev/Nyx](https://github.com/alsania-dev/Nyx) | Browser extension for MCP tools |
| **AED** | [alsania-io/aed](https://github.com/alsania-io/aed) | Alsania Enhanced Domains |
| **AlsaniaMCP** | [alsania-dev/mcp](https://github.com/alsania-dev/mcp) | Universal MCP server |
| **DevConX** | [alsania-dev/devconx](https://github.com/alsania-dev/devconx) | VSCode AI assistant |
| **ScrypGen** | [alsania-dev/scrypgen](https://github.com/alsania-dev/scrypgen) | Script generator |

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

---

## 📞 Contact

- **Website:** [alsania-io.com](https://alsania-io.com)
- **Email:** admin@alsania-io.com
- **GitHub:** [@alsania-dev](https://github.com/alsania-dev)
- **Discord:** [Alsania Community](https://discord.gg/SaCTgSHqdv)
- **Telegram:** [@Alsania_io](https://t.me/Alsania_io)
- **X (Twitter):** [@sigmasauer07](https://x.com/sigmasauer07)

---

## 🙏 Acknowledgments

Built with purpose by **Sigma** and the **Alsania Community**.

**Aligned with the Alsania Protocol v1.0**

---

```
🛡️ Sovereignty First. Always.
```
