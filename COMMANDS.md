# COMMANDS.md

## Dependencies

### System Requirements

The following must already be installed by the user:

- Python 3.11 or newer
- Node.js 20 or newer
- npm (included with Node.js)

No commands in this project install system-level packages.

### Auto-install (From project root)
```bash
./install.sh
```

### Verify system dependencies
```bash
python3 --version
node -v
npm -v
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

### Run backend server

```bash
uvicorn main:app --reload
```

---

## Frontend (NextJS)

### Navigate to frontend directory

```bash
cd frontend
```