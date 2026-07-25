from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class TranscriptRequest(BaseModel):
    transcript: str


@router.post("/summarize")
def summarize_meeting(data: TranscriptRequest):
    return {
        "summary": "The team discussed project progress, backend testing, and launch planning.",
        "keyPoints": [
            "Frontend development is nearly complete.",
            "Backend APIs require final testing.",
            "QA testing starts this week."
        ],
        "decisions": [
            "Product launch moved to next Monday.",
            "Deployment review scheduled for Tuesday."
        ],
        "actionItems": [
            {
                "owner": "Anjali",
                "task": "Complete frontend testing",
                "deadline": "Friday"
            },
            {
                "owner": "Rahul",
                "task": "Fix backend APIs",
                "deadline": "Friday"
            },
            {
                "owner": "Amit",
                "task": "Review deployment",
                "deadline": "Tuesday"
            }
        ],
        "importantDates": [
            "Friday",
            "Tuesday",
            "Next Monday"
        ]
    }