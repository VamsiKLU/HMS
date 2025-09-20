import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { LoginForm } from './Auth/LoginForm.jsx';
import { RegisterForm } from './Auth/RegisterForm.jsx';
import { Layout } from './Layout/Layout.jsx';
import { DoctorDashboard } from './Dashboard/DoctorDashboard.jsx';
import { PatientDashboard } from './Dashboard/PatientDashboard.jsx';
import { AdminDashboard } from './Dashboard/AdminDashboard.jsx';

// Import page components
import { BookAppointmentPage } from '../pages/BookAppointmentPage.jsx';
import { AppointmentsPage } from '../pages/AppointmentsPage.jsx';
import { MedicalRecordsPage } from '../pages/MedicalRecordsPage.jsx';
import { ChatPage } from '../pages/ChatPage.jsx';
import { ReportsPage } from '../pages/ReportsPage.jsx';
import { SettingsPage } from '../pages/SettingsPage.jsx';

// Import doctor pages
import { DoctorAppointmentsPage } from '../pages/DoctorAppointmentsPage.jsx';
import { DoctorPatientsPage } from '../pages/DoctorPatientsPage.jsx';
import { DoctorMedicalRecordsPage } from '../pages/DoctorMedicalRecordsPage.jsx';
import { DoctorReportsPage } from '../pages/DoctorReportsPage.jsx';

export function AppRouter() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = React.useState('login');
  const [currentSubPage, setCurrentSubPage] = React.useState(null);

  console.log('AppRouter render:', { user, isLoading, currentPage, currentSubPage });

  // Function to handle page navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
    setCurrentSubPage(null);
  };

  // Function to handle sub-page navigation
  const navigateToSubPage = (subPage) => {
    setCurrentSubPage(subPage);
  };

  // Function to go back to dashboard
  const navigateBack = () => {
    setCurrentSubPage(null);
  };

  if (isLoading) {
    console.log('Showing loading screen');
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user, showing auth form');
    if (currentPage === 'register') {
      return <RegisterForm onNavigateToLogin={() => navigateTo('login')} />;
    }
    return <LoginForm onNavigateToRegister={() => navigateTo('register')} />;
  }

  console.log('User authenticated, showing dashboard for role:', user.role);

  const getDashboardComponent = () => {
    // Handle sub-pages for patients
    if (user.role === 'patient' && currentSubPage) {
      switch (currentSubPage) {
        case 'book-appointment':
          return <BookAppointmentPage onNavigateBack={navigateBack} />;
        case 'appointments':
          return <AppointmentsPage onNavigateBack={navigateBack} onNavigateToSubPage={navigateToSubPage} />;
        case 'medical-records':
          return <MedicalRecordsPage onNavigateBack={navigateBack} />;
        case 'chat':
          return <ChatPage onNavigateBack={navigateBack} />;
        case 'reports':
          return <ReportsPage onNavigateBack={navigateBack} />;
        case 'settings':
          return <SettingsPage onNavigateBack={navigateBack} />;
        default:
          return <PatientDashboard onNavigateToSubPage={navigateToSubPage} />;
      }
    }

    // Handle sub-pages for doctors
    if (user.role === 'doctor' && currentSubPage) {
      switch (currentSubPage) {
        case 'appointments':
          return <DoctorAppointmentsPage onNavigateBack={navigateBack} />;
        case 'patients':
          return <DoctorPatientsPage onNavigateBack={navigateBack} />;
        case 'medical-records':
          return <DoctorMedicalRecordsPage onNavigateBack={navigateBack} />;
        case 'reports':
          return <DoctorReportsPage onNavigateBack={navigateBack} />;
        case 'settings':
          return <SettingsPage onNavigateBack={navigateBack} />;
        default:
          return <DoctorDashboard onNavigateToSubPage={navigateToSubPage} />;
      }
    }

    switch (user.role) {
      case 'doctor':
        console.log('Rendering DoctorDashboard');
        return <DoctorDashboard onNavigateToSubPage={navigateToSubPage} />;
      case 'patient':
        console.log('Rendering PatientDashboard');
        return <PatientDashboard onNavigateToSubPage={navigateToSubPage} />;
      case 'admin':
        console.log('Rendering AdminDashboard');
        return <AdminDashboard />;
      default:
        console.log('Invalid role:', user.role);
        return <div>Invalid role</div>;
    }
  };

  return (
    <Layout onNavigateToSubPage={navigateToSubPage}>
      {getDashboardComponent()}
    </Layout>
  );
}