import React from 'react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  isProcessing?: boolean;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose, onUpgrade, isProcessing = false }) => {
  if (!isOpen) return null;
  
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const modalStyles = {
    overlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      animation: 'modalFadeIn 0.3s ease-out',
    },
    modal: {
      background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
      borderRadius: '20px',
      border: '2px solid #FFD700',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.3)',
      maxWidth: '350px',
      width: '100%',
      overflow: 'hidden',
      position: 'relative' as const,
      animation: 'modalSlideUp 0.4s ease-out',
    },
    header: {
      textAlign: 'center' as const,
      padding: '30px 20px 20px',
      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 100%)',
    },
    crownIcon: {
      fontSize: '60px',
      marginBottom: '15px',
      filter: 'drop-shadow(0 0 20px #FFD700)',
      animation: 'crownFloat 2s ease-in-out infinite',
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#FFD700',
      marginBottom: '8px',
      textShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
    },
    subtitle: {
      fontSize: '14px',
      color: '#FFF8DC',
      opacity: 0.9,
    },
    content: {
      padding: '20px',
    },
    message: {
      fontSize: '16px',
      color: '#ffffff',
      textAlign: 'center' as const,
      marginBottom: '25px',
      lineHeight: '1.5',
    },
    features: {
      marginBottom: '25px',
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px',
      padding: '8px 0',
    },
    featureIcon: {
      fontSize: '20px',
      filter: 'drop-shadow(0 0 8px #FFD700)',
    },
    featureText: {
      fontSize: '14px',
      color: '#ffffff',
      fontWeight: '500',
    },
    pricing: {
      background: 'rgba(255, 215, 0, 0.1)',
      borderRadius: '12px',
      padding: '15px',
      marginBottom: '25px',
      border: '1px solid rgba(255, 215, 0, 0.3)',
    },
    priceRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    priceLabel: {
      fontSize: '14px',
      color: '#FFD700',
    },
    priceValue: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#ffffff',
    },
    discount: {
      fontSize: '12px',
      color: '#4CAF50',
      fontWeight: '600',
      textAlign: 'right' as const,
    },
    buttons: {
      display: 'flex',
      gap: '10px',
    },
    button: {
      flex: 1,
      padding: '12px 16px',
      borderRadius: '12px',
      border: 'none',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    upgradeButton: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      color: '#8B0000',
      boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
    },
    cancelButton: {
      background: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    closeButton: {
      position: 'absolute' as const,
      top: '15px',
      right: '15px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      borderRadius: '50%',
      width: '35px',
      height: '35px',
      color: '#ffffff',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
    sparkles: {
      position: 'absolute' as const,
      top: '10px',
      left: '10px',
      right: '10px',
      bottom: '10px',
      pointerEvents: 'none' as const,
      opacity: 0.1,
      background: 'radial-gradient(circle at 20% 20%, #FFD700 2px, transparent 2px), radial-gradient(circle at 80% 80%, #FFD700 1px, transparent 1px), radial-gradient(circle at 60% 30%, #FFD700 1px, transparent 1px)',
      backgroundSize: '40px 40px, 30px 30px, 50px 50px',
      animation: 'sparkleMove 10s linear infinite',
    }
  };

  const features = [
    { icon: '🌍', text: 'Все серверы по всему миру' },
    { icon: '⚡', text: 'Безлимитный трафик' },
    { icon: '🚀', text: 'Максимальная скорость' },
    { icon: '🛡️', text: 'Приоритетная поддержка' },
  ];

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Блестки */}
        <div style={modalStyles.sparkles}></div>
        
        {/* Кнопка закрытия */}
        <button 
          style={modalStyles.closeButton}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          ✕
        </button>
        
        {/* Заголовок */}
        <div style={modalStyles.header}>
          <div style={modalStyles.crownIcon}>👑</div>
          <h2 style={modalStyles.title}>Премиум доступ</h2>
          <p style={modalStyles.subtitle}>Открой все возможности MatreshkaVPN</p>
        </div>
        
        {/* Контент */}
        <div style={modalStyles.content}>
          <p style={modalStyles.message}>
            Этот сервер доступен только для Premium пользователей
          </p>
          
          {/* Функции */}
          <div style={modalStyles.features}>
            {features.map((feature, index) => (
              <div key={index} style={modalStyles.feature}>
                <span style={modalStyles.featureIcon}>{feature.icon}</span>
                <span style={modalStyles.featureText}>{feature.text}</span>
              </div>
            ))}
          </div>
          
          {/* Цены */}
          <div style={modalStyles.pricing}>
            <div style={modalStyles.priceRow}>
              <span style={modalStyles.priceLabel}>1 месяц:</span>
              <span style={modalStyles.priceValue}>59₽</span>
            </div>
            <div style={modalStyles.priceRow}>
              <span style={modalStyles.priceLabel}>1 год:</span>
              <span style={modalStyles.priceValue}>499₽</span>
            </div>
            <div style={modalStyles.discount}>
              Экономия 209₽ (30%)
            </div>
          </div>
          
          {/* Кнопки */}
          <div style={modalStyles.buttons}>
            <button
              style={{ ...modalStyles.button, ...modalStyles.cancelButton }}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Отмена
            </button>
            <button
              style={{ 
                ...modalStyles.button, 
                ...modalStyles.upgradeButton,
                opacity: isProcessing ? 0.7 : 1,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
              }}
              onClick={onUpgrade}
              disabled={isProcessing}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.4)';
                }
              }}
            >
              {isProcessing ? '⏳ Обработка...' : 'Получить Premium 👑'}
            </button>
          </div>
        </div>
        
        <style>{`
          @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes modalSlideUp {
            from { 
              opacity: 0; 
              transform: translateY(50px) scale(0.9); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0px) scale(1); 
            }
          }
          
          @keyframes crownFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
          }
          
          @keyframes sparkleMove {
            0% { background-position: 0px 0px, 0px 0px, 0px 0px; }
            100% { background-position: 40px 40px, -30px -30px, 50px 50px; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PremiumModal;