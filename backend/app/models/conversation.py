from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field
from .base import TimestampMixin, IDModel

class Message(BaseModel):
    role: str = Field(...)  # 'user' or 'assistant'
    content: str = Field(...)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Conversation(IDModel, TimestampMixin):
    user_id: str
    title: Optional[str] = None
    messages: List[Message] = Field(default_factory=list)
    model: str = "gpt-4"  # Default model
    is_active: bool = True
