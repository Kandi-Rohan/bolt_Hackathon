import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { useToast } from './hooks/useToast';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import BuyCredits from './components/BuyCredits';
import ToastContainer from './components/ToastContainer';

const ProtectedRoutes: React.FC = () => {
  const { user } = useAuth();
  const { toasts, removeToast } = useToast();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/buy-credits" element={<BuyCredits />} />
          <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
};

const AuthRoute: React.FC = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <AuthForm onSuccess={() => {}} />;
};

function App() {
  return (
    <div className="bg-[#F0F9FF] min-h-screen">
      <AuthProvider>
        <DataProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthRoute />} />
              
              {/* Protected Routes */}
              <Route path="/*" element={<ProtectedRoutes />} />
            </Routes>
          </Router>
        </DataProvider>
      </AuthProvider>
    </div>
  );
}

export default App;