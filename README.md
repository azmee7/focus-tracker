\# ⚡ Focus Habit Tracker – Full-Stack Web App



A \*\*production-ready, full-stack habit tracking platform\*\* built with \*\*Next.js\*\*, featuring \*\*Google Login, AI habit suggestions, cloud + offline storage, analytics, and PDF export\*\* — using \*\*free services\*\*.



This project is suitable for \*\*personal use, portfolio, or startup launch\*\*.



---



\## 🚀 Features



\### 🔐 Authentication

\- Google OAuth login

\- Email/password login (optional)

\- Secure sessions using NextAuth



\### 👤 Personal Profile

\- Name, email, profile image (Google)

\- Joined date

\- Personal goals

\- Habit statistics



\### 📅 Habit Tracking

\- Monthly habit grid (28–31 days auto)

\- Clickable daily checkboxes

\- Streak counter per habit

\- Glow animation on active streaks

\- Offline support (LocalStorage)



\### 📊 Analytics

\- Monthly progress visualization

\- Habit completion percentage

\- Best \& weakest habit insights

\- Chart.js graphs



\### 🧠 AI Habit Suggestions

\- AI recommends habits based on goals

\- Focus improvement advice

\- Uses OpenAI API (optional)



\### ☁️ Data Storage

\- MongoDB Atlas (free tier)

\- User-specific cloud data

\- LocalStorage fallback when offline

\- Auto-sync when back online



\### 📤 Export

\- Monthly / yearly summaries

\- PDF export with charts

\- Print-ready layout



\### 🌗 UI

\- Dark / light mode ready

\- Responsive (mobile + desktop)

\- Premium hover \& glow effects



---



\## 🧠 Tech Stack



| Layer | Technology |

|-----|-----------|

| Frontend | Next.js (React) |

| Backend | Next.js API Routes |

| Auth | NextAuth.js |

| OAuth | Google OAuth |

| Database | MongoDB Atlas (Free) |

| Charts | Chart.js |

| AI | OpenAI API |

| PDF | jsPDF + html2canvas |

| Hosting | Vercel (Free) |



---



\## 📁 Project Structure



focus-habit-tracker/

├── pages/

│ ├── api/

│ │ ├── auth/\[...nextauth].js

│ │ ├── habits.js

│ │ ├── ai.js

│ │ └── profile.js

│ ├── dashboard.js

│ ├── profile.js

│ ├── index.js

│ ├── \_app.js

├── lib/

│ ├── mongodb.js

│ └── openai.js

├── models/

│ └── User.js

├── styles/

│ └── globals.css

├── .env.local

├── package.json

└── README.md

