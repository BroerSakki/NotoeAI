#!/usr/bin/env bash
set -e

echo "=== NotoeAI setup starting ==="

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
echo "  - See COMMANDS.md for run instructions"
