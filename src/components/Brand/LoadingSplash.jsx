import React from 'react';
import HeartbeatLogo from './HeartbeatLogo.jsx';

export default function LoadingSplash() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <HeartbeatLogo size={24} />
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  );
}



