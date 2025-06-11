from typing import List
import openai
from ..core.config import settings
from ..models.conversation import Message

openai.api_key = settings.OPENAI_API_KEY

async def generate_ai_response(messages: List[Message], model: str = "gpt-4") -> str:
    """Generate AI response using OpenAI API."""
    try:
        formatted_messages = [
            {"role": msg.role, "content": msg.content}
            for msg in messages
        ]
        
        response = await openai.ChatCompletion.acreate(
            model=model,
            messages=formatted_messages,
            temperature=0.7,
            max_tokens=2000,
        )
        
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error generating AI response: {str(e)}")
        raise
