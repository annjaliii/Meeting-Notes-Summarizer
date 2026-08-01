import os
import re
import json
import logging

from dotenv import load_dotenv   # <-- ADD THIS

from google import genai
from google.genai import types

load_dotenv()    # <-- ADD THIS
logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    logger.warning(
        "GEMINI_API_KEY environment variable is not set. "
        "Gemini requests will fail until it is configured."
    )

client = genai.Client(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-3.6-flash"

# Custom exception so summarize.py can translate this into the right
# HTTP status code without gemini_service.py depending on FastAPI.
class GeminiServiceError(Exception):
    """Raised when Gemini fails to produce a usable summary."""

    def __init__(self, message: str, status_code: int = 502):
        super().__init__(message)
        self.message = message
        self.status_code = status_code


PROMPT_TEMPLATE = """You are a meeting notes extraction engine. You will be given a raw meeting transcript.

Your task is to analyze the transcript and return ONLY a single valid JSON object — no markdown formatting, no code fences, no explanations, no extra text before or after the JSON.

The JSON object must have EXACTLY this structure and these keys:

{{
  "summary": "A concise 2-4 sentence summary of the overall meeting.",
  "keyPoints": ["Key discussion point 1", "Key discussion point 2"],
  "decisions": ["Decision made 1", "Decision made 2"],
  "actionItems": [
    {{
      "task": "Description of the task",
      "person": "Name of the responsible person, or 'Unassigned' if not mentioned",
      "deadline": "Deadline mentioned in the transcript, or 'Not specified' if none",
      "status": "Pending"
    }}
  ],
  "importantDates": ["Important date or deadline mentioned in the meeting"]
}}

Rules:
- Return ONLY valid JSON. No markdown, no ```json fences, no commentary.
- "summary" must always be a non-empty string.
- "keyPoints", "decisions", "importantDates" must always be arrays of strings (can be empty arrays if nothing applies).
- "actionItems" must always be an array of objects with exactly the keys: task, person, deadline, status. Use "Pending" as the default status unless the transcript clearly indicates otherwise (e.g. "Completed", "In Progress").
- Do not invent information that is not present or reasonably inferable from the transcript.
- If the transcript is too short or lacks certain information, return empty arrays for the relevant fields rather than fabricating content.

Transcript:
\"\"\"
{transcript}
\"\"\"
"""


def _extract_json_block(raw_text: str) -> str:
    """
    Gemini is instructed to return raw JSON, but models occasionally wrap
    output in markdown code fences or add stray whitespace/text. This
    strips fences and isolates the first {...} block as a safety net.
    """
    text = raw_text.strip()

    # Strip ```json ... ``` or ``` ... ``` fences if present.
    fence_match = re.search(r"```(?:json)?\s*(.*?)\s*```", text, re.DOTALL)
    if fence_match:
        text = fence_match.group(1).strip()

    # Fallback: isolate the outermost { ... } block in case of stray text.
    if not text.startswith("{"):
        brace_match = re.search(r"\{.*\}", text, re.DOTALL)
        if brace_match:
            text = brace_match.group(0)

    return text


def _normalize_result(data: dict) -> dict:
    """
    Guarantees the final dict always matches the shape the frontend
    expects, even if Gemini omits a field or returns a slightly different
    type. Missing fields default to empty values instead of raising.
    """

    def _as_str_list(value):
        if isinstance(value, list):
            return [str(item) for item in value if str(item).strip()]
        return []

    def _as_action_items(value):
        if not isinstance(value, list):
            return []
        normalized = []
        for item in value:
            if isinstance(item, dict):
                normalized.append({
                    "task": str(item.get("task", "")).strip(),
                    "person": str(item.get("person") or "Unassigned"),
                    "deadline": str(item.get("deadline") or "Not specified"),
                    "status": str(item.get("status") or "Pending"),
                })
            elif isinstance(item, str) and item.strip():
                # Defensive fallback if Gemini ever returns plain strings.
                normalized.append({
                    "task": item.strip(),
                    "person": "Unassigned",
                    "deadline": "Not specified",
                    "status": "Pending",
                })
        return normalized

    return {
        "summary": str(data.get("summary", "")).strip(),
        "keyPoints": _as_str_list(data.get("keyPoints")),
        "decisions": _as_str_list(data.get("decisions")),
        "actionItems": _as_action_items(data.get("actionItems")),
        "importantDates": _as_str_list(data.get("importantDates")),
    }


def summarize_meeting(transcript: str) -> dict:
    """
    Sends the transcript to Gemini and returns a normalized dict matching:
    {
        "summary": str,
        "keyPoints": [str],
        "decisions": [str],
        "actionItems": [{"task", "person", "deadline", "status"}],
        "importantDates": [str]
    }

    Raises GeminiServiceError on any failure (network, empty response,
    invalid JSON) with a message safe to surface to the client.
    """
    if not transcript or not transcript.strip():
        raise GeminiServiceError("Transcript cannot be empty.", status_code=400)

    prompt = PROMPT_TEMPLATE.format(transcript=transcript.strip())

    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
        )
    except Exception as exc:
        logger.error("Gemini API call failed: %s", exc)
        raise GeminiServiceError(
            "Failed to reach the summarization service. Please try again.",
            status_code=502,
        ) from exc

    raw_text = getattr(response, "text", None)
    if not raw_text or not raw_text.strip():
        logger.error("Gemini returned an empty response.")
        raise GeminiServiceError(
            "The summarization service returned an empty response.",
            status_code=502,
        )

    json_text = _extract_json_block(raw_text)

    try:
        data = json.loads(json_text)
    except json.JSONDecodeError as exc:
        logger.error("Failed to parse Gemini JSON output: %s\nRaw: %s", exc, raw_text)
        raise GeminiServiceError(
            "Received an invalid response format from the summarization service.",
            status_code=502,
        ) from exc

    if not isinstance(data, dict):
        logger.error("Gemini JSON output was not an object: %s", raw_text)
        raise GeminiServiceError(
            "Received an unexpected response format from the summarization service.",
            status_code=502,
        )

    return _normalize_result(data)