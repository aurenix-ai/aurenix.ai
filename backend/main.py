from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings
from app.core.database import Database
from app.api.routers import users_router, conversations_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Your AI Sidekick - Personalized AI Assistant Platform",
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database initialization
@app.on_event("startup")
async def startup_db_client():
    db = Database()
    await db.connect_to_database()

@app.on_event("shutdown")
async def shutdown_db_client():
    db = Database()
    await db.close_database_connection()

# Include routers
app.include_router(users_router, prefix=settings.API_V1_STR)
app.include_router(conversations_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Aurenix AI API",
        "version": settings.VERSION,
        "docs_url": "/docs"
    }
