from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from .base import TimestampMixin, IDModel

class User(IDModel, TimestampMixin):
    email: EmailStr
    username: str = Field(min_length=3, max_length=50)
    full_name: Optional[str] = None
    is_active: bool = True
    is_superuser: bool = False
