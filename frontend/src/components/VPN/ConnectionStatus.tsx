import React from 'react';

interface ConnectionStatusProps {
  isConnected: boolean;
  currentServer: string | null;
  connectionTime: number;
  userIP: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isConnected,
  currentServer,
  connectionTime,
  userIP
}) => {
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const statusStyles = {
    container: {
      background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      background: isConnected 
        ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
        : 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
      color: '#ffffff',
      boxShadow: isConnected
        ? '0 0 15px rgba(76, 175, 80, 0.5)'
        : '0 0 15px rgba(244, 67, 54, 0.5)',
    },
    infoGrid: {
      display: 'grid',
      gap: '12px',
    },
    infoRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    },
    infoLabel: {
      fontSize: '14px',
      color: '#b0b8c5',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    infoValue: {
      fontSize: '14px',
      color: '#ffffff',
      fontWeight: '600',
    },
    protectionLevel: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      borderRadius: '12px',
      padding: '16px',
      marginTop: '16px',
      textAlign: 'center' as const,
      border: '1px solid rgba(255, 215, 0, 0.3)',
    },
    protectionText: {
      fontSize: '14px',
      color: '#1a1a2e',
      fontWeight: '600',
      margin: '0',
    },
    matreshkaIcon: {
      fontSize: '24px',
      filter: 'drop-shadow(0 0 8px #FFD700)',
      animation: isConnected ? 'glow 2s ease-in-out infinite alternate' : 'none',
    },
    pulsingDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: isConnected ? '#4CAF50' : '#f44336',
      display: 'inline-block',
      marginRight: '8px',
      animation: isConnected ? 'pulse-dot 1.5s infinite' : 'none',
      boxShadow: isConnected 
        ? '0 0 10px #4CAF50'
        : '0 0 10px #f44336',
    }
  };

  const getProtectionMessage = () => {
    if (!isConnected) {
      return "🚫 Ваше соединение не защищено";
    }
    return "🛡️ Ваше соединение надежно защищено русской криптографией";
  };

  return (
    <div style={statusStyles.container}>
      {/* Заголовок с бейджем статуса */}
      <div style={statusStyles.header}>
        <div style={statusStyles.title}>
          <span style={statusStyles.matreshkaIcon}>🪆</span>
          Статус соединения
        </div>
        <div style={statusStyles.statusBadge}>
          <span style={statusStyles.pulsingDot}></span>
          {isConnected ? 'Подключено' : 'Отключено'}
        </div>
      </div>

      {/* Информация о соединении */}
      <div style={statusStyles.infoGrid}>
        <div style={statusStyles.infoRow}>
          <div style={statusStyles.infoLabel}>
            🌍 Сервер
          </div>
          <div style={statusStyles.infoValue}>
            {currentServer || 'Не выбран'}
          </div>
        </div>

        <div style={statusStyles.infoRow}>
          <div style={statusStyles.infoLabel}>
            📍 Ваш IP адрес
          </div>
          <div style={statusStyles.infoValue}>
            {userIP}
          </div>
        </div>

        <div style={statusStyles.infoRow}>
          <div style={statusStyles.infoLabel}>
            ⏱️ Время соединения
          </div>
          <div style={statusStyles.infoValue}>
            {formatTime(connectionTime)}
          </div>
        </div>

        <div style={statusStyles.infoRow}>
          <div style={statusStyles.infoLabel}>
            🔒 Протокол
          </div>
          <div style={statusStyles.infoValue}>
            {isConnected ? 'WireGuard' : 'Не активен'}
          </div>
        </div>
      </div>

      {/* Уровень защиты */}
      <div style={statusStyles.protectionLevel}>
        <p style={statusStyles.protectionText}>
          {getProtectionMessage()}
        </p>
      </div>

      <style>{`
        @keyframes glow {
          0% { filter: drop-shadow(0 0 8px #FFD700); }
          100% { filter: drop-shadow(0 0 16px #FFD700) drop-shadow(0 0 24px #FFD700); }
        }
        
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default ConnectionStatus;