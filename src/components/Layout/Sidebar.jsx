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
  BarChart3 
} from 'lucide-react';
import HeartbeatLogo from '../Brand/HeartbeatLogo.jsx';

export function Sidebar({ isOpen, onClose, user }) {
  const getDoctorNavItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <Calendar size={20} />, label: 'Appointments' },
    { icon: <Users size={20} />, label: 'Patients' },
    { icon: <FileText size={20} />, label: 'Medical Records' },
    { icon: <Activity size={20} />, label: 'Reports' },
    { icon: <User size={20} />, label: 'Profile' },
    { icon: <Settings size={20} />, label: 'Settings' }
  ];

  const getPatientNavItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <Calendar size={20} />, label: 'Appointments' },
    { icon: <FileText size={20} />, label: 'My Records' },
    { icon: <MessageSquare size={20} />, label: 'Messages' },
    { icon: <User size={20} />, label: 'Profile' },
    { icon: <Settings size={20} />, label: 'Settings' }
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
         fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-all duration-300 ease-in-out
         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
         lg:translate-x-0 lg:fixed lg:z-auto lg:h-screen
       `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-white dark:bg-gray-800">
            <HeartbeatLogo size={18} />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 space-y-3">
                         {getNavItems().map((item, index) => (
               <button
                 key={index}
                 className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:translate-x-1 ${
                   item.active
                     ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md'
                 }`}
                 onClick={item.onClick}
               >
                 <div className="transition-transform duration-200 ease-in-out group-hover:scale-110">
                   {item.icon}
                 </div>
                 <span className="ml-3 transition-all duration-200 ease-in-out">{item.label}</span>
               </button>
             ))}
          </nav>

          {/* User info */}
          <div className="p-6 border-t dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object
};