# 📝 Meeting Notes Summarizer

A full-stack Meeting Notes Summarizer that transforms lengthy meeting transcripts into structured summaries, key discussion points, action items, decisions, and important dates using Google's Gemini AI.

---

## 🚀 Features

- 📄 Paste meeting transcripts
- 🤖 AI-powered meeting summarization
- 📌 Key discussion points extraction
- ✅ Action items with assignee and deadline
- 📅 Important dates identification
- 📝 Decision tracking
- 📋 Copy notes to clipboard
- 📥 Export meeting notes as PDF
- 🔔 Toast notifications
- 📱 Responsive modern UI
- ⚡ FastAPI backend
- 🎨 Beautiful React + Tailwind frontend

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router
- jsPDF
- React Hot Toast
- Lucide React

## Backend

- Python
- FastAPI
- Uvicorn
- Google Gemini API
- Python Dotenv

---

# 📂 Project Structure

```
Meeting-Notes-Summarizer
│
├── backend
│   ├── app
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   └── utils
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/annjaliii/Meeting-Notes-Summarizer.git
```

```
cd Meeting-Notes-Summarizer
```

---

# Backend Setup

```
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

### Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run backend

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

# Frontend Setup

```
cd frontend
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📸 Screenshots

### Home Page

_Add screenshot here_

### Meeting Summary

_Add screenshot here_

### PDF Export

_Add screenshot here_

---

# 🌟 Future Improvements

- Voice meeting upload
- Audio transcription
- User authentication
- Meeting history
- Cloud storage
- Multi-language support
- Team collaboration
- Calendar integration

---

# 👩‍💻 Author

**Anjali Shetty**

GitHub

https://github.com/annjaliii

---

## ⭐ If you like this project, consider giving it a star!