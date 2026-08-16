import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, user, onLogout }) {
  return (
    <div className="flex min-h-screen bg-dark-bg">
      <Sidebar user={user} onLogout={onLogout} />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-0">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
