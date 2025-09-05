import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ParticlesBackground from './components/effects/ParticlesBackground';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import RafflePage from './pages/RafflePage';
import PaymentPage from './pages/PaymentPage';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import WinnersPage from './pages/WinnersPage';
import { AuthProvider } from './contexts/AuthContext';
import { RaffleProvider } from './contexts/RaffleContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import CursorTrail from './components/effects/CursorTrail';
import FloatingElements from './components/effects/FloatingElements';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader">
          <div className="coin-spin"></div>
          <h1 className="loading-text">RIFAS DORADAS</h1>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <RaffleProvider>
        <div className="app">
          <ParticlesBackground />
          <FloatingElements />
          <CursorTrail />
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/raffle/:id" element={<RafflePage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/winners" element={<WinnersPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'linear-gradient(135deg, #1a0033 0%, #2d1b4e 100%)',
                color: '#FFD700',
                border: '1px solid #FFD700',
                borderRadius: '12px',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
              },
            }}
          />
        </div>
      </RaffleProvider>
    </AuthProvider>
  );
}

export default App;