import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Dashboard from './pages/Dashboard';
import Progress from './pages/Progress';
import Nutrition from './pages/Nutrition';
import Settings from './pages/Settings';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
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
        .single();

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
    <div className="min-h-screen bg-dark-bg">
      <nav className="bg-dark-card border-b-2 border-neon-cyan p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-glow-cyan">💪 FITNESS COACH</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-4 py-2 rounded ${currentPage === 'dashboard' ? 'border-2 border-neon-cyan text-glow-cyan' : 'text-neon-cyan'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('progress')}
              className={`px-4 py-2 rounded ${currentPage === 'progress' ? 'border-2 border-neon-magenta text-glow-magenta' : 'text-neon-magenta'}`}
            >
              Progress
            </button>
            <button
              onClick={() => setCurrentPage('nutrition')}
              className={`px-4 py-2 rounded ${currentPage === 'nutrition' ? 'border-2 border-neon-lime text-glow-lime' : 'text-neon-lime'}`}
            >
              Nutrition
            </button>
            <button
              onClick={() => setCurrentPage('settings')}
              className={`px-4 py-2 rounded text-gray-400`}
            >
              Settings
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neon-cyan">Welcome, <span className="text-glow-lime">{user.username}</span>!</span>
            <button
              onClick={handleLogout}
              className="btn-neon-magenta"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div>
        {currentPage === 'dashboard' && <Dashboard user={user} supabase={supabase} />}
        {currentPage === 'progress' && <Progress user={user} supabase={supabase} />}
        {currentPage === 'nutrition' && <Nutrition user={user} supabase={supabase} />}
        {currentPage === 'settings' && <Settings user={user} supabase={supabase} />}
      </div>
    </div>
  );
}

export default App;
