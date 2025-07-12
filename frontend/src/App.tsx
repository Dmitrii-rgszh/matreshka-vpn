import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useTelegram } from './hooks/useTelegram';

// Русские цвета и стили
const russianTheme = {
  colors: {
    primary: '#DC143C', // Красный
    secondary: '#FFD700', // Золотой
    background: '#1a1a2e', // Темно-синий
    surface: '#16213e', // Синий
    accent: '#0f3460', // Глубокий синий
    text: '#ffffff',
    textSecondary: '#b0b8c5',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#f44336',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
    secondary: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  }
};

const App: React.FC = () => {
  // const { isReady, user, isDark } = useTelegram();

  // Временная заглушка для тестирования
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      color: '#ffffff',
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
    }}>
      {/* Логотип */}
      <div style={{
        fontSize: '80px',
        marginBottom: '20px',
        filter: 'drop-shadow(0 0 20px #FFD700)',
        animation: 'float 3s ease-in-out infinite',
        position: 'relative',
      }}>
        🪆
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '20px',
          fontSize: '40px',
          filter: 'drop-shadow(0 0 8px #00ff00)',
        }}>
          🕶️
        </div>
      </div>

      {/* Название */}
      <h1 style={{
        fontSize: '48px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '10px',
        textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
      }}>
        РусVPN
      </h1>

      {/* Подзаголовок */}
      <p style={{
        fontSize: '20px',
        color: '#b0b8c5',
        marginBottom: '40px',
        fontWeight: '500',
      }}>
        Защита с душой
      </p>

      {/* Статус */}
      <div style={{
        background: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
        borderRadius: '16px',
        padding: '20px 40px',
        border: '1px solid rgba(255, 215, 0, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{
          fontSize: '24px',
          marginBottom: '10px',
        }}>
          🚀
        </div>
        <p style={{
          color: '#4CAF50',
          fontSize: '18px',
          fontWeight: '600',
          margin: '0',
        }}>
          Приложение успешно запущено!
        </p>
        <p style={{
          color: '#b0b8c5',
          fontSize: '14px',
          margin: '5px 0 0 0',
        }}>
          React + TypeScript + Vite работают
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default App;