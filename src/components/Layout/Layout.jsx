import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Sidebar } from './Sidebar.jsx';
import { Navbar } from './Navbar.jsx';

export function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />
      
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 px-4 py-4 lg:px-6 overflow-y-auto h-[calc(100vh-64px)]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};