from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from typing import Optional
from app.core.database import Database
from app.core.security import verify_token
from app.repositories.user_repository import UserRepository
from app.repositories.conversation_repository import ConversationRepository

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
db = Database()

async def get_db() -> Database:
    return db

async def get_user_repository(db: Database = Depends(get_db)) -> UserRepository:
    return UserRepository(db)

async def get_conversation_repository(db: Database = Depends(get_db)) -> ConversationRepository:
    return ConversationRepository(db)

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    user_repo: UserRepository = Depends(get_user_repository)
) -> Optional[dict]:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = verify_token(token)
    if payload is None:
        raise credentials_exception
    
    email: str = payload.get("sub")
    if email is None:
        raise credentials_exception
    
    user = await user_repo.get_by_email(email)
    if user is None:
        raise credentials_exception
    
    return user
