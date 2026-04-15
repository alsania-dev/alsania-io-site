# Makefile Documentation

This document explains how to use the Makefile for the Alsania I/O Site project.

## 📋 Available Commands

### Development

- `make dev`: Start development server
- `make build`: Build production-ready files
- `make clean`: Remove build artifacts
- `make lint`: Run code linting
- `make test`: Run tests

### Deployment

- `make deploy`: Deploy to production
- `make deploy:github`: Deploy to GitHub Pages
- `make deploy:cloudflare`: Deploy to Cloudflare Pages
- `make package`: Create distribution package

### Documentation

- `make docs`: Generate documentation
- `make docs:serve`: Serve documentation locally

## 🚀 Usage Examples

### Start development server

```bash
make dev
```

### Build for production

```bash
make build
```

### Deploy to GitHub Pages

```bash
make deploy:github
```

### Run all tests

```bash
make test
```

## 🔧 Requirements

- Node.js v18+
- npm or yarn
- Git

## 📦 Package Structure

The `make package` command creates a production-ready package with:

- Minified CSS and JavaScript
- Optimized images
- All HTML files
- Documentation

## 🎯 Environment Variables

Create a `.env` file for environment-specific configuration:

```
NODE_ENV=production
API_BASE_URL=https://api.alsania.io
GA_TRACKING_ID=G-XXXXXXXXXX
```

## 📝 Notes

- Always run `make clean` before building
- Use `make lint` before committing code
- Documentation is automatically generated from code comments

---

© 2026 Alsania I/O. All rights reserved.
