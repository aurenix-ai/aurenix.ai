from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MessageCreate(BaseModel):
    content: str
    role: str = "user"

class MessageResponse(BaseModel):
    content: str
    role: str
    timestamp: datetime

class ConversationCreate(BaseModel):
    title: Optional[str] = None
    model: str = "gpt-4"

class ConversationUpdate(BaseModel):
    title: Optional[str] = None
    is_active: Optional[bool] = None

class ConversationResponse(BaseModel):
    id: str
    user_id: str
    title: Optional[str]
    messages: List[MessageResponse]
    model: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]
