from fastapi import FastAPI
from app.routes.summarize import router as summarize_router

app = FastAPI(
    title="Meeting Notes Summarizer API",
    description="Backend API for summarizing meeting transcripts.",
    version="1.0.0"
)

app.include_router(summarize_router)


@app.get("/")
def health_check():
    return {
        "status": "success",
        "message": "Meeting Notes Summarizer API is running"
    }