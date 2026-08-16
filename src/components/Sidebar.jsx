import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, TrendingUp, Apple, Settings } from 'lucide-react';

export default function Sidebar() {
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
        className={`fixed left-0 top-0 h-screen w-64 bg-black text-white transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">fitagent_ai</h1>
            <p className="text-sm text-gray-400 mt-1">Fitness Coach</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(path)
                    ? 'bg-white text-black font-semibold'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer Section */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={() => {
                localStorage.removeItem('discordId');
                window.location.reload();
              }}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="lg:ml-64 min-h-screen bg-gray-50">
        {/* Top padding for mobile to account for fixed hamburger */}
        <div className="lg:hidden h-16" />
      </div>
    </>
  );
}
