import React from 'react';
import PropTypes from 'prop-types';
import {
  Home,
  Calendar,
  Users,
  FileText,
  Activity,
  User,
  Settings,
  MessageSquare,
  PlusCircle,
  BarChart3,
  Download,
  ChevronLeft
} from 'lucide-react';
import HeartBeatLogo from '../Brand/HeartBeatLogo.jsx';

export function Sidebar({ isOpen, onClose, collapsed, onToggleCollapse, user, onNavigateToSubPage }) {
  const getDoctorNavItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', active: true, onClick: () => onNavigateToSubPage && onNavigateToSubPage(null) },
    { icon: <Calendar size={20} />, label: 'Appointments', onClick: () => onNavigateToSubPage && onNavigateToSubPage('appointments') },
    { icon: <Users size={20} />, label: 'Patients', onClick: () => onNavigateToSubPage && onNavigateToSubPage('patients') },
    { icon: <FileText size={20} />, label: 'Medical Records', onClick: () => onNavigateToSubPage && onNavigateToSubPage('medical-records') },
    { icon: <Activity size={20} />, label: 'Reports', onClick: () => onNavigateToSubPage && onNavigateToSubPage('reports') },
    { icon: <User size={20} />, label: 'Profile', onClick: () => onNavigateToSubPage && onNavigateToSubPage('settings') }
  ];

  const getPatientNavItems = () => [
    { icon: <Home size={20} />, label: 'Home', onClick: () => onNavigateToSubPage && onNavigateToSubPage(null) },
    { icon: <Calendar size={20} />, label: 'Appointments', onClick: () => onNavigateToSubPage && onNavigateToSubPage('appointments') },
    { icon: <FileText size={20} />, label: 'My Records', onClick: () => onNavigateToSubPage && onNavigateToSubPage('medical-records') },
    { icon: <MessageSquare size={20} />, label: 'Messages', onClick: () => onNavigateToSubPage && onNavigateToSubPage('chat') },
    { icon: <User size={20} />, label: 'Profile', onClick: () => onNavigateToSubPage && onNavigateToSubPage('settings') }
  ];

  const getAdminNavItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <Users size={20} />, label: 'Patients' },
    { icon: <Calendar size={20} />, label: 'Appointments' },
    { icon: <PlusCircle size={20} />, label: 'Add Patient' },
    { icon: <BarChart3 size={20} />, label: 'Analytics' },
    { icon: <User size={20} />, label: 'Profile' },
    { icon: <Settings size={20} />, label: 'Settings' }
  ];

  const getNavItems = () => {
    switch (user?.role) {
      case 'doctor':
        return getDoctorNavItems();
      case 'patient':
        return getPatientNavItems();
      case 'admin':
        return getAdminNavItems();
      default:
        return [];
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
             {/* Sidebar */}
       <div className={`
         fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-all duration-300 ease-in-out
         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
         lg:translate-x-0 lg:fixed lg:z-auto lg:h-screen
         ${collapsed ? 'lg:w-16' : 'lg:w-64'}
         w-64
       `}>
        <div className="flex flex-col h-full">
           {/* Logo and Collapse Toggle */}
           <div className="flex items-center justify-between h-16 bg-white dark:bg-gray-800 px-4">
             {!collapsed && <HeartBeatLogo size={18} />}
             <button
               onClick={onToggleCollapse}
               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
               title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
             >
               <ChevronLeft size={16} className={`transform transition-transform ${collapsed ? 'rotate-180' : ''}`} />
             </button>
           </div>

          {/* Navigation */}
          <nav className={`flex-1 py-8 space-y-3 ${collapsed ? 'px-2' : 'px-6'}`}>
            {getNavItems().map((item, index) => (
              <button
                key={index}
                className={`w-full flex items-center ${collapsed ? 'justify-center px-3' : 'px-4'} py-3 text-left rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:translate-x-1 ${
                  item.active
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md'
                }`}
                onClick={item.onClick}
                title={collapsed ? item.label : ''}
              >
                <div className="transition-transform duration-200 ease-in-out group-hover:scale-110">
                  {item.icon}
                </div>
                {!collapsed && <span className="ml-3 transition-all duration-200 ease-in-out">{item.label}</span>}
              </button>
            ))}
          </nav>

        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  collapsed: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
  user: PropTypes.object,
  onNavigateToSubPage: PropTypes.func
};