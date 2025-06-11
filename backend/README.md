# Aurenix AI Backend

This is the backend server for Aurenix AI, built with FastAPI, MongoDB, Redis, and Celery.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start MongoDB and Redis:
Make sure MongoDB and Redis are running on your system.

5. Start the application:
```bash
python run.py
```

6. Start Celery worker (in a separate terminal):
```bash
celery -A app.core.celery_worker worker --loglevel=info
```

## API Documentation

Once the server is running, you can access:
- API documentation: http://localhost:8000/docs
- Alternative API documentation: http://localhost:8000/redoc

## Development

- The application uses FastAPI for the web framework
- MongoDB for data storage
- Redis for caching and Celery task queue
- Celery for background task processing
- JWT for authentication
