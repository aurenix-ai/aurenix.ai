from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from motor.core import AgnosticDatabase

class Database:
    client: AsyncIOMotorClient = None
    db: AgnosticDatabase = None

    async def connect_to_database(self):
        self.client = AsyncIOMotorClient(settings.MONGODB_URL)
        self.db = self.client[settings.MONGODB_DB_NAME]
        print("Connected to MongoDB.")

    async def close_database_connection(self):
        if self.client is not None:
            self.client.close()
            print("MongoDB connection closed.")
