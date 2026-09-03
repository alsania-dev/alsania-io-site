#!/bin/bash

# DreamAI Girls Mint Page - Cloudflare Deployment Script

set -e

echo "🚀 Deploying DreamAI Girls Mint Page to Cloudflare..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler not found. Installing..."
    npm install -g wrangler
fi

# Deploy to Cloudflare Pages
cd /home/sigma/Desktop/echo-lab/alsania-io-site/dreamai-mint

wrangler pages deploy . --project-name dreamai-mint

echo "✅ Deployment complete!"
echo "📱 Your site should be live at: https://alsania-io.com/dreamai-mint"
echo ""
echo "If the custom domain isn't set up yet, you can access it at:"
echo "https://dreamai-mint.pages.dev"
