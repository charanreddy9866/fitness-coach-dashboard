import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Progress from './pages/Progress';
import Nutrition from './pages/Nutrition';
import Settings from './pages/Settings';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient(
    process.env.REACT_APP_SUPABASE_URL,
    process.env.REACT_APP_SUPABASE_KEY
  );

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('discord_token');
    const userId = localStorage.getItem('discord_user_id');
    const username = localStorage.getItem('discord_username');

    if (token && userId) {
      setUser({ id: userId, username, token });
      setLoading(false);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      await handleOAuthCallback(code);
    }

    setLoading(false);
  };

  const handleOAuthCallback = async (code) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/discord`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (!data.success) throw new Error(data.error);

      const { user: discordUser, token } = data;

      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('discord_id', discordUser.id)
        .maybeSingle();

      if (!existingUser) {
        await supabase.from('users').insert([
          {
            discord_id: discordUser.id,
            username: discordUser.username,
            fitness_level: 'beginner',
            goals: 'general fitness',
          },
        ]);
      }

      localStorage.setItem('discord_token', token);
      localStorage.setItem('discord_user_id', discordUser.id);
      localStorage.setItem('discord_username', discordUser.username);

      setUser({ id: discordUser.id, username: discordUser.username, token });
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      console.error('OAuth error:', error);
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogin = () => {
    const clientId = process.env.REACT_APP_DISCORD_CLIENT_ID;
    const redirectUri = encodeURIComponent('https://fitness-coach-dashboard.vercel.app/auth/callback');
    const scope = encodeURIComponent('identify');

    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('discord_token');
    localStorage.removeItem('discord_user_id');
    localStorage.removeItem('discord_username');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-glow-cyan text-2xl">⚙️ INITIALIZING...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-cyan opacity-10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-magenta opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-black mb-4">
              <span className="text-glow-cyan">💪</span>
              <span className="text-white"> FITNESS</span>
              <br />
              <span className="text-glow-magenta">COACH</span>
            </h1>
            <p className="text-neon-cyan text-lg tracking-widest uppercase">
              Track • Train • Transform
            </p>
            <div className="h-1 bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-lime mt-4 rounded-full"></div>
          </div>

          <div className="neon-card border-neon-cyan mb-8 p-8">
            <h2 className="text-center text-2xl font-bold text-glow-cyan mb-2">
              ENTER THE MATRIX
            </h2>
            <p className="text-center text-neon-cyan text-sm mb-8">
              Connect with Discord to access your AI fitness hub
            </p>

            <button
              onClick={handleLogin}
              className="w-full btn-neon-lime py-4 text-lg font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              🎮 LOGIN WITH DISCORD
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="neon-card border-neon-cyan p-4 text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-neon-cyan text-xs uppercase font-bold">Track</p>
            </div>
            <div className="neon-card border-neon-magenta p-4 text-center">
              <div className="text-2xl mb-2">💪</div>
              <p className="text-neon-magenta text-xs uppercase font-bold">Train</p>
            </div>
            <div className="neon-card border-neon-lime p-4 text-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-neon-lime text-xs uppercase font-bold">Achieve</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-neon-cyan text-xs opacity-70">
              Powered by AI Fitness Coach • Built with Next-Gen Tech
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard user={user} supabase={supabase} />} />
          <Route path="/progress" element={<Progress user={user} supabase={supabase} />} />
          <Route path="/nutrition" element={<Nutrition user={user} supabase={supabase} />} />
          <Route path="/settings" element={<Settings user={user} supabase={supabase} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
