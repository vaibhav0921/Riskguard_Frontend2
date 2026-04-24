import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppProvider, useApp } from './context/AppContext';
import Toast from './components/Toast';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import PlansPage from './pages/PlansPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import EAGuidePage from './pages/EAGuidePage';

function AppRouter() {
  const { setLogoutCallback } = useApp();
  const user = useSelector(s => s.auth.user);
  const subscription = useSelector(s => s.auth.subscription);

  const [route, setRoute] = useState(null); // null = not booted yet
  const [activeTab, setActiveTab] = useState('home');

  // Wire logout → back to login
  useEffect(() => {
    setLogoutCallback(() => {
      setRoute('login');
      setActiveTab('home');
    });
  }, [setLogoutCallback]);

  // Boot — decide initial route based on auth state
  useEffect(() => {
    if (!user || !user.email || !user.account) {
      // No valid user → login
      setRoute('login');
      return;
    }

    if (!subscription || !subscription.expiryDate) {
      // Logged in but no subscription → plans
      setRoute('plans');
      return;
    }

    const isExpired = new Date(subscription.expiryDate) < new Date();
    if (isExpired) {
      // Subscription expired → plans
      setRoute('plans');
      return;
    }

    // All good → dashboard
    setRoute('app');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Show spinner while booting
  if (route === null) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: '#0d0f14',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          border: '3px solid rgba(163,230,53,0.2)',
          borderTopColor: '#a3e635',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Route guard helper — redirect to login if not authenticated
  const requireAuth = (component) => {
    if (!user || !user.email) {
      return (
        <LoginPage
          onSuccess={() => setRoute('app')}
          onNeedPlans={() => setRoute('plans')}
        />
      );
    }
    return component;
  };

  const renderPage = () => {
    switch (route) {

      case 'login':
        return (
          <LoginPage
            onSuccess={() => setRoute('app')}
            onNeedPlans={() => setRoute('plans')}
          />
        );

      case 'plans':
        return requireAuth(
          <PlansPage onContinue={() => setRoute('payment')} />
        );

      case 'payment':
        return requireAuth(
          <PaymentPage
            onBack={() => setRoute('plans')}
            onSuccess={() => setRoute('success')}
          />
        );

      case 'success':
        return requireAuth(
          <SuccessPage
            onDashboard={() => { setActiveTab('home'); setRoute('app'); }}
          />
        );

      case 'app':
        return requireAuth(
          <>
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'home' && <DashboardPage onGoGuide={() => setActiveTab('guide')} />}
            {activeTab === 'rules' && <SettingsPage />}
            {activeTab === 'guide' && <EAGuidePage />}
          </>
        );

      default:
        return (
          <LoginPage
            onSuccess={() => setRoute('app')}
            onNeedPlans={() => setRoute('plans')}
          />
        );
    }
  };

  return (
    <>
      <div className="ambient" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      {renderPage()}
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}