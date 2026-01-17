# Alsania I/O Site Makefile
# Version: 1.0.0
# Description: Build automation for the Alsania website

# Configuration
PROJECT_NAME = alsania-io-site
VERSION = 1.0.0
DIST_DIR = dist
BUILD_DIR = build
DOCS_DIR = docs

# Default target
all: build

# Development server
dev:
	npx serve . -p 3000

# Build production files
build:
	npm run build

# Clean build artifacts
clean:
	rm -rf $(DIST_DIR) $(BUILD_DIR)

# Lint code
lint:
	npx eslint . --fix

# Run tests
test:
	npx jest

# Generate documentation
docs:
	npx jsdoc -c jsdoc.config.json -d $(DOCS_DIR)

# Serve documentation
docs:serve:
	npx serve $(DOCS_DIR) -p 4000

# Deploy to production
deploy:
	npm run deploy

# Deploy to GitHub Pages
deploy:github:
	npx gh-pages -d $(DIST_DIR)

# Deploy to Cloudflare Pages
deploy:cloudflare:
	npx wrangler pages deploy $(DIST_DIR)

# Create distribution package
package:
	npm run package

# Install dependencies
install:
	npm install

# Update dependencies
update:
	npm update

# Audit dependencies
audit:
	npx npm audit

# Format code
format:
	npx prettier --write .

# Check for vulnerabilities
security:
	npx npm audit --production

# Run all checks
check:
	npm run lint
	npm run test
	npm run security

# Help
help:
	@echo "Available commands:"
	@echo "  make dev              - Start development server"
	@echo "  make build            - Build production files"
	@echo "  make clean            - Remove build artifacts"
	@echo "  make lint             - Run code linting"
	@echo "  make test             - Run tests"
	@echo "  make docs             - Generate documentation"
	@echo "  make deploy           - Deploy to production"
	@echo "  make package          - Create distribution package"
	@echo "  make install          - Install dependencies"
	@echo "  make update           - Update dependencies"
	@echo "  make security         - Check for vulnerabilities"
	@echo "  make check            - Run all checks"
	@echo "  make help             - Show this help message"

.PHONY: all dev build clean lint test docs deploy package install update security check help