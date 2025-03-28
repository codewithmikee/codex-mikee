#!/bin/bash

# Install dependencies for shell-ui
echo "Installing dependencies for shell-ui..."
cd apps/shell-ui
npm install --quiet

# Install dependencies for shell-ai
echo "Installing dependencies for shell-ai..."
cd ../../servers/shell-ai
npm install --quiet

# Start shell-ui (Next.js frontend)
echo "Starting shell-ui (Next.js frontend)..."
cd ../../apps/shell-ui && npx next dev -p 5000 &
SHELL_UI_PID=$!

# Start shell-ai (Express.js backend)
echo "Starting shell-ai (Express.js backend)..."
cd ../../servers/shell-ai && npx tsx watch src/index.ts &
SHELL_AI_PID=$!

# Define cleanup function to kill both processes on exit
cleanup() {
  echo "Stopping applications..."
  kill $SHELL_UI_PID
  kill $SHELL_AI_PID
  exit 0
}

# Register cleanup function to run on exit signal
trap cleanup SIGINT SIGTERM

# Show running applications
echo "Both applications are running:"
echo "- Shell UI (Frontend): Running on port 5000"
echo "- Shell API (Backend): Check logs for port information"

# Wait for both processes to finish
wait $SHELL_UI_PID $SHELL_AI_PID