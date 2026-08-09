import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-blue-400 transition">
            💪 Fitness Coach
          </Link>

          <div className="hidden md:flex gap-6">
            <NavLink to="/" label="Dashboard" />
            <NavLink to="/progress" label="Progress" />
            <NavLink to="/nutrition" label="Nutrition" />
            <NavLink to="/settings" label="Settings" />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-2xl"
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <MobileNavLink to="/" label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/progress" label="Progress" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/nutrition" label="Nutrition" onClick={() => setMobileMenuOpen(false)} />
            <MobileNavLink to="/settings" label="Settings" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="text-gray-300 hover:text-white transition font-semibold"
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block text-gray-300 hover:text-white transition font-semibold py-2 px-4 bg-gray-700 rounded"
    >
      {label}
    </Link>
  );
}

export default Navbar;
