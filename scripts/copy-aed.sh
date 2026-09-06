#!/bin/bash
echo "Copying aed/ to dist/..."
if [ -d "aed" ]; then
  mkdir -p dist
  cp -r aed dist/
  echo "✅ aed/ copied to dist/"
else
  echo "⚠️ aed/ folder not found"
fi
