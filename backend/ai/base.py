# --- Imports ---
from abc import ABC, abstractmethod



# --- AI PLatform ---
class AIPlatform(ABC):
    @abstractmethod
    def chat(self, prompt: str) -> str:
        pass