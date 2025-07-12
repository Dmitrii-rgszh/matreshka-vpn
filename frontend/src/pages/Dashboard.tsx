import React, { useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import ConnectButton from '../components/VPN/ConnectButton';
import ConnectionStatus from '../components/VPN/ConnectionStatus';
import Card from '../components/UI/Card';

const Dashboard: React.FC = () => {
  const { user, hapticFeedback } = useTelegram();
  const [isConnected, setIsConnected] = useState(false);
  const [currentServer, setCurrentServer] = useState<string | null>(null);
  const [userIP, setUserIP] = useState<string>('');
  const [connectionTime, setConnectionTime] = useState<number>(0);
  const [isConnecting, setIsConnecting] = useState(false);

  // Имитация получения IP адреса
  useEffect(() => {
    // В реальном приложении здесь будет API запрос
    setUserIP('192.168.1.1');
  }, []);

  // Таймер подключения
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnect = async () => {
    hapticFeedback('medium');
    setIsConnecting(true);
    
    try {
      // Имитация подключения
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (!isConnected) {
        setIsConnected(true);
        setCurrentServer('Москва #1');
        setConnectionTime(0);
        hapticFeedback('success');
      } else {
        setIsConnected(false);
        setCurrentServer(null);
        setConnectionTime(0);
        hapticFeedback('success');
      }
    } catch (error) {
      hapticFeedback('error');
    } finally {
      setIsConnecting(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const russianStyles = {
    container: {
      padding: '20px',
      maxWidth: '400px',
      margin: '0 auto',
    },
    welcomeCard: {
      background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
      padding: '20px',
      borderRadius: '16px',
      marginBottom: '20px',
      textAlign: 'center' as const,
      boxShadow: '0 8px 32px rgba(220, 20, 60, 0.3)',
      border: '1px solid rgba(255, 215, 0, 0.2)',
    },
    matreshkaIcon: {
      fontSize: '48px',
      marginBottom: '10px',
      filter: 'drop-shadow(0 0 10px #FFD700)',
      animation: 'float 3s ease-in-out infinite',
    },
    welcomeText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '8px',
    },
    userName: {
      fontSize: '16px',
      color: '#FFD700',
      fontWeight: '500',
    },
    statusGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '30px',
    },
    connectSection: {
      textAlign: 'center' as const,
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '20px',
      textAlign: 'center' as const,
    },
    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
  };

  return (
    <div style={russianStyles.container}>
      {/* Приветствие */}
      <div style={russianStyles.welcomeCard}>
        <div style={russianStyles.matreshkaIcon}>🪆</div>
        <div style={russianStyles.welcomeText}>
          Добро пожаловать!
        </div>
        {user && (
          <div style={russianStyles.userName}>
            {user.first_name} {user.last_name || ''}
          </div>
        )}
      </div>

      {/* Статус подключения */}
      <div style={russianStyles.statusGrid}>
        <Card 
          title="Статус"
          icon="🔒"
          value={isConnected ? 'Защищено' : 'Не защищено'}
          color={isConnected ? '#4CAF50' : '#f44336'}
        />
        <Card 
          title="Сервер"
          icon="🌍"
          value={currentServer || 'Не выбран'}
          color="#FFD700"
        />
        <Card 
          title="Ваш IP"
          icon="📍"
          value={userIP}
          color="#2196F3"
        />
        <Card 
          title="Время"
          icon="⏱️"
          value={isConnected ? formatTime(connectionTime) : '00:00:00'}
          color="#9C27B0"
        />
      </div>

      {/* Кнопка подключения */}
      <div style={russianStyles.connectSection}>
        <h2 style={russianStyles.sectionTitle}>VPN Подключение</h2>
        <ConnectButton 
          isConnected={isConnected}
          isConnecting={isConnecting}
          onConnect={handleConnect}
        />
      </div>

      {/* Детальный статус */}
      <ConnectionStatus 
        isConnected={isConnected}
        currentServer={currentServer}
        connectionTime={connectionTime}
        userIP={userIP}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;