from fastapi import FastAPI

app = FastAPI(
    title="Meeting Notes Summarizer API",
    version="1.0.0"
)

@app.get("/")
def health_check():
    return {
        "status": "success",
        "message": "Meeting Notes Summarizer API is running"
    }