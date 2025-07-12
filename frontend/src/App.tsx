import React from 'react';

const App: React.FC = () => {
  // Русская цветовая палитра
  const russianColors = {
    lightRed: '#FF6B6B',      // Светло-красный фон
    deepRed: '#DC143C',       // Глубокий красный
    gold: '#FFD700',          // Золотой
    darkGold: '#B8860B',      // Темное золото
    white: '#FFFFFF',         // Белый
    cream: '#FFF8DC',         // Кремовый
    crimson: '#8B0000',       // Темно-красный
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${russianColors.lightRed} 0%, ${russianColors.deepRed} 50%, ${russianColors.crimson} 100%)`,
      color: russianColors.white,
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      
      {/* Декоративные русские орнаменты - простые */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '0',
        right: '0',
        textAlign: 'center',
        color: russianColors.gold,
        fontSize: '20px',
        opacity: 0.4,
        zIndex: 1,
        letterSpacing: '10px',
      }}>
        ✦ ✧ ✦ ✧ ✦ ✧ ✦
      </div>

      {/* Нижний орнамент */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '0',
        right: '0',
        textAlign: 'center',
        color: russianColors.gold,
        fontSize: '20px',
        opacity: 0.4,
        zIndex: 1,
        letterSpacing: '10px',
      }}>
        ✧ ✦ ✧ ✦ ✧ ✦ ✧
      </div>

      {/* Боковые орнаменты */}
      <div style={{
        position: 'absolute',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        color: russianColors.gold,
        fontSize: '16px',
        opacity: 0.3,
        zIndex: 1,
      }}>
        ✦ ✧ ✦
      </div>

      <div style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        color: russianColors.gold,
        fontSize: '16px',
        opacity: 0.3,
        zIndex: 1,
      }}>
        ✦ ✧ ✦
      </div>

      {/* Основной контент */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Логотип с декоративной рамкой */}
        <div style={{
          background: `radial-gradient(circle, ${russianColors.gold}22 0%, transparent 70%)`,
          borderRadius: '50%',
          padding: '20px',
          marginBottom: '20px',
          border: `3px solid ${russianColors.gold}`,
          boxShadow: `0 0 30px ${russianColors.gold}44`,
        }}>
          <div style={{
            fontSize: '80px',
            filter: `drop-shadow(0 0 20px ${russianColors.gold})`,
            animation: 'float 3s ease-in-out infinite',
            position: 'relative',
          }}>
            🪆
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '20px',
              fontSize: '40px',
              filter: `drop-shadow(0 0 8px ${russianColors.gold})`,
            }}>
              🕶️
            </div>
          </div>
        </div>

        {/* Название без рамки */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: russianColors.white,
          margin: '0 0 10px 0',
          textShadow: `2px 2px 8px ${russianColors.crimson}, 0 0 20px ${russianColors.gold}44`,
          letterSpacing: '1px',
        }}>
          MatreshkaVPN
        </h1>

        {/* Подзаголовок */}
        <p style={{
          fontSize: '20px',
          color: russianColors.cream,
          marginBottom: '40px',
          fontWeight: '500',
          textShadow: `1px 1px 2px ${russianColors.crimson}`,
        }}>
          🌟 Защита с русской душой 🌟
        </p>

        {/* Статус - компактная версия */}
        <div style={{
          background: `linear-gradient(135deg, ${russianColors.white}dd 0%, ${russianColors.cream}dd 100%)`,
          borderRadius: '12px',
          padding: '20px 30px',
          border: `2px solid ${russianColors.gold}`,
          boxShadow: `0 4px 20px ${russianColors.crimson}33`,
          maxWidth: '320px',
          margin: '0 auto',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '10px',
            filter: `drop-shadow(0 0 8px ${russianColors.gold})`,
          }}>
            🚀
          </div>
          
          <p style={{
            color: russianColors.deepRed,
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 6px 0',
            textShadow: `1px 1px 2px ${russianColors.crimson}44`,
          }}>
            Приложение запущено!
          </p>
          
          <p style={{
            color: russianColors.crimson,
            fontSize: '14px',
            margin: '0',
            fontWeight: '500',
          }}>
            React + TypeScript + Русский стиль
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
          75% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        @keyframes ornamentGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default App;