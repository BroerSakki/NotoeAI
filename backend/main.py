# --- Imports ---
import os
from fastapi import FastAPI
from pydantic import BaseModel
from ai.ollama import Ollama


# --- Pydantic Models ---
class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    response: str



# --- App Initialization ---
app = FastAPI()



# --- AI Configuration ---
def load_system_prompt():
    try:
        with open("prompts/system_prompt.md", "r") as f:
            return f.read()
    except FileNotFoundError:
        return None

system_prompt = load_system_prompt()
ai_platform = Ollama(system_prompt=system_prompt)



# --- Routes ---
# Root
@app.get("/")
async def root():
    return {"message": "API is running"}

# Models
@app.get("/models")
async def get_models():
    models = ai_platform.list_models()
    return {"models": models}

# Chat
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    response_text = ai_platform.chat(request.prompt)
    return ChatResponse(response=response_text)