#!/bin/bash
set -e

# Function to cleanup
cleanup() {
    echo "🛑 Shutting down services..."
    kill $BACKEND_PID 2>/dev/null || true
    exit 0
}
trap cleanup INT TERM

# We use /app/.dev_data for the volume mount
DEV_DATA="/app/.dev_data"
echo "🔗 Preparing Dev Cache in $DEV_DATA..."
mkdir -p "$DEV_DATA/node_modules" "$DEV_DATA/next" "$DEV_DATA/bin" "$DEV_DATA/obj" "$DEV_DATA/nuget" "$DEV_DATA/npm_cache"

# Link .NET ephemeral folders (Using relative links for Turbopack)
mkdir -p services/IoTNet-Core
for dir in bin obj; do
    echo "  - Linking IoTNet-Core/$dir..."
    rm -rf "services/IoTNet-Core/$dir"
    ln -sfn "../../.dev_data/$dir" "services/IoTNet-Core/$dir"
done

# Link NuGet packages
mkdir -p /root/.nuget
rm -rf /root/.nuget/packages
ln -sfn "$DEV_DATA/nuget" "/root/.nuget/packages"

# Link .env for IoTNet-Core
ln -sfn /app/.env.dev /app/services/IoTNet-Core/.env

# Start Backend
echo "🚀 Restoring and Starting Backend (.NET)..."
cd services/IoTNet-Core
dotnet restore
ASPNETCORE_HTTP_PORTS=8080 dotnet watch run --no-launch-profile &
BACKEND_PID=$!
cd ../..

# Handle Node/Next links (Force link validation)
echo "🔗 Validating symlinks..."
for dir in node_modules .next; do
    target_name="${dir#.}"
    target_dir="$DEV_DATA/$target_name"
    
    # If it's a directory but not a link, migrate content
    if [ -d "$dir" ] && [ ! -L "$dir" ]; then
        echo "📦 Migrating $dir content to volume..."
        cp -au "$dir/." "$target_dir/"
        rm -rf "$dir"
    fi
    
    # Ensure it is a link pointing to the volume target
    ln -sfn ".dev_data/$target_name" "$dir"
done

# Start Frontend
if [ ! -d "node_modules/@tailwindcss" ]; then
    echo "� Installing dependencies into volume..."
    npm install --no-audit --no-fund
fi

export NODE_PATH=/app/node_modules

echo "🚀 Starting Frontend App (Next.js Dev)..."
# Double check the .next/dev target exists before starting
mkdir -p "$DEV_DATA/next/dev"
PORT=3000 exec npx next dev --turbopack
