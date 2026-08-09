# 🚀 Fitness Coach Dashboard - Setup & Deployment Guide

## Phase C Part 2: Complete Web Dashboard

This is a **React dashboard** that visualizes your fitness data from your Discord bot.

---

## 📋 What You Get

✅ **Dashboard Home** - Today's stats, weekly volume chart, nutrition breakdown
✅ **Progress Page** - 30-day volume trends with insights
✅ **Nutrition Page** - Daily macro tracking and 7-day trends
✅ **Settings Page** - Profile view and quick links
✅ **Fully Responsive** - Works on desktop and mobile
✅ **Real-time Data** - Pulls from your Supabase database

---

## 🛠️ Prerequisites

Before starting, make sure you have:
- ✅ Node.js 16+ installed
- ✅ npm installed
- ✅ Git installed
- ✅ GitHub account
- ✅ Vercel account (free)
- ✅ Your Supabase credentials (from bot setup)

---

## 📦 Step 1: Setup Project Locally (15 minutes)

### 1.1 Create a new folder for the dashboard:

```bash
mkdir fitness-coach-dashboard
cd fitness-coach-dashboard
```

### 1.2 Download all the files I created:

You should have these files/folders:
```
fitness-coach-dashboard/
├── package.json
├── .env.example
├── public/
│   └── index.html
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.js
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Progress.jsx
    │   ├── Nutrition.jsx
    │   └── Settings.jsx
    └── components/
        └── Navbar.jsx
```

**If you don't have these files yet**, create each file in the correct folder structure based on the paths above.

### 1.3 Install dependencies:

```bash
npm install
```

This will install:
- React & React Router
- Supabase client
- Recharts (for charts)
- Tailwind CSS

### 1.4 Create your `.env.local` file:

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_KEY=your_supabase_anon_key_here
REACT_APP_DISCORD_BOT_INVITE=https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=2048&scope=bot
```

**Where to find these:**

- **Supabase URL & Key**: Go to Supabase → Settings → API → Copy the URL and `anon` (public) key
- **Discord Bot Invite**: Go to Discord Developer Portal → OAuth2 → Copy the invite URL

### 1.5 Install Tailwind CSS (required for styling):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then edit `tailwind.config.js`:

```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 🧪 Step 2: Test Locally (10 minutes)

### 2.1 Start the development server:

```bash
npm start
```

This will open http://localhost:3000 in your browser.

### 2.2 Test the login:

1. Get your Discord ID:
   - Right-click your username in Discord
   - Click "Copy User ID"
   - Paste it in the login box

2. You should see:
   - ✅ Dashboard with today's stats
   - ✅ Charts showing workout volume
   - ✅ Nutrition breakdown
   - ✅ Navigation between pages

### 2.3 Verify data is loading:

- Go to `/progress` → Should see 30-day chart
- Go to `/nutrition` → Should see daily macro breakdown
- Go to `/settings` → Should see your profile

---

## 🚀 Step 3: Deploy to GitHub (5 minutes)

### 3.1 Create a new GitHub repo:

1. Go to https://github.com/new
2. Name it: `fitness-coach-dashboard`
3. Click "Create repository"

### 3.2 Push your code:

In your project folder:

```bash
git init
git add .
git commit -m "Initial commit: Fitness Coach Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fitness-coach-dashboard.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## 🌐 Step 4: Deploy to Vercel (5 minutes)

### 4.1 Go to Vercel:

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo (`fitness-coach-dashboard`)

### 4.2 Configure environment variables:

In Vercel, go to Settings → Environment Variables

Add these three variables:
- `REACT_APP_SUPABASE_URL` = your_supabase_url
- `REACT_APP_SUPABASE_KEY` = your_supabase_key
- `REACT_APP_DISCORD_BOT_INVITE` = your_bot_invite_url

### 4.3 Deploy:

Click "Deploy" and wait 2-3 minutes.

Once done, you'll get a live URL like:
```
https://fitness-coach-dashboard.vercel.app
```

---

## ✅ Testing Your Live Dashboard

1. Visit your Vercel URL
2. Enter your Discord ID in the login box
3. You should see:
   - ✅ All your workout data
   - ✅ Nutrition tracking
   - ✅ Progress charts
   - ✅ Profile information

---

## 📱 How to Use

**Dashboard Home (/):**
- See today's workout stats
- View weekly volume trend
- Check daily nutrition breakdown
- Quick stats cards

**Progress (/progress):**
- 30-day volume trend
- Best day, total volume, average per day
- Insights and achievements

**Nutrition (/nutrition):**
- Today's macro intake vs goals
- Meals logged
- 7-day calorie and protein trend
- Nutrition tips

**Settings (/settings):**
- View profile
- Quick links to Discord bot
- GitHub repo link
- Logout

---

## 🔄 Updating Your Dashboard

When you update code:

```bash
git add .
git commit -m "Your message"
git push
```

Vercel will automatically redeploy! 🚀

---

## 🆘 Troubleshooting

**"No data showing":**
- Make sure your Discord ID is correct
- Check that `.env.local` has correct Supabase credentials
- Verify you've logged workout data in the bot

**"Charts not loading":**
- Ensure Recharts is installed: `npm install recharts`
- Restart `npm start`

**"Login not working":**
- Make sure you're using your actual Discord ID (17-18 digit number)
- Check Supabase connection

**"Deploy fails on Vercel":**
- Check that all environment variables are set correctly
- Make sure `package.json` exists in root folder

---

## 📊 Next Steps

1. ✅ Share your dashboard on LinkedIn!
2. ✅ Add more features (weight tracking, body metrics)
3. ✅ Integrate wearables (Apple Health, Google Fit)
4. ✅ Add export PDF functionality

---

## 🎉 You Did It!

You now have:
- ✅ Discord Bot with 13 commands
- ✅ Web Dashboard with real-time data
- ✅ Beautiful charts and visualizations
- ✅ Fully deployed and live

**Total build:** ~2-3 weeks from scratch to production 🚀

---

**Questions?** Check the troubleshooting section or review the code comments in each component!
