#!/usr/bin/env bash
set -e

echo "=== NotoeAI setup starting ==="

# Check system dependencies
echo "Checking system dependencies..."

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3.11+ is required but not installed"
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js 20+ is required but not installed"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "Error: npm is required but not installed"
    exit 1
fi

# Check Ollama
if ! command -v ollama &> /dev/null; then
    echo "Warning: Ollama is not installed"
    echo "Please install Ollama from https://ollama.com"
    echo "After installation, run: ollama pull llama2"
    read -p "Continue setup without Ollama? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "Ollama is installed"
    if [ -z "$(ollama list | grep -i llama2)" ]; then
        echo "Warning: llama2 model is not pulled"
        echo "Run: ollama pull llama2"
    fi
fi

# Backend setup
echo "Setting up backend (FastAPI)..."
cd backend

python3 -m venv .venv
source .venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

deactivate
cd ..

# Frontend setup
echo "Setting up frontend (Next.js)..."
cd frontend

npm install

cd ..

echo "=== NotoeAI setup complete ==="
echo "Next steps:"
echo "  - Configure backend/.env"
echo "  - Configure frontend/.env"
echo "  - Make sure Ollama is running"
echo "  - See COMMANDS.md for run instructions"
