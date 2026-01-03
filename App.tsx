
import React, { useState, useEffect } from 'react';
import { UserRole, AuthState } from './types';
import Login from './components/Login';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('archivault_session');
    return saved ? JSON.parse(saved) : { role: UserRole.GUEST, isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem('archivault_session', JSON.stringify(auth));
  }, [auth]);

  const handleLogin = (role: UserRole) => {
    setAuth({ role, isAuthenticated: true });
  };

  const handleLogout = () => {
    setAuth({ role: UserRole.GUEST, isAuthenticated: false });
  };

  if (!auth.isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout role={auth.role} onLogout={handleLogout}>
      {auth.role === UserRole.ADMIN ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </Layout>
  );
};

export default App;
