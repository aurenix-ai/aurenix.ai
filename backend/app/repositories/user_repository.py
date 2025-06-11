from typing import List, Optional
from bson import ObjectId
from ..core.database import Database
from ..models.user import User
from ..core.security import get_password_hash, verify_password

class UserRepository:
    def __init__(self, database: Database):
        self.db = database
        self.collection = database.db.users

    async def create(self, user_data: dict) -> User:
        user_data["password"] = get_password_hash(user_data["password"])
        result = await self.collection.insert_one(user_data)
        user_data["id"] = str(result.inserted_id)
        return User(**user_data)

    async def get_by_email(self, email: str) -> Optional[User]:
        user = await self.collection.find_one({"email": email})
        if user:
            user["id"] = str(user["_id"])
            return User(**user)
        return None

    async def get_by_id(self, user_id: str) -> Optional[User]:
        try:
            user = await self.collection.find_one({"_id": ObjectId(user_id)})
            if user:
                user["id"] = str(user["_id"])
                return User(**user)
        except:
            return None
        return None

    async def authenticate(self, email: str, password: str) -> Optional[User]:
        user = await self.get_by_email(email)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user
