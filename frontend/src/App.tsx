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
      
      {/* Декоративные русские орнаменты */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '80px',
        background: `url("data:image/svg+xml,${encodeURIComponent(`
          <svg viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="russianPattern" x="0" y="0" width="100" height="80" patternUnits="userSpaceOnUse">
                <!-- Хохлома орнамент -->
                <path d="M10,40 Q30,20 50,40 Q70,60 90,40" stroke="${russianColors.gold}" stroke-width="3" fill="none"/>
                <circle cx="20" cy="35" r="4" fill="${russianColors.gold}"/>
                <circle cx="50" cy="45" r="3" fill="${russianColors.darkGold}"/>
                <circle cx="80" cy="35" r="4" fill="${russianColors.gold}"/>
                <!-- Листья -->
                <path d="M15,30 Q20,25 25,30 Q20,35 15,30" fill="${russianColors.gold}" opacity="0.8"/>
                <path d="M75,45 Q80,40 85,45 Q80,50 75,45" fill="${russianColors.gold}" opacity="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#russianPattern)"/>
          </svg>
        `)}")`,
        backgroundSize: 'cover',
        opacity: 0.3,
        zIndex: 1,
      }} />

      {/* Нижний орнамент */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '80px',
        background: `url("data:image/svg+xml,${encodeURIComponent(`
          <svg viewBox="0 0 400 80" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="russianPatternBottom" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse">
                <!-- Гжель мотивы -->
                <path d="M20,50 Q40,30 60,50 Q80,70 100,50" stroke="${russianColors.gold}" stroke-width="2" fill="none"/>
                <circle cx="30" cy="45" r="5" fill="none" stroke="${russianColors.gold}" stroke-width="2"/>
                <circle cx="70" cy="55" r="3" fill="${russianColors.gold}"/>
                <path d="M90,40 L95,35 L100,40 L95,45 Z" fill="${russianColors.darkGold}"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#russianPatternBottom)"/>
          </svg>
        `)}")`,
        backgroundSize: 'cover',
        opacity: 0.3,
        transform: 'rotate(180deg)',
        zIndex: 1,
      }} />

      {/* Боковые орнаменты */}
      <div style={{
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        width: '200px',
        height: '60px',
        background: `url("data:image/svg+xml,${encodeURIComponent(`
          <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,30 Q60,10 100,30 Q140,50 180,30" stroke="${russianColors.gold}" stroke-width="2" fill="none" opacity="0.4"/>
            <circle cx="40" cy="25" r="3" fill="${russianColors.gold}" opacity="0.6"/>
            <circle cx="100" cy="35" r="4" fill="${russianColors.gold}" opacity="0.6"/>
            <circle cx="160" cy="25" r="3" fill="${russianColors.gold}" opacity="0.6"/>
          </svg>
        `)}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
      }} />

      <div style={{
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        width: '200px',
        height: '60px',
        background: `url("data:image/svg+xml,${encodeURIComponent(`
          <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,30 Q60,10 100,30 Q140,50 180,30" stroke="${russianColors.gold}" stroke-width="2" fill="none" opacity="0.4"/>
            <circle cx="40" cy="25" r="3" fill="${russianColors.gold}" opacity="0.6"/>
            <circle cx="100" cy="35" r="4" fill="${russianColors.gold}" opacity="0.6"/>
            <circle cx="160" cy="25" r="3" fill="${russianColors.gold}" opacity="0.6"/>
          </svg>
        `)}")`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        zIndex: 1,
      }} />

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