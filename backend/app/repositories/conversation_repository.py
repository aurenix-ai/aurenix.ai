from typing import List, Optional
from bson import ObjectId
from datetime import datetime
from ..core.database import Database
from ..models.conversation import Conversation, Message

class ConversationRepository:
    def __init__(self, database: Database):
        self.db = database
        self.collection = database.db.conversations

    async def create(self, user_id: str, conversation_data: dict) -> Conversation:
        conversation_data["user_id"] = user_id
        conversation_data["created_at"] = datetime.utcnow()
        conversation_data["messages"] = []
        result = await self.collection.insert_one(conversation_data)
        conversation_data["id"] = str(result.inserted_id)
        return Conversation(**conversation_data)

    async def get_by_id(self, conversation_id: str) -> Optional[Conversation]:
        try:
            conversation = await self.collection.find_one({"_id": ObjectId(conversation_id)})
            if conversation:
                conversation["id"] = str(conversation["_id"])
                return Conversation(**conversation)
        except:
            return None
        return None

    async def get_user_conversations(self, user_id: str) -> List[Conversation]:
        cursor = self.collection.find({"user_id": user_id})
        conversations = []
        async for conv in cursor:
            conv["id"] = str(conv["_id"])
            conversations.append(Conversation(**conv))
        return conversations

    async def add_message(self, conversation_id: str, message: Message) -> bool:
        try:
            result = await self.collection.update_one(
                {"_id": ObjectId(conversation_id)},
                {
                    "$push": {"messages": message.dict()},
                    "$set": {"updated_at": datetime.utcnow()}
                }
            )
            return result.modified_count > 0
        except:
            return False

    async def update(self, conversation_id: str, update_data: dict) -> Optional[Conversation]:
        update_data["updated_at"] = datetime.utcnow()
        try:
            result = await self.collection.update_one(
                {"_id": ObjectId(conversation_id)},
                {"$set": update_data}
            )
            if result.modified_count > 0:
                return await self.get_by_id(conversation_id)
        except:
            return None
        return None
