# Alsania I/O Site

The official website for Alsania - a sovereign technology ecosystem built for creators, innovators, and visionaries who believe technology should empower individuals, not corporations.

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ (for development)
- Any modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/alsania-dev/alsania-io-site.git
cd alsania-io-site

# Install dependencies (if any)
npm install
```

### Development

```bash
# Start local development server
npm run dev

# Or simply open index.html in your browser
```

### Production Build

```bash
# Build for production
npm run build

# The optimized files will be in the dist/ directory
```

## 📁 Project Structure

```
/
├── assets/
│   ├── css/              # CSS styles and themes
│   ├── js/               # JavaScript utilities
│   └── images/           # Project images and icons
├── components/           # Reusable HTML components
├── tools/                # Tool-specific pages
├── about/                # About page
├── contact/              # Contact page
├── donate/               # Donation page
├── downloads/            # Downloads section
├── legal/                # Legal documents
├── services/             # Services information
├── shop/                 # Merchandise and branding
├── index.html            # Main landing page
├── loadComponents.js     # Component loader
├── README.md             # Project documentation
└── Makefile              # Build automation
```

## 🔧 Features

### Core Components

- **Header**: Navigation with theme toggle
- **Footer**: Site information and links
- **Hero Sections**: Customizable hero banners
- **Theme Toggle**: Dark/light mode switching
- **Responsive Grid**: Adaptive layout system

### Implemented Features

- **Component-based Architecture**: Modular HTML components
- **Theme System**: Dark/light mode with CSS variables
- **Responsive Design**: Mobile-first approach
- **Analytics Integration**: Google Analytics support
- **Contact Form**: Functional contact page
- **Waitlist System**: Email notification signup
- **Cross-platform Compatibility**: Works with file:// and web protocols

### Unused but Implemented Features

- **Modal System**: Available in CSS but not actively used
- **Social Media Integration**: Ready for expansion
- **Multi-language Support**: Structure prepared for i18n

## 📖 Documentation

### Component Usage

All components are loaded via `loadComponents.js` which handles both file:// and web protocols.

### Theme System

The site uses CSS variables for theming:

- Dark theme (default)
- Light theme (toggleable)
- Customizable colors and spacing

### Analytics

Google Analytics is integrated with event tracking for:

- Page views
- Component interactions
- Form submissions

## 🛡️ Security & Privacy

- **No Surveillance**: No user tracking beyond Google Analytics
- **Data Protection**: All forms use client-side validation
- **Privacy Compliance**: GDPR-ready structure

## 🤝 Contributing

We welcome contributions from the community! Please follow our [Code of Conduct](legal/code-of-conduct.html) and submit pull requests.

### Development Guidelines

- Use semantic HTML
- Follow BEM CSS methodology
- Write accessible, performant code
- Document all new features

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](legal/license.html) file for details.

## 🎯 Roadmap

- [x] Core website structure
- [x] Component-based architecture
- [x] Theme system implementation
- [x] Contact form functionality
- [ ] E-commerce integration
- [ ] User authentication system
- [ ] API documentation portal

## 📞 Support

For support, please contact:

- Email: admin@alsania-io.com
- GitHub Issues: https://github.com/alsania-dev/alsania-io-site/issues

## 🏗️ Deployment

### GitHub Pages

```bash
npm run deploy:github
```

### Cloudflare Pages

```bash
npm run deploy:cloudflare
```

### Standalone

Simply copy the files to any static web host.

---

© 2026 Alsania I/O. All rights reserved. Built with purpose.
