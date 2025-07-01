"""
User API routes.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.schemas import UserResponse
from app.core.dependencies import get_current_active_user
from app.models.models import User

router = APIRouter()


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Get current user information.
    """
    return current_user
