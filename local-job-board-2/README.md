# ⚡ KaamKhojo — Local Job Notice Board

> Connecting blue-collar workers with local employers across India.

Built by **StackedCrew** · C.V. Raman Global University, Bhubaneswar

---

## 🚀 Getting Started (Frontend)

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at → **http://localhost:3000**

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/     # Navbar, Footer, Loader, ProtectedRoute
│   │   ├── job/        # JobCard, JobFilter
│   │   └── rating/     # RatingStars
│   ├── pages/          # HomePage, Login, Register, Jobs, Dashboard, Profile
│   ├── context/        # AuthContext (global login state)
│   ├── services/       # API calls (axios)
│   ├── utils/          # Constants, formatters
│   └── styles/         # global.css (dark theme)
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔌 Backend Connection

The frontend expects a Spring Boot API running at `http://localhost:8080`

All API calls are proxied via Vite: `/api/*` → `http://localhost:8080/api/*`

**Key endpoints used:**
| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/login` | POST | Login |
| `/api/auth/register` | POST | Register |
| `/api/jobs` | GET | Get all jobs |
| `/api/jobs/:id` | GET | Get job details |
| `/api/jobs` | POST | Create job |
| `/api/jobs/:id/apply` | POST | Apply for job |
| `/api/users/profile` | GET/PUT | User profile |
| `/api/ratings` | POST | Submit rating |

> **Note:** Frontend works with mock data when backend is not connected.

---

## 🎨 Tech Stack

- **React 18** + **Vite**
- **React Router DOM v6** — routing
- **Axios** — API calls
- **Plain CSS** — custom dark theme design system
- **Google Fonts** — Syne + Space Mono

---

## 👥 Team — StackedCrew

| Member | Role |
|---|---|
| Member 1 | Frontend — Pages & UI |
| Member 2 | Frontend — Components & API Integration |
| Member 3 | Backend — Spring Boot APIs |
| Member 4 | Backend — Database & Security |

---

## 📋 Pages

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home | No |
| `/jobs` | Browse Jobs | No |
| `/jobs/:id` | Job Details | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/dashboard` | Dashboard | ✅ Yes |
| `/profile` | My Profile | ✅ Yes |
| `/post-job` | Post a Job | ✅ Employer only |

---

## 🌐 GitHub Setup

```bash
git init
git add .
git commit -m "feat: initial frontend setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/local-job-notice-board.git
git push -u origin main
```

---

*Ganbatte Minna-san! 🎀✨*
