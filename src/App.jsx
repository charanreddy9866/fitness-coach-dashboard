import { useState } from 'react';

function App() {
  const [discordId, setDiscordId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAccess = (e) => {
    e.preventDefault();
    if (discordId.trim()) {
      localStorage.setItem('discordId', discordId);
      setIsLoading(true);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-cyan opacity-10 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-magenta opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
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

        {/* Card */}
        <div className="neon-card border-neon-cyan mb-8 p-8">
          <h2 className="text-center text-2xl font-bold text-glow-cyan mb-2">
            ENTER THE MATRIX
          </h2>
          <p className="text-center text-neon-cyan text-sm mb-8">
            Connect with your Discord ID to access your training hub
          </p>

          <form onSubmit={handleAccess} className="space-y-6">
            {/* Input Field */}
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

            {/* Help Text */}
            <p className="text-center text-neon-cyan text-sm">
              💡 Right-click your name in Discord → Copy User ID
            </p>

            {/* Submit Button */}
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

        {/* Features */}
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

        {/* Footer */}
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

export default App;
