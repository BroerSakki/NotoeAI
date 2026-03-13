# --- Imports ---
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai.ollama import Ollama


# --- Pydantic Models ---
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    prompt: str
    model: str = "llama2"
    context_summary: str | None = None

class ChatResponse(BaseModel):
    response: str
    context_summary: str | None = None



# --- App Initialization ---
app = FastAPI()

# --- CORS Configuration ---
origins = [
    "http://localhost:3000",  # Frontend default port
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



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
    # Create a new Ollama instance with the requested model
    ai_instance = Ollama(system_prompt=system_prompt, model=request.model)
    response_text = ai_instance.chat(request.prompt, request.context_summary)
    return ChatResponse(response=response_text)

# Generate Context Summary
@app.post("/generate-summary")
async def generate_summary(messages: list[Message]):
    """Generate a context summary from conversation history"""
    # Create a new Ollama instance
    ai_instance = Ollama(system_prompt=system_prompt)
    
    # Convert Message objects to dictionaries
    message_dicts = [{"role": msg.role, "content": msg.content} for msg in messages]
    
    summary = ai_instance.generate_context_summary(message_dicts)
    return {"summary": summary}
