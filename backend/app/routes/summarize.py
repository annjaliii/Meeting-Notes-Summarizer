# summarize.py
from typing import List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.gemini_service import (
    summarize_meeting,
    GeminiServiceError,
)
router = APIRouter()


class TranscriptRequest(BaseModel):
    transcript: str = Field(..., min_length=1, description="Raw meeting transcript text.")


class ActionItem(BaseModel):
    task: str
    person: Optional[str] = None
    deadline: Optional[str] = None
    status: Optional[str] = None


class SummaryResponse(BaseModel):
    summary: str
    keyPoints: List[str]
    decisions: List[str]
    actionItems: List[ActionItem]
    importantDates: List[str]


@router.post("/summarize", response_model=SummaryResponse)
def summarize(request: TranscriptRequest):
    """
    Deliberately a synchronous `def`, not `async def`.

    summarize_meeting() makes a blocking network call to Gemini. FastAPI
    automatically runs synchronous route handlers in a threadpool, so
    this keeps the event loop free for other requests. Declaring this as
    `async def` while calling a blocking function inside it would stall
    the entire server under concurrent load.
    """
    try:
        result = summarize_meeting(request.transcript)
    except GeminiServiceError as exc:
        raise HTTPException(status_code=exc.status_code, detail=exc.message)

    return result