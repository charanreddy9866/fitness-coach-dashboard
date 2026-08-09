import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Dashboard from './pages/Dashboard';
import Progress from './pages/Progress';
import Nutrition from './pages/Nutrition';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import './App.css';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem('discordId');
    if (savedUserId) {
      fetchUserData(savedUserId);
    }
    setLoading(false);
  }, []);

  const fetchUserData = async (discordId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('discord_id', discordId)
        .single();

      if (data) {
        setUser(discordId);
        setUserData(data);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleLogin = (discordId) => {
    localStorage.setItem('discordId', discordId);
    setUser(discordId);
    fetchUserData(discordId);
  };

  const handleLogout = () => {
    localStorage.removeItem('discordId');
    setUser(null);
    setUserData(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            💪 Fitness Coach Dashboard
          </h1>
          <p className="text-gray-300 mb-8 text-xl">
            Track your workouts, nutrition, and progress all in one place
          </p>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar user={userData} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Dashboard user={userData} supabase={supabase} />} />
          <Route path="/progress" element={<Progress user={userData} supabase={supabase} />} />
          <Route path="/nutrition" element={<Nutrition user={userData} supabase={supabase} />} />
          <Route path="/settings" element={<Settings user={userData} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function LoginForm({ onLogin }) {
  const [discordId, setDiscordId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (discordId.trim()) {
      onLogin(discordId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md">
      <label className="block text-white mb-4 font-semibold">
        Enter Your Discord ID
      </label>
      <input
        type="text"
        value={discordId}
        onChange={(e) => setDiscordId(e.target.value)}
        placeholder="Your Discord ID"
        className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none mb-4"
      />
      <p className="text-gray-400 text-sm mb-4">
        Don't know your Discord ID? Right-click your name in Discord and copy User ID
      </p>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
      >
        Access Dashboard
      </button>
    </form>
  );
}

export default App;
