# 🚀 Quick Start Guide

Get the Employee Education Platform running in **5 minutes**!

## Prerequisites Check

Make sure you have:
- ✅ Node.js 18+ (`node --version`)
- ✅ Python 3.9+ (`python --version`)
- ✅ npm (`npm --version`)

## Step-by-Step Setup

### 1️⃣ Backend (Terminal 1)

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv

# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Install dependencies (takes ~2 minutes)
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Start the server
python run.py
```

✅ **Backend running at:** http://localhost:8000
📚 **API Docs:** http://localhost:8000/docs

---

### 2️⃣ Frontend (Terminal 2)

Open a **new terminal window**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies (takes ~2 minutes)
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Start the development server
npm run dev
```

✅ **Frontend running at:** http://localhost:3000

---

## 3️⃣ Access the Platform

Open your browser and go to:
👉 **http://localhost:3000**

### Demo Login:
- **Email:** demo@company.com
- **Password:** demo123

---

## 🎯 What to Try First

1. **Dashboard** - View your learning statistics
2. **Courses** - Browse and filter available courses
3. **Schedule** - Check your learning calendar
4. **Homework** - See pending assignments
5. **Leaderboard** - View rankings and achievements
6. **Profile** - Check your progress and skills

---

## 🐳 Alternative: Docker Setup

If you prefer Docker:

```bash
# Start everything with Docker Compose
docker-compose up -d

# Access:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:8000
```

---

## ❓ Troubleshooting

### Backend won't start?
```bash
# Check if port 8000 is available
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Try a different port
uvicorn app.main:app --port 8001
```

### Frontend won't start?
```bash
# Check if port 3000 is available
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database issues?
```bash
# Delete and recreate database
cd backend
rm edu_platform.db
python run.py  # Will auto-create database
```

---

## 📖 Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) for feature overview
- Explore the API at http://localhost:8000/docs
- Customize the platform for your organization

---

## 🎨 Feature Highlights

| Feature | Description | URL |
|---------|-------------|-----|
| Dashboard | Progress tracking and statistics | `/dashboard` |
| Courses | Browse and enroll in courses | `/courses` |
| Schedule | Calendar and events | `/schedule` |
| Homework | Assignments and submissions | `/homework` |
| Leaderboard | Rankings and gamification | `/leaderboard` |
| Profile | User profile and achievements | `/profile` |
| Settings | Preferences and security | `/settings` |

---

## 💡 Tips

- **Development:** Both servers auto-reload on file changes
- **API Testing:** Use the interactive docs at `/docs`
- **Database:** SQLite is used by default (see `backend/edu_platform.db`)
- **Styling:** Modify Tailwind config in `frontend/tailwind.config.ts`

---

## 🆘 Need Help?

- Check the main [README.md](README.md)
- Review [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
- Check API documentation at http://localhost:8000/docs

---

**Happy Learning! 🎓**
