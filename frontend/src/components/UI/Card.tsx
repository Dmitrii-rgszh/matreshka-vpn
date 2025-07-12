import React from 'react';

interface CardProps {
  title: string;
  icon: string;
  value: string;
  color: string;
  subtitle?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  title, 
  icon, 
  value, 
  color, 
  subtitle, 
  onClick 
}) => {
  const cardStyles = {
    card: {
      background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden',
      minHeight: '100px',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'space-between',
    },
    cardHover: {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px ${color}33`,
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px',
    },
    icon: {
      fontSize: '20px',
      filter: `drop-shadow(0 0 8px ${color})`,
    },
    title: {
      fontSize: '12px',
      color: '#b0b8c5',
      fontWeight: '500',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    },
    value: {
      fontSize: '16px',
      fontWeight: '700',
      color: color,
      marginBottom: '4px',
      lineHeight: '1.2',
      textShadow: `0 0 10px ${color}33`,
    },
    subtitle: {
      fontSize: '11px',
      color: '#8a92a5',
      fontWeight: '400',
    },
    glowLine: {
      position: 'absolute' as const,
      top: '0',
      left: '0',
      right: '0',
      height: '2px',
      background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
      opacity: 0.8,
    },
    shimmer: {
      position: 'absolute' as const,
      top: '0',
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
      animation: 'shimmer 3s infinite',
    }
  };

  return (
    <div 
      style={cardStyles.card}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          Object.assign(e.currentTarget.style, cardStyles.cardHover);
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0px)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
      }}
    >
      {/* Светящаяся линия сверху */}
      <div style={cardStyles.glowLine}></div>
      
      {/* Эффект блеска */}
      <div style={cardStyles.shimmer}></div>
      
      {/* Иконка и заголовок */}
      <div style={cardStyles.iconContainer}>
        <span style={cardStyles.title}>{title}</span>
        <span style={cardStyles.icon}>{icon}</span>
      </div>
      
      {/* Основное значение */}
      <div style={cardStyles.value}>
        {value}
      </div>
      
      {/* Подзаголовок (опционально) */}
      {subtitle && (
        <div style={cardStyles.subtitle}>
          {subtitle}
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Card;