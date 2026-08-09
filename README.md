# 💪 AI Fitness Coach Dashboard

A beautiful React web dashboard for the AI Fitness Coach Discord bot. Track your workouts, nutrition, and progress in real-time.

![Dashboard](https://img.shields.io/badge/React-18-blue)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

## 🎯 Features

- **📊 Dashboard** - Real-time stats, weekly trends, nutrition breakdown
- **📈 Progress Tracking** - 30-day volume charts with insights
- **🥗 Nutrition Tracker** - Daily macro tracking, meal logging, goals
- **⚙️ Settings** - Profile view, quick links, logout
- **📱 Responsive Design** - Works on desktop and mobile
- **🔄 Real-time Sync** - Data syncs instantly with Discord bot

## 🛠️ Tech Stack

- **Frontend:** React 18, React Router
- **Charts:** Recharts
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Discord Bot:** Node.js + Discord.js

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm
- GitHub account
- Vercel account

### Local Development

1. **Clone the repo:**
```bash
git clone https://github.com/charanreddy9866/fitness-coach-dashboard.git
cd fitness-coach-dashboard
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env.local`:**
```bash
cp .env.example .env.local
```

4. **Add your credentials to `.env.local`:**
```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_anon_key
REACT_APP_DISCORD_BOT_INVITE=your_bot_invite_url
```

5. **Start development server:**
```bash
npm start
```

Visit http://localhost:3000 and login with your Discord ID.

## 📖 Pages

### Dashboard (/)
- Today's workout stats (volume, exercises, streak, calories)
- 7-day workout volume bar chart
- Nutrition pie chart (macros breakdown)
- Quick stat cards

### Progress (/progress)
- 30-day volume trend (area chart)
- Best day, total volume, workout days
- Daily averages
- Personalized insights & achievements

### Nutrition (/nutrition)
- Today's macro intake vs goals (protein, carbs, fats)
- Today's meals logged
- 7-day calorie & protein trend
- Nutrition tips & suggestions

### Settings (/settings)
- Profile info (username, level, goal, streaks)
- Quick links (Discord bot, GitHub)
- About the app
- Logout

## 🌐 Deployment

### Deploy to Vercel

1. Fork this repo
2. Go to https://vercel.com
3. Click "New Project"
4. Import this GitHub repo
5. Add environment variables:
   - `REACT_APP_SUPABASE_URL`
   - `REACT_APP_SUPABASE_KEY`
   - `REACT_APP_DISCORD_BOT_INVITE`
6. Click "Deploy"

Your dashboard is now live! 🎉

## 📊 Getting Your Credentials

### Supabase Credentials
1. Go to https://supabase.com
2. Sign in to your project
3. Go to Settings → API
4. Copy `Project URL` and `anon public` key

### Discord Bot Invite
1. Go to Discord Developer Portal
2. Select your application
3. Go to OAuth2 → URL Generator
4. Select scopes: `bot`
5. Select permissions: `Send Messages`, `Read Messages`
6. Copy the generated URL

## 🔗 Links

- **Discord Bot:** https://github.com/charanreddy9866/Fitness-Coach
- **Live Dashboard:** [Your Vercel URL]
- **Documentation:** See SETUP_GUIDE.md

## 📝 How It Works

1. **Discord Bot** logs your workouts and meals
2. **Supabase** stores all your data
3. **Dashboard** fetches real-time data from Supabase
4. **Charts** visualize your progress
5. **Mobile-friendly** design works everywhere

## 🎓 Learn More

- [React Documentation](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Recharts Guide](https://recharts.org)
- [Tailwind CSS](https://tailwindcss.com)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Charan Reddy** - [@charanreddy9866](https://github.com/charanreddy9866)

## 🙏 Acknowledgments

- Built with React, Supabase, and Vercel
- Powered by AI (Groq Llama 3.1)
- Inspired by fitness tracking and gamification

---

⭐ If you find this project useful, please star it on GitHub!

**Happy tracking! 💪**
