import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = '#FFD700',
  message 
}) => {
  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return { width: '24px', height: '24px', border: '2px solid' };
      case 'large':
        return { width: '64px', height: '64px', border: '4px solid' };
      default:
        return { width: '40px', height: '40px', border: '3px solid' };
    }
  };

  const sizeStyles = getSizeStyles(size);

  const spinnerStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    },
    spinnerWrapper: {
      position: 'relative' as const,
      display: 'inline-block',
    },
    spinner: {
      ...sizeStyles,
      borderColor: `${color}33`,
      borderTopColor: color,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    innerSpinner: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: `${parseInt(sizeStyles.width) * 0.6}px`,
      height: `${parseInt(sizeStyles.height) * 0.6}px`,
      border: `${parseInt(sizeStyles.border.split(' ')[0]) - 1}px solid`,
      borderColor: 'transparent',
      borderTopColor: '#DC143C',
      borderRadius: '50%',
      animation: 'spin-reverse 0.8s linear infinite',
    },
    matreshka: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: size === 'small' ? '12px' : size === 'large' ? '24px' : '16px',
      filter: `drop-shadow(0 0 8px ${color})`,
      animation: 'float 2s ease-in-out infinite',
    },
    message: {
      color: '#b0b8c5',
      fontSize: '14px',
      fontWeight: '500',
      textAlign: 'center' as const,
      maxWidth: '200px',
      lineHeight: '1.4',
    },
    glowRing: {
      position: 'absolute' as const,
      top: '-4px',
      left: '-4px',
      right: '-4px',
      bottom: '-4px',
      borderRadius: '50%',
      border: `1px solid ${color}`,
      opacity: 0.3,
      animation: 'pulse-ring 2s infinite',
    }
  };

  return (
    <div style={spinnerStyles.container}>
      <div style={spinnerStyles.spinnerWrapper}>
        {/* Внешнее светящееся кольцо */}
        <div style={spinnerStyles.glowRing}></div>
        
        {/* Основной спиннер */}
        <div style={spinnerStyles.spinner}></div>
        
        {/* Внутренний спиннер */}
        <div style={spinnerStyles.innerSpinner}></div>
        
        {/* Матрешка в центре */}
        <div style={spinnerStyles.matreshka}>🪆</div>
      </div>
      
      {message && (
        <div style={spinnerStyles.message}>
          {message}
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          0% { transform: translate(-50%, -50%) rotate(360deg); }
          100% { transform: translate(-50%, -50%) rotate(0deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-2px); }
        }
        
        @keyframes pulse-ring {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.3; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.1; 
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;