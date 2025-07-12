import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      path: '/',
      icon: '🏠',
      label: 'Главная',
      activeIcon: '🏠',
    },
    {
      path: '/servers',
      icon: '🌍',
      label: 'Серверы',
      activeIcon: '🌍',
    },
    {
      path: '/subscription',
      icon: '⭐',
      label: 'Premium',
      activeIcon: '⭐',
    },
    {
      path: '/settings',
      icon: '⚙️',
      label: 'Настройки',
      activeIcon: '⚙️',
    },
  ];

  const navigationStyles = {
    container: {
      position: 'fixed' as const,
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(180deg, #8B0000 0%, #DC143C 100%)',
      borderTop: '1px solid rgba(255, 215, 0, 0.2)',
      padding: '12px 20px 20px',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
      zIndex: 100,
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      maxWidth: '400px',
      margin: '0 auto',
      position: 'relative' as const,
    },
    navItem: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '4px',
      padding: '8px 12px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      minWidth: '60px',
    },
    navItemActive: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      boxShadow: '0 0 20px rgba(220, 20, 60, 0.5)',
      transform: 'translateY(-4px)',
    },
    navItemInactive: {
      background: 'transparent',
    },
    icon: {
      fontSize: '20px',
      transition: 'all 0.3s ease',
      filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))',
    },
    iconActive: {
      fontSize: '24px',
      filter: 'drop-shadow(0 0 12px #FFD700)',
      animation: 'bounce 0.6s ease',
    },
    label: {
      fontSize: '11px',
      fontWeight: '500',
      color: '#b0b8c5',
      transition: 'all 0.3s ease',
      textAlign: 'center' as const,
      lineHeight: '1',
    },
    labelActive: {
      color: '#ffffff',
      fontWeight: '600',
      textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
    },
    activeIndicator: {
      position: 'absolute' as const,
      top: '-2px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: '#FFD700',
      boxShadow: '0 0 10px #FFD700',
      animation: 'pulse-indicator 2s infinite',
    },
    ripple: {
      position: 'absolute' as const,
      borderRadius: '50%',
      background: 'rgba(255, 215, 0, 0.3)',
      transform: 'scale(0)',
      animation: 'ripple 0.6s linear',
      pointerEvents: 'none' as const,
    }
  };

  const handleNavigation = (path: string, event: React.MouseEvent) => {
    // Эффект ряби при клике
    const button = event.currentTarget as HTMLElement;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const rippleElement = button.getElementsByClassName('ripple')[0];
    if (rippleElement) {
      rippleElement.remove();
    }
    
    button.appendChild(circle);
    
    // Навигация
    setTimeout(() => {
      navigate(path);
    }, 150);
  };

  return (
    <div style={navigationStyles.container}>
      <nav style={navigationStyles.nav}>
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <div
              key={item.path}
              style={{
                ...navigationStyles.navItem,
                ...(isActive ? navigationStyles.navItemActive : navigationStyles.navItemInactive),
              }}
              onClick={(e) => handleNavigation(item.path, e)}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translateY(0px)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {/* Индикатор активного элемента */}
              {isActive && <div style={navigationStyles.activeIndicator}></div>}
              
              {/* Иконка */}
              <div
                style={{
                  ...navigationStyles.icon,
                  ...(isActive ? navigationStyles.iconActive : {}),
                }}
              >
                {isActive ? item.activeIcon : item.icon}
              </div>
              
              {/* Подпись */}
              <div
                style={{
                  ...navigationStyles.label,
                  ...(isActive ? navigationStyles.labelActive : {}),
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </nav>

      <style>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-8px,0); }
          70% { transform: translate3d(0,-4px,0); }
          90% { transform: translate3d(0,-2px,0); }
        }
        
        @keyframes pulse-indicator {
          0%, 100% { 
            opacity: 1; 
            transform: translateX(-50%) scale(1); 
          }
          50% { 
            opacity: 0.7; 
            transform: translateX(-50%) scale(1.5); 
          }
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 215, 0, 0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Navigation;