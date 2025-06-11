from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "aurenix_worker",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

@celery_app.task(name="process_conversation")
def process_conversation(conversation_id: str, message: str):
    # TODO: Implement conversation processing with OpenAI
    pass
