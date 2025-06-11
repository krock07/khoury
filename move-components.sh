#!/bin/bash

set -e

# Define source and destination
SRC="app/components"
DEST="components"

# Step 1: Move all component files
echo "🔁 Moving files from $SRC to $DEST..."
mkdir -p "$DEST"
mv "$SRC"/* "$DEST"/

# Step 2: Remove empty source directory
echo "🧹 Cleaning up $SRC..."
rmdir "$SRC"

# Step 3: Replace all import paths in .js/.jsx/.ts/.tsx files
echo "🔍 Updating import paths in project..."
find . -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|from "./components/|from "../components/|g' {} +
find . -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|from "../app/components/|from "../components/|g' {} +
find . -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|from "@/app/components/|from "@/components/|g' {} +

echo "✅ Done! All components moved and imports updated."
