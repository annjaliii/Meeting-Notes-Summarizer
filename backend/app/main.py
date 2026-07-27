from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.summarize import router as summarize_router
from app.services.gemini_service import test_gemini

app = FastAPI(
    title="Meeting Notes Summarizer API",
    description="Backend API for summarizing meeting transcripts.",
    version="1.0.0"
)

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(summarize_router)


@app.get("/")
def health_check():
    return {
        "status": "success",
        "message": "Meeting Notes Summarizer API is running"
    }


@app.get("/test-gemini")
def test():
    return {
        "response": test_gemini()
    }