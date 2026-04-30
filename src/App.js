import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppProvider, useApp } from './context/AppContext';
import { logoutAction } from './store/authSlice';
import Toast from './components/Toast';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import PlansPage from './pages/PlansPage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import EAGuidePage from './pages/EAGuidePage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import LandingPage from './pages/LandingPage';

function AppRouter() {
  const user = useSelector(s => s.auth.user);
  const subscription = useSelector(s => s.auth.subscription);
  const dispatch = useDispatch();
  const { setLogoutCallback } = useApp();

  const wasOnDashboard = localStorage.getItem('rg_session') === 'active';

  const [route, setRoute] = useState(user && subscription && wasOnDashboard ? 'app' : 'landing');
  const [activeTab, setActiveTab] = useState('home');

  // 'trial' intent means user clicked "Try for free" on landing —
  // after login they go straight to plans with trial pre-highlighted
  const [loginIntent, setLoginIntent] = useState(null);

  const goTo = (r) => setRoute(r);

  useEffect(() => {
    setLogoutCallback(() => {
      dispatch(logoutAction());
      localStorage.removeItem('rg_session');
      setRoute('landing');
      setActiveTab('home');
      setLoginIntent(null);
    });
  }, [setLogoutCallback, dispatch]);

  const renderPage = () => {
    switch (route) {

      case 'landing':
        return (
          <LandingPage
            onGetStarted={() => { setLoginIntent(null); setRoute('login'); }}
            onTryFree={() => { setLoginIntent('trial'); setRoute('login'); }}
          />
        );

      case 'login':
        return (
          <LoginPage
            onSuccess={() => goTo('app')}
            onNeedPlans={() => goTo('plans')}
          />
        );

      case 'plans':
        return (
          <PlansPage
            onContinue={() => goTo('payment')}
            // Trial success → directly log user into app
            onTrialSuccess={() => {
              setActiveTab('home');
              goTo('app');
            }}
          />
        );

      case 'payment':
        return (
          <PaymentPage
            onBack={() => goTo('plans')}
            onSuccess={() => goTo('success')}
          />
        );

      case 'success':
        return (
          <SuccessPage
            onDashboard={() => { setActiveTab('home'); goTo('app'); }}
          />
        );

      case 'app':
        return (
          <>
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'home' && (
              <DashboardPage
                onGoGuide={() => setActiveTab('guide')}
                onSubscriptionExpired={() => {
                  localStorage.removeItem('rg_session');
                  goTo('plans');
                }}
              />
            )}
            {activeTab === 'rules'   && <SettingsPage />}
            {activeTab === 'guide'   && <EAGuidePage />}
            {activeTab === 'contact' && <ContactPage />}
            {activeTab === 'terms'   && <TermsPage />}
          </>
        );

      default:
        return (
          <LoginPage
            onSuccess={() => goTo('app')}
            onNeedPlans={() => goTo('plans')}
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