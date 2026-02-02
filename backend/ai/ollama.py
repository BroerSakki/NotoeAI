# --- Imports ---
from ai.base import AIPlatform
import ollama


# --- AI Providers ---
class Ollama(AIPlatform):
    def __init__(self, system_prompt: str = None, model: str = "llama2"):
        self.system_prompt = system_prompt
        self.model = model
    
    def chat(self, prompt: str) -> str:
        messages = []
        if self.system_prompt:
            messages.append({"role": "system", "content": self.system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        response = ollama.chat(model=self.model, messages=messages)
        return response['message']['content']
    
    def list_models(self) -> list:
        """List all available local Ollama models"""
        try:
            models = ollama.list()
            return [model.model for model in models.models]
        except Exception as e:
            print(f"Error listing models: {e}")
            return []
