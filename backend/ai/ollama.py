# --- Imports ---
from ai.base import AIPlatform
import ollama


# --- AI Providers ---
class Ollama(AIPlatform):
    def __init__(self, system_prompt: str = None, model: str = "llama2"):
        self.system_prompt = system_prompt
        self.model = model
    
    def chat(self, prompt: str, context_summary: str | None = None) -> str:
        messages = []
        if self.system_prompt:
            messages.append({"role": "system", "content": self.system_prompt})
        
        # Add context summary if provided
        if context_summary:
            context_message = {
                "role": "system",
                "content": f"Previous conversation context: {context_summary}"
            }
            messages.append(context_message)
        
        messages.append({"role": "user", "content": prompt})
        
        response = ollama.chat(model=self.model, messages=messages)
        return response['message']['content']
    
    def generate_context_summary(self, messages: list) -> str:
        """Generate a concise summary of conversation history"""
        if not messages:
            return ""
        
        # Create context for summarization
        summary_prompt = "Please create a concise 2-3 sentence summary of the following conversation history. Focus on key topics, user questions, and important details. Keep the summary brief and relevant:\n\n"
        
        for msg in messages:
            role = "User" if msg['role'] == "user" else "Assistant"
            summary_prompt += f"{role}: {msg['content']}\n"
        
        summary_prompt += "\nPlease provide only the summary:"
        
        # Generate summary
        messages = []
        if self.system_prompt:
            messages.append({"role": "system", "content": self.system_prompt})
        messages.append({"role": "user", "content": summary_prompt})
        
        try:
            response = ollama.chat(model=self.model, messages=messages)
            summary = response['message']['content'].strip()
            # Ensure summary is concise (under 3 sentences if possible)
            if len(summary.split('.')) > 4:
                summary = '. '.join(summary.split('.')[:3]) + '.'
            return summary
        except Exception as e:
            print(f"Error generating summary: {e}")
            return ""
    
    def list_models(self) -> list:
        """List all available local Ollama models"""
        try:
            models = ollama.list()
            return [model.model for model in models.models]
        except Exception as e:
            print(f"Error listing models: {e}")
            return []
