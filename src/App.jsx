import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Dashboard from './pages/Dashboard';
import Progress from './pages/Progress';
import Nutrition from './pages/Nutrition';
import Settings from './pages/Settings';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [discordId, setDiscordId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  useEffect(() => {
    const saved = localStorage.getItem('discordId');
    if (saved) {
      setUser({ id: saved });
    }
  }, []);

  const handleAccess = (e) => {
    e.preventDefault();
    if (discordId.trim()) {
      localStorage.setItem('discordId', discordId);
      setIsLoading(true);
      setTimeout(() => {
        setUser({ id: discordId });
        setIsLoading(false);
      }, 500);
    }
  };

  // LOGIN PAGE
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
              Connect with your Discord ID to access your training hub
            </p>

            <form onSubmit={handleAccess} className="space-y-6">
              <div className="relative group">
                <input
                  type="text"
                  value={discordId}
                  onChange={(e) => setDiscordId(e.target.value)}
                  placeholder="Your Discord ID"
                  className="w-full px-6 py-4 bg-dark-bg border-2 border-neon-cyan rounded-lg text-white placeholder-neon-cyan placeholder-opacity-50 focus:outline-none focus:border-neon-lime focus:shadow-lg transition-all duration-300 glow-cyan"
                  required
                />
                <div className="absolute inset-0 rounded-lg bg-neon-cyan opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              <p className="text-center text-neon-cyan text-sm">
                💡 Right-click your name in Discord → Copy User ID
              </p>

              <button
                type="submit"
                disabled={!discordId.trim() || isLoading}
                className={`w-full btn-neon-lime py-4 text-lg font-bold uppercase tracking-widest transition-all duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⚙️</span>
                    INITIALIZING...
                  </span>
                ) : (
                  '🚀 ACCESS DASHBOARD'
                )}
              </button>
            </form>
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
            <div className="mt-4 flex justify-center space-x-2">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-neon-magenta rounded-full animate-pulse animation-delay-1000"></div>
              <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD
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
          <button
            onClick={() => {
              localStorage.removeItem('discordId');
              setUser(null);
            }}
            className="btn-neon-magenta"
          >
            Logout
          </button>
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
