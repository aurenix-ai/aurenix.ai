from fastapi import APIRouter, HTTPException, Depends, status # type: ignore
from fastapi.security import OAuth2PasswordRequestForm # type: ignore
from typing import List
from datetime import timedelta

from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin, Token
from app.core.security import create_access_token
from app.core.config import settings
from app.api.dependencies import get_user_repository, get_current_user
from app.repositories.user_repository import UserRepository

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/register", response_model=User)
async def create_user(
    user_data: UserCreate,
    user_repo: UserRepository = Depends(get_user_repository)
):
    if await user_repo.get_by_email(user_data.email):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    user = await user_repo.create(user_data.dict())
    return user

@router.post("/token", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    user_repo: UserRepository = Depends(get_user_repository)
):
    user = await user_repo.authenticate(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=User)
async def read_users_me(
    current_user: User = Depends(get_current_user)
):
    return current_user

@router.get("/{user_id}", response_model=User)
async def get_user(
    user_id: str,
    user_repo: UserRepository = Depends(get_user_repository),
    current_user: User = Depends(get_current_user)
):
    user = await user_repo.get_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
