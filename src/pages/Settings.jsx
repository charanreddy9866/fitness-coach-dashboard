function Settings({ user }) {
  const handleLogout = () => {
    localStorage.removeItem('discord_token');
    localStorage.removeItem('discord_user_id');
    localStorage.removeItem('discord_username');
    window.location.reload();
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold text-glow-lime mb-8">⚙️ Settings</h1>
      <div className="neon-card border-neon-lime p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-glow-cyan mb-4">Profile</h2>
          <p className="text-neon-cyan">Discord ID: <span className="text-glow-lime">{user.id}</span></p>
          <p className="text-neon-cyan">Username: <span className="text-glow-lime">{user.username}</span></p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-glow-magenta mb-4">Account</h2>
          <button
            onClick={handleLogout}
            className="btn-neon-magenta"
          >
            Logout
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-glow-yellow mb-4">About</h2>
          <p className="text-neon-cyan text-sm">AI Fitness Coach v1.0</p>
          <p className="text-neon-cyan text-sm">Built with React, Supabase, Discord OAuth</p>
        </div>
      </div>
    </div>
  );
}

export default Settings;
