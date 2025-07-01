"""
Authentication API routes.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.schemas import UserCreate, UserLogin, UserResponse, Token, TokenRefresh, AccessToken, MessageResponse
from app.services.auth_service import AuthService

router = APIRouter()


@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new user account.
    """
    try:
        user = AuthService.create_user(db, user_data)
        return user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user account"
        )


@router.post("/login", response_model=Token)
async def login(
    login_data: UserLogin,
    db: Session = Depends(get_db)
):
    """
    Authenticate user and return access and refresh tokens.
    """
    try:
        # Authenticate user
        user = AuthService.authenticate_user(db, login_data)
        
        # Create tokens
        access_token, refresh_token = AuthService.create_tokens(db, user)
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Login failed"
        )


@router.post("/refresh", response_model=AccessToken)
async def refresh_token(
    token_data: TokenRefresh,
    db: Session = Depends(get_db)
):
    """
    Refresh access token using refresh token.
    """
    try:
        access_token = AuthService.refresh_access_token(db, token_data.refresh_token)
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Token refresh failed"
        )


@router.post("/logout", response_model=MessageResponse)
async def logout(
    token_data: TokenRefresh,
    db: Session = Depends(get_db)
):
    """
    Logout user by revoking refresh token.
    """
    try:
        AuthService.revoke_refresh_token(db, token_data.refresh_token)
        return {"message": "Successfully logged out"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Logout failed"
        )
