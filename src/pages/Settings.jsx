import { useNavigate } from 'react-router-dom';

function Settings({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">⚙️ Settings</h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-xl mb-8 max-w-md">
        <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Username</label>
            <div className="bg-gray-700 p-3 rounded text-white">{user?.username || 'N/A'}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Fitness Level</label>
            <div className="bg-gray-700 p-3 rounded text-white">{user?.fitness_level || 'Not set'}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Goal</label>
            <div className="bg-gray-700 p-3 rounded text-white">{user?.goals || 'Not set'}</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Current Streak</label>
            <div className="bg-gray-700 p-3 rounded text-white">{user?.current_streak || 0} days 🔥</div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">Longest Streak</label>
            <div className="bg-gray-700 p-3 rounded text-white">{user?.longest_streak || 0} days</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-xl mb-8 max-w-md">
        <h2 className="text-2xl font-bold mb-6">Quick Links</h2>
        <div className="space-y-3">
          
            href={process.env.REACT_APP_DISCORD_BOT_INVITE || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded text-center transition"
          >
            🤖 Invite Bot to Discord
          </a>
          
            href="https://github.com/charanreddy9866/Fitness-Coach"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded text-center transition"
          >
            💻 View on GitHub
          </a>
        </div>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-xl mb-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="text-gray-300 mb-4">
          AI Fitness Coach - Track your workouts, nutrition, and progress all in one place.
        </p>
        <div className="text-sm text-gray-400 space-y-1">
          <div>📊 Discord Bot + Web Dashboard</div>
          <div>🤖 Powered by AI (Groq Llama 3.1)</div>
          <div>💾 Data stored securely in Supabase</div>
          <div>🚀 Hosted on Railway & Vercel</div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded text-lg transition max-w-md w-full"
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Settings;
