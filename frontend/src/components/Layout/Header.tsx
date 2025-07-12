import React from 'react';
import { WebAppUser } from '../../telegram';

interface HeaderProps {
  user: WebAppUser | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const headerStyles = {
    header: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderBottom: '1px solid rgba(255, 215, 0, 0.2)',
      padding: '16px 20px',
      position: 'sticky' as const,
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '400px',
      margin: '0 auto',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    matreshkaContainer: {
      position: 'relative' as const,
      display: 'inline-block',
    },
    matreshka: {
      fontSize: '32px',
      filter: 'drop-shadow(0 0 12px #FFD700)',
      animation: 'float 3s ease-in-out infinite',
    },
    neoGlasses: {
      position: 'absolute' as const,
      top: '2px',
      left: '6px',
      fontSize: '20px',
      filter: 'drop-shadow(0 0 8px #00ff00)',
      animation: 'matrix-glow 2s ease-in-out infinite alternate',
    },
    appInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2px',
    },
    appName: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#ffffff',
      textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
      letterSpacing: '0.5px',
    },
    appSubtitle: {
      fontSize: '12px',
      color: '#FFD700',
      fontWeight: '500',
      textTransform: 'uppercase' as const,
      letterSpacing: '1px',
    },
    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    userAvatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      color: '#ffffff',
      fontWeight: '600',
      border: '2px solid rgba(255, 215, 0, 0.3)',
      boxShadow: '0 0 15px rgba(220, 20, 60, 0.3)',
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2px',
    },
    userName: {
      fontSize: '14px',
      color: '#ffffff',
      fontWeight: '600',
      lineHeight: '1',
    },
    userStatus: {
      fontSize: '11px',
      color: '#b0b8c5',
      fontWeight: '400',
      lineHeight: '1',
    },
    premiumBadge: {
      padding: '2px 6px',
      borderRadius: '8px',
      fontSize: '10px',
      fontWeight: '600',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      color: '#1a1a2e',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
    },
    matrixEffect: {
      position: 'absolute' as const,
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 0, 0.05) 50%, transparent 100%)',
      animation: 'matrix-sweep 4s linear infinite',
      pointerEvents: 'none' as const,
    }
  };

  const getUserInitials = (user: WebAppUser): string => {
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || '👤';
  };

  const getUserStatus = (user: WebAppUser): string => {
    if (user.is_premium) return 'Premium пользователь';
    return 'Freemium пользователь';
  };

  return (
    <header style={headerStyles.header}>
      {/* Эффект Матрицы */}
      <div style={headerStyles.matrixEffect}></div>
      
      <div style={headerStyles.container}>
        {/* Логотип и название */}
        <div style={headerStyles.logoSection}>
          <div style={headerStyles.matreshkaContainer}>
            <div style={headerStyles.matreshka}>🪆</div>
            <div style={headerStyles.neoGlasses}>🕶️</div>
          </div>
          
          <div style={headerStyles.appInfo}>
            <div style={headerStyles.appName}>
              РусVPN
            </div>
            <div style={headerStyles.appSubtitle}>
              Защита с душой
            </div>
          </div>
        </div>

        {/* Информация о пользователе */}
        {user && (
          <div style={headerStyles.userSection}>
            <div style={headerStyles.userInfo}>
              <div style={headerStyles.userName}>
                {user.first_name}
              </div>
              <div style={headerStyles.userStatus}>
                {getUserStatus(user)}
              </div>
              {user.is_premium && (
                <div style={headerStyles.premiumBadge}>
                  Premium ⭐
                </div>
              )}
            </div>
            
            <div style={headerStyles.userAvatar}>
              {user.photo_url ? (
                <img 
                  src={user.photo_url} 
                  alt="Avatar" 
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                getUserInitials(user)
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes matrix-glow {
          0% { 
            filter: drop-shadow(0 0 8px #00ff00);
            transform: scale(1);
          }
          100% { 
            filter: drop-shadow(0 0 16px #00ff00) drop-shadow(0 0 24px #00ff00);
            transform: scale(1.1);
          }
        }
        
        @keyframes matrix-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </header>
  );
};

export default Header;