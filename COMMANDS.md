# COMMANDS.md

## Dependencies

### System Requirements

The following must already be installed by the user:

- Python 3.11 or newer
- Node.js 20 or newer
- npm (included with Node.js)
- Ollama (for local AI inference)

No commands in this project install system-level packages.

### Ollama Setup

**Install Ollama:**
- **Linux:** `curl -fsSL https://ollama.com/install.sh | sh`
- **macOS:** Download from [ollama.com](https://ollama.com/download) or use Homebrew: `brew install ollama`
- **Windows:** Download from [ollama.com](https://ollama.com/download)

**Pull a model (required):**
```bash
ollama pull llama2
# or try other models like: codellama, mistral, gemma, etc.
```

**Verify Ollama is running:**
```bash
ollama list
ollama serve  # Start Ollama server if needed
```

**Change models in backend:**
Edit `backend/main.py` and change the model parameter in the Ollama initialization:
```python
ai_platform = Ollama(api_key="", system_prompt=system_prompt, model="your-model-name")
```

### Auto-install (From project root)
```bash
./install.sh
```

### Verify system dependencies
```bash
python3 --version
node -v
npm -v
ollama --version  # Should show version if installed
```

---

## Backend (FastAPI)

### Navigate to backend directory

```bash
cd backend
```

### Activate virtual environment (Inside backend)
```bash
source .venv/bin/activate
```

### Install dependencies (includes ollama package)
```bash
pip install -r requirements.txt
```

### Run backend server (From project root)

```bash
./start-backend.sh
```

**or from backend directory:**

```bash
uvicorn main:app --reload
```

**Note:** Make sure Ollama is running before starting the backend server.

---

## Frontend (NextJS)

### Navigate to frontend directory

```bash
cd frontend