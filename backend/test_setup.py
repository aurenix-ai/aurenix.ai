"""
Test script to validate backend setup by checking:
1. MongoDB connection
2. Redis connection
3. OpenAI API key
4. Basic FastAPI endpoints
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from redis import Redis # type: ignore
import httpx
from dotenv import load_dotenv

async def test_mongodb():
    print("\nTesting MongoDB connection...")
    try:
        client = AsyncIOMotorClient("mongodb://localhost:27017")
        await client.admin.command('ping')
        print("✓ MongoDB connection successful")
        return True
    except Exception as e:
        print(f"✗ MongoDB connection failed: {str(e)}")
        return False

def test_redis():
    print("\nTesting Redis connection...")
    try:
        redis_client = Redis(host='localhost', port=6379, db=0)
        redis_client.ping()
        print("✓ Redis connection successful")
        return True
    except Exception as e:
        print(f"✗ Redis connection failed: {str(e)}")
        return False

def test_env_variables():
    print("\nTesting environment variables...")
    load_dotenv()
    
    required_vars = [
        "OPENAI_API_KEY",
        "SECRET_KEY",
        "MONGODB_URL",
        "REDIS_HOST",
        "REDIS_PORT"
    ]
    
    all_present = True
    for var in required_vars:
        if os.getenv(var):
            print(f"✓ {var} is set")
        else:
            print(f"✗ {var} is not set")
            all_present = False
    
    return all_present

async def test_api_endpoints():
    print("\nTesting API endpoints...")
    base_url = "http://localhost:8000"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{base_url}/")
            if response.status_code == 200:
                print("✓ Root endpoint is working")
            else:
                print(f"✗ Root endpoint returned status code {response.status_code}")
                return False
        except Exception as e:
            print(f"✗ Could not connect to API: {str(e)}")
            return False
    
    return True

async def main():
    print("Starting backend validation...")
    
    mongodb_ok = await test_mongodb()
    redis_ok = test_redis()
    env_ok = test_env_variables()
    api_ok = await test_api_endpoints()
    
    print("\nValidation Summary:")
    print("=" * 50)
    print(f"MongoDB Connection: {'✓' if mongodb_ok else '✗'}")
    print(f"Redis Connection: {'✓' if redis_ok else '✗'}")
    print(f"Environment Variables: {'✓' if env_ok else '✗'}")
    print(f"API Endpoints: {'✓' if api_ok else '✗'}")
    print("=" * 50)
    
    if all([mongodb_ok, redis_ok, env_ok, api_ok]):
        print("\n✓ All systems are operational!")
        return 0
    else:
        print("\n✗ Some checks failed. Please review the output above.")
        return 1

if __name__ == "__main__":
    exit_code = asyncio.run(main())
    exit(exit_code)
