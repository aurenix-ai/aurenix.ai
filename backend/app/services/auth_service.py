"""
Authentication service layer for user management and token operations.
"""
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import and_
from fastapi import HTTPException, status
from typing import Optional
import uuid

from app.models.models import User, RefreshToken
from app.schemas.schemas import UserCreate, UserLogin
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, hash_token


class AuthService:
    """Authentication service class."""
    
    @staticmethod
    def create_user(db: Session, user_data: UserCreate) -> User:
        """Create a new user."""
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user
        hashed_password = hash_password(user_data.password)
        db_user = User(
            email=user_data.email,
            hashed_password=hashed_password
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def authenticate_user(db: Session, login_data: UserLogin) -> User:
        """Authenticate user credentials."""
        user = db.query(User).filter(User.email == login_data.email).first()
        
        if not user or not verify_password(login_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )
        
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Account is inactive"
            )
        
        return user
    
    @staticmethod
    def create_tokens(db: Session, user: User) -> tuple[str, str]:
        """Create access and refresh tokens for a user."""
        # Create access token
        access_token = create_access_token(data={"sub": str(user.id), "email": user.email})
        
        # Create refresh token
        refresh_token = create_refresh_token(data={"sub": str(user.id)})
        
        # Store refresh token in database
        refresh_token_hash = hash_token(refresh_token)
        expires_at = datetime.utcnow() + timedelta(days=7)
        
        db_refresh_token = RefreshToken(
            user_id=user.id,
            token_hash=refresh_token_hash,
            expires_at=expires_at
        )
        
        db.add(db_refresh_token)
        db.commit()
        
        return access_token, refresh_token
    
    @staticmethod
    def refresh_access_token(db: Session, refresh_token: str) -> str:
        """Create new access token using refresh token."""
        from app.core.security import decode_token
        
        # Decode refresh token
        payload = decode_token(refresh_token)
        if not payload or payload.get("type") != "refresh":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid refresh token"
            )
        
        # Check if refresh token exists and is valid
        refresh_token_hash = hash_token(refresh_token)
        db_refresh_token = db.query(RefreshToken).filter(
            and_(
                RefreshToken.token_hash == refresh_token_hash,
                RefreshToken.user_id == uuid.UUID(user_id),
                RefreshToken.is_revoked == False,
                RefreshToken.expires_at > datetime.utcnow()
            )
        ).first()
        
        if not db_refresh_token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token"
            )
        
        # Get user
        user = db.query(User).filter(User.id == uuid.UUID(user_id)).first()
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found or inactive"
            )
        
        # Create new access token
        access_token = create_access_token(data={"sub": str(user.id), "email": user.email})
        return access_token
    
    @staticmethod
    def revoke_refresh_token(db: Session, refresh_token: str) -> None:
        """Revoke a refresh token."""
        refresh_token_hash = hash_token(refresh_token)
        db_refresh_token = db.query(RefreshToken).filter(
            RefreshToken.token_hash == refresh_token_hash
        ).first()
        
        if db_refresh_token:
            db_refresh_token.is_revoked = True
            db.commit()
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: uuid.UUID) -> Optional[User]:
        """Get user by ID."""
        return db.query(User).filter(User.id == user_id).first()
