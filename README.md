# ⚡ Helplytics AI — Community Support Platform

> Built for **SMIT Grand Coding Night — April 2026**

A full-stack, AI-powered community platform that connects students who need help with those who can provide it. Built with the MERN stack and Gemini AI integration.

---

## 🌐 Live Demo

| Service | URL |
|--------|-----|
| 🖥️ Frontend | [helplytics-ai-client.vercel.app](https://helplytics-ai-idlo.vercel.app/) |
| ⚙️ Backend API | [helplytics-ai-a3hz.vercel.app](https://helplytics-ai-a3hz.vercel.app) |
| 📦 GitHub Repo | [github.com/mianmuhammadbilal/helplytics-ai](https://github.com/mianmuhammadbilal/helplytics-ai) |

---

## 🚀 Tech Stack

### Frontend
- **React** + Vite
- **React Router DOM** — Multi-page navigation
- **Axios** — API communication
- **Custom CSS-in-JS** — No UI library, fully hand-crafted UI

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** — Authentication & session management
- **bcryptjs** — Password hashing

### AI
- **Google Gemini API** — Auto-categorization, urgency detection, tag suggestions, rewrite recommendations

### Deployment
- **Vercel** — Frontend + Backend (serverless)
- **MongoDB Atlas** — Cloud database

---

## ✨ Features

### Core
- 🔐 JWT-based Authentication (Signup / Login)
- 🧭 Role selection — Need Help / Can Help / Both
- 🎯 Onboarding flow — Skills, interests, location
- 📋 Create help requests with title, description, tags, category, urgency
- 🔍 Explore & filter requests by category, urgency, skills, location
- 🤝 Offer to help on any request
- ✅ Mark requests as solved
- 🏆 Leaderboard — Top helpers ranked by trust score
- 👤 Profile page — View & update skills, interests, location

### AI Features (Gemini API)
- 🤖 Auto-categorization of help requests
- 🏷️ Smart tag suggestions
- ⚡ Urgency detection (low / medium / high)
- 📝 Request rewrite suggestions
- 💡 AI Center — Platform trends, urgency watch, mentor pool signals

### Bonus
- 🌟 Trust Score system — Earned by helping others
- 🏅 Badge system — Design Ally, Fast Responder, Top Mentor
- 🔔 Notifications — Live updates on requests, matches, trust signals
- 💬 Messaging — Direct communication between helpers and requesters
- 👀 Guest access — Leaderboard & Notifications viewable without login

---

## 📁 Project Structure

```
helplytics-ai/
├── client/                  # React Frontend (Vite)
│   └── src/
│       ├── components/
│       │   └── Navbar.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       └── pages/
│           ├── Landing.jsx
│           ├── Auth.jsx
│           ├── Onboarding.jsx
│           ├── Dashboard.jsx
│           ├── Explore.jsx
│           ├── CreateRequest.jsx
│           ├── RequestDetail.jsx
│           ├── Leaderboard.jsx
│           ├── Messages.jsx
│           ├── Notifications.jsx
│           ├── AiCenter.jsx
│           └── Profile.jsx
│
└── server/                  # Node.js + Express Backend
    ├── models/
    │   ├── User.js
    │   └── Request.js
    ├── routes/
    │   ├── auth.js
    │   ├── requests.js
    │   └── ai.js
    ├── middleware/
    │   └── auth.js
    └── index.js
```
---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas account
- Google Gemini API key

### 1. Clone the repo
```bash
git clone https://github.com/mianmuhammadbilal/helplytics-ai.git
cd helplytics-ai
```

### 2. Backend setup
```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/helplytics
JWT_SECRET=helplytics_secret_2026
GEMINI_API_KEY=your_gemini_api_key_here
```

Start backend:
```bash
node index.js
```

### 3. Frontend setup
```bash
cd client
npm install
npm run dev
```

### 4. Seed dummy data (optional)
```bash
cd server
node seed.js
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get current user profile |
| PUT | `/api/auth/profile` | Update user profile |

### Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/requests` | Get all requests (filterable) |
| POST | `/api/requests` | Create new request |
| GET | `/api/requests/:id` | Get single request |
| POST | `/api/requests/:id/help` | Offer to help |
| PATCH | `/api/requests/:id/solve` | Mark as solved |
| GET | `/api/requests/meta/leaderboard` | Get top helpers |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/analyze` | Analyze request with Gemini AI |

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Brand | `#108077` |
| Background | `#f5f0e8` |
| Dark Card | `#282f31` |
| Left Hero Card | `#14302c` |
| Right Hero Card | `#16332f` |
| Font | Inter |

---

## 👤 Demo Users

After running `node seed.js`:

| Name | Email | Password | Role |
|------|-------|----------|------|
| Ali Hassan | ali@test.com | 123456 | Both |
| Sara Khan | sara@test.com | 123456 | Can Help |
| Bilal Ahmed | bilal@test.com | 123456 | Both |
| Zara Sheikh | zara@test.com | 123456 | Can Help |
| Usman Ali | usman@test.com | 123456 | Both |

---

## 🏗️ Pages Overview

| Page | Route | Access |
|------|-------|--------|
| Landing | `/` | Public |
| Auth | `/auth` | Public |
| Onboarding | `/onboarding` | New users only |
| Dashboard | `/dashboard` | Protected |
| Explore | `/explore` | Protected |
| Create Request | `/create` | Protected |
| Request Detail | `/request/:id` | Protected |
| Leaderboard | `/leaderboard` | Public |
| Messages | `/messages` | Protected |
| Notifications | `/notifications` | Public (read-only for guests) |
| AI Center | `/ai-center` | Protected |
| Profile | `/profile` | Protected |

---

## 🤖 AI Integration

Helplytics uses **Google Gemini API** for intelligent request processing:

```json
Input:  { "title": "...", "description": "..." }
Output: {
  "category": "Programming",
  "tags": ["react", "javascript"],
  "urgency": "high",
  "summary": "One-line AI summary of the request"
}
```

Fallback response activates automatically if API is unavailable.

---

## 📸 Screenshots

> Landing Page · Dashboard · Explore · AI Center · Leaderboard

---

## 🙌 Built By

**Mian Muhammad Bilal**
SMIT Grand Coding Night — April 2026
Batch 15 — MERN Stack

---

## 📄 License

MIT License — Free to use and modify.
