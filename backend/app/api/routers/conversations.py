from fastapi import APIRouter, HTTPException, Depends, status, BackgroundTasks # type: ignore
from typing import List
from app.models.conversation import Conversation
from app.models.user import User
from app.schemas.conversation import ConversationCreate, ConversationUpdate, MessageCreate, ConversationResponse
from app.api.dependencies import get_conversation_repository, get_current_user
from app.repositories.conversation_repository import ConversationRepository
from app.services.ai_service import generate_ai_response
from app.core.celery_worker import process_conversation

router = APIRouter(prefix="/conversations", tags=["conversations"])

@router.post("/", response_model=ConversationResponse)
async def create_conversation(
    conversation_data: ConversationCreate,
    current_user: User = Depends(get_current_user),
    conv_repo: ConversationRepository = Depends(get_conversation_repository)
):
    conversation = await conv_repo.create(current_user.id, conversation_data.dict())
    return conversation

@router.get("/", response_model=List[ConversationResponse])
async def get_conversations(
    current_user: User = Depends(get_current_user),
    conv_repo: ConversationRepository = Depends(get_conversation_repository)
):
    return await conv_repo.get_user_conversations(current_user.id)

@router.get("/{conversation_id}", response_model=ConversationResponse)
async def get_conversation(
    conversation_id: str,
    current_user: User = Depends(get_current_user),
    conv_repo: ConversationRepository = Depends(get_conversation_repository)
):
    conversation = await conv_repo.get_by_id(conversation_id)
    if not conversation or conversation.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return conversation

@router.post("/{conversation_id}/messages")
async def add_message(
    conversation_id: str,
    message: MessageCreate,
    background_tasks: BackgroundTasks,
    current_user: User = Depends(get_current_user),
    conv_repo: ConversationRepository = Depends(get_conversation_repository)
):
    conversation = await conv_repo.get_by_id(conversation_id)
    if not conversation or conversation.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    # Add user message
    await conv_repo.add_message(conversation_id, message)
    
    # Process AI response in background
    background_tasks.add_task(
        process_conversation,
        conversation_id=conversation_id,
        message=message.content
    )
    
    return {"status": "Message received and being processed"}

@router.put("/{conversation_id}", response_model=ConversationResponse)
async def update_conversation(
    conversation_id: str,
    update_data: ConversationUpdate,
    current_user: User = Depends(get_current_user),
    conv_repo: ConversationRepository = Depends(get_conversation_repository)
):
    conversation = await conv_repo.get_by_id(conversation_id)
    if not conversation or conversation.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    updated = await conv_repo.update(conversation_id, update_data.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=400, detail="Failed to update conversation")
    return updated

@router.delete("/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(
    conversation_id: str,
    current_user: User = Depends(get_current_user),
    conv_repo: ConversationRepository = Depends(get_conversation_repository)
):
    conversation = await conv_repo.get_by_id(conversation_id)
    if not conversation or conversation.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    if not await conv_repo.delete(conversation_id):
        raise HTTPException(status_code=500, detail="Failed to delete conversation")
    return None
