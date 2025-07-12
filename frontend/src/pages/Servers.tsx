// frontend/src/pages/Servers.tsx
import React from 'react';

const Servers: React.FC = () => {
  const pageStyles = {
    container: {
      padding: '20px',
      maxWidth: '400px',
      margin: '0 auto',
      textAlign: 'center' as const,
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '20px',
    },
    placeholder: {
      background: 'linear-gradient(135deg, #16213e 0%, #0f3460 100%)',
      borderRadius: '16px',
      padding: '40px 20px',
      border: '1px solid rgba(255, 215, 0, 0.2)',
    },
    icon: {
      fontSize: '64px',
      marginBottom: '16px',
      filter: 'drop-shadow(0 0 20px #FFD700)',
    },
    text: {
      color: '#b0b8c5',
      fontSize: '16px',
    }
  };

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.title}>Серверы</h1>
      <div style={pageStyles.placeholder}>
        <div style={pageStyles.icon}>🌍</div>
        <p style={pageStyles.text}>Список серверов будет здесь</p>
      </div>
    </div>
  );
};

export default Servers;