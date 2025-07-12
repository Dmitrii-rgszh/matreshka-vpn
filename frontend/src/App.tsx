import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Dashboard from './pages/Dashboard';
import Servers from './pages/Servers';
import Subscription from './pages/Subscription';
import Settings from './pages/Settings';

const App: React.FC = () => {
  const { user, isReady } = useTelegram();

  if (!isReady) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FF6B6B 0%, #DC143C 50%, #8B0000 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '18px'
      }}>
        Загрузка приложения...
      </div>
    );
  }

  const appStyles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FF6B6B 0%, #DC143C 50%, #8B0000 100%)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
      paddingBottom: '80px', // Место для навигации снизу
    },
    main: {
      flex: 1,
      paddingTop: '80px', // Место для хедера сверху
      minHeight: 'calc(100vh - 160px)',
    }
  };

  return (
    <Router>
      <div style={appStyles.container}>
        {/* Хедер */}
        <Header user={user} />
        
        {/* Основной контент */}
        <main style={appStyles.main}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/servers" element={<Servers />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        
        {/* Нижняя навигация */}
        <Navigation />
      </div>
    </Router>
  );
};

export default App;