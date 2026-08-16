import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, TrendingUp, Apple, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/progress', label: 'Progress', icon: TrendingUp },
    { path: '/nutrition', label: 'Nutrition', icon: Apple },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-black text-white p-2 rounded-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-dark-card border-r-2 border-neon-cyan text-white transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b-2 border-neon-cyan">
            <h1 className="text-2xl font-bold text-glow-cyan">💪 FITNESS</h1>
            <p className="text-neon-magenta text-sm mt-1 font-bold">COACH</p>
          </div>

          {/* User Info Section */}
          {user && (
            <div className="px-6 py-4 border-b border-neon-cyan/30">
              <p className="text-xs text-neon-cyan uppercase tracking-widest">Logged in as</p>
              <p className="text-glow-lime font-bold mt-1">{user.username}</p>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(path)
                    ? 'border-2 border-neon-cyan text-glow-cyan bg-opacity-10'
                    : 'text-neon-cyan hover:bg-gray-800/30 hover:text-glow-cyan'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer Section */}
          <div className="p-4 border-t-2 border-neon-cyan">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full px-4 py-2 bg-neon-magenta hover:bg-glow-magenta rounded-lg text-black text-sm font-bold uppercase transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="lg:ml-64 min-h-screen bg-dark-bg">
        {/* Top padding for mobile to account for fixed hamburger */}
        <div className="lg:hidden h-16" />
      </div>
    </>
  );
}
