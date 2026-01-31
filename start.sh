#!/bin/sh
set -e

# Start Backend (IoTNet-Core)
echo "🚀 Starting Backend Service (.NET)..."
# Check if AUTO_MIGRATE is true
if [ "$AUTO_MIGRATE" = "true" ]; then
    echo "🔄 Running migrations..."
    # Add migration command here if needed, e.g., dotnet exec MyApp.dll --migrate
fi

dotnet MyApp.dll &
BACKEND_PID=$!

# Start Frontend (IoTNet-UI)
echo "🚀 Starting Frontend App (Next.js)..."
# The standalone server.js starts on PORT (default 3000)
HOSTNAME=0.0.0.0 PORT=3000 node server.js &
FRONTEND_PID=$!

# Signal handler to kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
