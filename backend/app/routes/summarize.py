from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()


class TranscriptRequest(BaseModel):
    transcript: str = Field(
        ...,
        min_length=20,
        max_length=10000,
        description="Meeting transcript"
    )


@router.post("/summarize")
def summarize(request: TranscriptRequest):

    transcript = request.transcript.strip()

    if not transcript:
        raise HTTPException(
            status_code=400,
            detail="Transcript cannot be empty."
        )

    return {
        "summary": "This is a dummy summary generated for testing.",
        "keyPoints": [
            "Discussed project progress",
            "Reviewed pending tasks",
            "Assigned new responsibilities"
        ],
        "decisions": [
            "Complete backend integration by Friday",
            "Conduct next review meeting on Monday"
        ],
        "actionItems": [
            "Update project documentation",
            "Implement frontend integration",
            "Review API endpoints"
        ],
        "importantDates": [
            "Friday - Backend Deadline",
            "Monday - Team Review Meeting"
        ]
    }