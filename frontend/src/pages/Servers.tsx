import React, { useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import { useApi } from '../hooks/useApi';
import PremiumModal from '../components/UI/PremiumModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';

interface Server {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
  isPremium: boolean;
  isRecommended?: boolean;
}

const Servers: React.FC = () => {
  const { hapticFeedback } = useTelegram();  
  const { getServers, connectToServer, loading, error } = useApi();
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const [servers, setServers] = useState<Server[]>([]);
  const [connecting, setConnecting] = useState(false);

  // Загружаем серверы при монтировании компонента
  useEffect(() => {
    const loadServers = async () => {
      const response = await getServers();
      if (response?.servers) {
        setServers(response.servers);
        // Выбираем рекомендуемый сервер по умолчанию
        const recommended = response.servers.find(s => s.isRecommended && !s.isPremium);
        if (recommended) {
          setSelectedServer(recommended.id);
        }
      }
    };

    loadServers();
  }, []);

  const handleServerSelect = async (serverId: string, isPremium: boolean) => {
    if (isPremium) {
      hapticFeedback('error');
      setShowPremiumModal(true);
      return;
    }

    setConnecting(true);
    hapticFeedback('light');
    
    try {
      const response = await connectToServer(serverId);
      if (response?.success) {
        setSelectedServer(serverId);
        hapticFeedback('success');
      } else {
        hapticFeedback('error');
      }
    } catch (error) {
      hapticFeedback('error');
      console.error('Connection failed:', error);
    } finally {
      setConnecting(false);
    }
  };

  const handleUpgrade = () => {
    hapticFeedback('success');
    setShowPremiumModal(false);
    // Переход на страницу подписки
    window.location.hash = '/subscription';
  };

  const getLoadColor = (load: number) => {
    if (load < 30) return '#4CAF50';
    if (load < 70) return '#FFD700';
    return '#f44336';
  };

  const getPingColor = (ping: number) => {
    if (ping < 50) return '#4CAF50';
    if (ping < 100) return '#FFD700';
    return '#f44336';
  };

  const pageStyles = {
    container: {
      padding: '20px',
      maxWidth: '400px',
      margin: '0 auto',
      paddingBottom: '20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '8px',
      textAlign: 'center' as const,
      textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
    },
    subtitle: {
      fontSize: '14px',
      color: '#FFD700',
      textAlign: 'center' as const,
      marginBottom: '20px',
      opacity: 0.8,
    },
    serverCard: {
      background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '12px',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    serverCardSelected: {
      border: '2px solid #FFD700',
      boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)',
      transform: 'translateY(-2px)',
    },
    serverCardPremium: {
      opacity: 0.6,
      background: 'linear-gradient(135deg, #444 0%, #666 100%)',
    },
    serverHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    serverInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    flag: {
      fontSize: '24px',
      filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))',
    },
    serverName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '4px',
    },
    serverLocation: {
      fontSize: '12px',
      color: '#FFD700',
      opacity: 0.8,
    },
    badges: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '4px',
      alignItems: 'flex-end',
    },
    badge: {
      padding: '2px 8px',
      borderRadius: '8px',
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
    },
    recommendedBadge: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      color: '#8B0000',
    },
    premiumBadge: {
      background: 'linear-gradient(135deg, #9C27B0 0%, #673AB7 100%)',
      color: '#ffffff',
    },
    selectedBadge: {
      background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
      color: '#ffffff',
    },
    serverStats: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
    },
    stat: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    statIcon: {
      fontSize: '14px',
    },
    statLabel: {
      fontSize: '12px',
      color: '#b0b8c5',
    },
    statValue: {
      fontSize: '12px',
      fontWeight: '600',
      marginLeft: 'auto',
    },
    premiumOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '16px',
    },
    lockIcon: {
      fontSize: '32px',
      filter: 'drop-shadow(0 0 8px rgba(156, 39, 176, 0.8))',
    },
  };

  if (loading && servers.length === 0) {
    return (
      <div style={pageStyles.container}>
        <LoadingSpinner size="large" message="Загрузка серверов..." />
      </div>
    );
  }

  // Показываем ошибку
  if (error) {
    return (
      <div style={pageStyles.container}>
        <h1 style={pageStyles.title}>❌ Ошибка подключения</h1>
        <p style={{ textAlign: 'center', color: '#ff6b6b', marginBottom: '20px' }}>
          Не удается подключиться к серверу
        </p>
        <p style={{ textAlign: 'center', color: '#b0b8c5', fontSize: '14px' }}>
          Проверьте, что бэкенд запущен на порту 8000
        </p>
      </div>
    );
  }

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.title}>🌍 Серверы</h1>
      <p style={pageStyles.subtitle}>
        Выберите оптимальный сервер для подключения
      </p>
      
      {servers.map((server) => {
        const isSelected = selectedServer === server.id;
        
        return (
          <div
            key={server.id}
            onClick={() => !connecting && handleServerSelect(server.id, server.isPremium)}
            style={{
              ...pageStyles.serverCard,
              ...(isSelected ? pageStyles.serverCardSelected : {}),
              ...(server.isPremium ? pageStyles.serverCardPremium : {}),
              ...(connecting ? { opacity: 0.7, cursor: 'not-allowed' } : {}),
            }}
            onMouseEnter={(e) => {
              if (!server.isPremium) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected && !server.isPremium) {
                e.currentTarget.style.transform = 'translateY(0px)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
              }
            }}
          >
            {/* Заголовок сервера */}
            <div style={pageStyles.serverHeader}>
              <div style={pageStyles.serverInfo}>
                <div style={pageStyles.flag}>{server.flag}</div>
                <div>
                  <div style={pageStyles.serverName}>{server.name}</div>
                  <div style={pageStyles.serverLocation}>
                    {server.city}, {server.country}
                  </div>
                </div>
              </div>
              
              <div style={pageStyles.badges}>
                {server.isRecommended && (
                  <div style={{ ...pageStyles.badge, ...pageStyles.recommendedBadge }}>
                    ⭐ Рекомендуем
                  </div>
                )}
                {server.isPremium && (
                  <div style={{ ...pageStyles.badge, ...pageStyles.premiumBadge }}>
                    👑 Premium
                  </div>
                )}
                {isSelected && !server.isPremium && (
                  <div style={{ ...pageStyles.badge, ...pageStyles.selectedBadge }}>
                    ✓ Выбран
                  </div>
                )}
              </div>
            </div>
            
            {/* Статистика сервера */}
            <div style={pageStyles.serverStats}>
              <div style={pageStyles.stat}>
                <span style={pageStyles.statIcon}>📶</span>
                <span style={pageStyles.statLabel}>Пинг:</span>
                <span 
                  style={{ 
                    ...pageStyles.statValue, 
                    color: getPingColor(server.ping) 
                  }}
                >
                  {server.ping}ms
                </span>
              </div>
              
              <div style={pageStyles.stat}>
                <span style={pageStyles.statIcon}>⚡</span>
                <span style={pageStyles.statLabel}>Нагрузка:</span>
                <span 
                  style={{ 
                    ...pageStyles.statValue, 
                    color: getLoadColor(server.load) 
                  }}
                >
                  {server.load}%
                </span>
              </div>
            </div>
            
            {/* Overlay для Premium серверов */}
            {server.isPremium && (
              <div style={pageStyles.premiumOverlay}>
                <div style={pageStyles.lockIcon}>🔒</div>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Модальное окно Premium */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};

export default Servers;