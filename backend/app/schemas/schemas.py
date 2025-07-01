"""
Pydantic schemas for request/response validation.
"""
from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid


class UserBase(BaseModel):
    """Base user schema."""
    email: EmailStr


class UserCreate(UserBase):
    """Schema for user creation."""
    password: str


class UserLogin(BaseModel):
    """Schema for user login."""
    email: EmailStr
    password: str


class UserResponse(UserBase):
    """Schema for user response."""
    id: uuid.UUID
    is_active: bool
    is_verified: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class Token(BaseModel):
    """Token response schema."""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenRefresh(BaseModel):
    """Token refresh request schema."""
    refresh_token: str


class AccessToken(BaseModel):
    """Access token response schema."""
    access_token: str
    token_type: str = "bearer"


class MessageResponse(BaseModel):
    """Generic message response."""
    message: str
