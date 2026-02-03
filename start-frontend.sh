#!/bin/bash

# Change to the frontend directory
cd frontend || exit

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the Next.js development server
echo "Starting frontend server..."
npm run dev