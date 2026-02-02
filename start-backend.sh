#!/usr/bin/env bash
set -e

echo "=== Starting NotoeAI Backend Server ==="

# Check if we're in the correct directory
if [ ! -d "backend" ]; then
    echo "Error: This script must be run from the project root directory"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "backend/.venv" ]; then
    echo "Error: Virtual environment not found. Please run ./install.sh first"
    exit 1
fi

# Activate virtual environment
echo "Activating virtual environment..."
cd backend
source .venv/bin/activate

# Check if dependencies are installed
echo "Checking dependencies..."
if ! pip list | grep -q "fastapi"; then
    echo "Error: Dependencies not installed. Please run ./install.sh first"
    deactivate
    cd ..
    exit 1
fi

# Check if Ollama is available (optional but recommended)
if ! command -v ollama &> /dev/null; then
    echo "Warning: Ollama is not installed or not in PATH"
    echo "The backend will start but AI functionality will not work"
fi

# Start the backend server
echo "Starting FastAPI server on http://localhost:8000..."
echo "Press Ctrl+C to stop the server"
echo ""
uvicorn main:app --reload

# Deactivate virtual environment (will only run if server is stopped)
deactivate
cd ..