#!/bin/bash

# Kill any existing node processes
# echo "Killing existing node processes..."
# pkill -f node || true

# Wait for ports to be released
sleep 1

# Start the shell-ai server in the background
echo "Starting shell-ai server..."
cd servers/shell-ai && npx tsx src/index.ts &
SHELL_AI_PID=$!

# Wait for shell-ai to start
echo "Waiting for shell-ai server to start..."
sleep 3

# Start the main application
echo "Starting main application..."
npm run dev

# Kill the shell-ai server when the main app is stopped
echo "Shutting down shell-ai server..."
kill $SHELL_AI_PID