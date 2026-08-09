# ⚡ Quick Start (5 Minutes)

## Fastest way to get the dashboard running

### 1️⃣ Setup (2 min)

```bash
# Create folder
mkdir fitness-coach-dashboard
cd fitness-coach-dashboard

# Install dependencies
npm install
```

### 2️⃣ Environment (1 min)

Create `.env.local`:
```
REACT_APP_SUPABASE_URL=your_url
REACT_APP_SUPABASE_KEY=your_key
REACT_APP_DISCORD_BOT_INVITE=your_invite_url
```

Get credentials from:
- Supabase: Settings → API
- Discord: Developer Portal → OAuth2

### 3️⃣ Run Locally (1 min)

```bash
npm start
```

Opens http://localhost:3000

### 4️⃣ Deploy to Vercel (1 min)

1. Push to GitHub
2. Connect to Vercel
3. Add env variables
4. Deploy ✅

---

## 🔑 Your Credentials

Find these in:

| Credential | Where |
|-----------|-------|
| Supabase URL | Supabase → Settings → API |
| Supabase Key | Supabase → Settings → API (copy "anon" key) |
| Discord Bot Invite | Discord Dev Portal → OAuth2 |
| Your Discord ID | Right-click your name in Discord → Copy ID |

---

## 📁 File Structure

```
fitness-coach-dashboard/
├── package.json              ← Dependencies
├── .env.local               ← Your secrets (create this)
├── public/
│   └── index.html          ← HTML template
└── src/
    ├── App.jsx             ← Main app
    ├── App.css             ← Styles
    ├── index.js            ← Entry point
    ├── pages/
    │   ├── Dashboard.jsx    ← Home page
    │   ├── Progress.jsx     ← 30-day trends
    │   ├── Nutrition.jsx    ← Macro tracking
    │   └── Settings.jsx     ← Profile & logout
    └── components/
        └── Navbar.jsx      ← Navigation
```

---

## 🚀 Deploy Commands

```bash
# Test locally
npm start

# Build for production
npm run build

# Push to GitHub
git add .
git commit -m "message"
git push

# Vercel deploys automatically!
```

---

## ✅ Testing Checklist

- [ ] Can login with Discord ID
- [ ] Dashboard shows today's workouts
- [ ] Charts load without errors
- [ ] Progress page shows 30-day trend
- [ ] Nutrition page shows today's macros
- [ ] Can navigate between pages
- [ ] Settings page displays profile
- [ ] Live on Vercel URL

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| No data showing | Check Discord ID, verify Supabase connection |
| Charts blank | Make sure you have workout data in bot |
| Login fails | Use correct 17-18 digit Discord ID |
| Vercel deploy fails | Check `.env` variables are set |
| Tailwind not working | Run `npm install -D tailwindcss` |

---

## 📊 What's Next?

After deployment:
1. ✅ Post on LinkedIn with screenshots
2. ✅ Add to GitHub portfolio
3. ✅ Invite friends to test
4. ✅ Collect feedback
5. ✅ Plan Phase D features

---

**You've built an AI fitness app with:**
- Discord bot (13 commands)
- Web dashboard (4 pages)
- Real-time data sync
- Beautiful charts
- Full deployment

**That's a 🔥 portfolio project!**
