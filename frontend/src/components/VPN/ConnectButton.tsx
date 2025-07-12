import React from 'react';

interface ConnectButtonProps {
  isConnected: boolean;
  isConnecting: boolean;
  onConnect: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ 
  isConnected, 
  isConnecting, 
  onConnect 
}) => {
  const buttonStyles = {
    container: {
      position: 'relative' as const,
      display: 'inline-block',
    },
    button: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      border: 'none',
      cursor: isConnecting ? 'not-allowed' : 'pointer',
      position: 'relative' as const,
      background: isConnected 
        ? 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)'
        : 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
      boxShadow: isConnected
        ? '0 0 30px rgba(76, 175, 80, 0.5), 0 0 60px rgba(76, 175, 80, 0.3)'
        : '0 0 30px rgba(220, 20, 60, 0.5), 0 0 60px rgba(220, 20, 60, 0.3)',
      transition: 'all 0.3s ease',
      transform: isConnecting ? 'scale(0.95)' : 'scale(1)',
      opacity: isConnecting ? 0.8 : 1,
    },
    innerCircle: {
      position: 'absolute' as const,
      top: '15px',
      left: '15px',
      right: '15px',
      bottom: '15px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    },
    icon: {
      fontSize: '48px',
      marginBottom: '8px',
      filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
      animation: isConnecting ? 'spin 1s linear infinite' : 'none',
    },
    text: {
      color: '#ffffff',
      fontSize: '16px',
      fontWeight: '600',
      textAlign: 'center' as const,
      lineHeight: '1.2',
    },
    pulseRing: {
      position: 'absolute' as const,
      top: '-10px',
      left: '-10px',
      right: '-10px',
      bottom: '-10px',
      borderRadius: '50%',
      border: `3px solid ${isConnected ? '#4CAF50' : '#DC143C'}`,
      opacity: isConnected ? 0.6 : 0,
      animation: isConnected ? 'pulse 2s infinite' : 'none',
    },
    loadingRing: {
      position: 'absolute' as const,
      top: '-5px',
      left: '-5px',
      right: '-5px',
      bottom: '-5px',
      borderRadius: '50%',
      border: '3px solid transparent',
      borderTop: '3px solid #FFD700',
      animation: isConnecting ? 'spin 1s linear infinite' : 'none',
    }
  };

  const getButtonContent = () => {
    if (isConnecting) {
      return {
        icon: '⚡',
        text: 'Подключение...'
      };
    }
    
    if (isConnected) {
      return {
        icon: '🛡️',
        text: 'Отключить\nVPN'
      };
    }
    
    return {
      icon: '🚀',
      text: 'Подключить\nVPN'
    };
  };

  const content = getButtonContent();

  return (
    <div style={buttonStyles.container}>
      <button 
        style={buttonStyles.button}
        onClick={onConnect}
        disabled={isConnecting}
      >
        {/* Пульсирующее кольцо для подключенного состояния */}
        <div style={buttonStyles.pulseRing}></div>
        
        {/* Кольцо загрузки */}
        {isConnecting && <div style={buttonStyles.loadingRing}></div>}
        
        {/* Внутренний круг */}
        <div style={buttonStyles.innerCircle}>
          <div style={buttonStyles.icon}>
            {content.icon}
          </div>
          <div style={buttonStyles.text}>
            {content.text}
          </div>
        </div>
      </button>

      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        button:hover {
          transform: scale(1.05) !important;
        }
        
        button:active {
          transform: scale(0.95) !important;
        }
      `}</style>
    </div>
  );
};

export default ConnectButton;