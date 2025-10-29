
import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { LoginScreen } from './components/auth/LoginScreen';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';

type UserRole = 'admin' | 'student' | null;

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleLogin = (role: 'admin' | 'student') => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  const renderContent = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} />;
      case 'student':
        return <StudentDashboard onLogout={handleLogout} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <DataProvider>
      <div className="App">
        {renderContent()}
      </div>
    </DataProvider>
  );
}

export default App;
