import React, { useState, useEffect } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import { useApi } from '../hooks/useApi';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Card from '../components/UI/Card';

interface UserStats {
  total_connections: number;
  total_time: number;
  servers_used: number;
  recent_connections: Array<{
    server_name: string;
    country: string;
    connected_at: string;
    duration: number;
  }>;
}

const Stats: React.FC = () => {
  const { user } = useTelegram();
  const { getUserStats, loading } = useApi();
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      const response = await getUserStats();
      if (response) {
        setStats(response);
      }
    };

    if (user) {
      loadStats();
    }
  }, [user]);

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}с`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}м`;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}ч ${minutes}м`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      marginBottom: '30px',
      opacity: 0.8,
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '30px',
    },
    recentSection: {
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#FFD700',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    connectionCard: {
      background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    connectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    serverName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#ffffff',
    },
    duration: {
      fontSize: '12px',
      color: '#FFD700',
      fontWeight: '500',
      padding: '2px 8px',
      borderRadius: '8px',
      background: 'rgba(255, 215, 0, 0.1)',
    },
    connectionInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      color: '#b0b8c5',
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '40px 20px',
      color: '#b0b8c5',
    },
    emptyIcon: {
      fontSize: '48px',
      marginBottom: '16px',
      opacity: 0.5,
    },
    emptyText: {
      fontSize: '16px',
      lineHeight: '1.5',
    },
    achievementCard: {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '20px',
      color: '#8B0000',
      textAlign: 'center' as const,
    },
    achievementIcon: {
      fontSize: '32px',
      marginBottom: '8px',
    },
    achievementText: {
      fontSize: '14px',
      fontWeight: '600',
    },
  };

  if (loading) {
    return (
      <div style={pageStyles.container}>
        <LoadingSpinner size="large" message="Загрузка статистики..." />
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={pageStyles.container}>
        <h1 style={pageStyles.title}>📊 Статистика</h1>
        <div style={pageStyles.emptyState}>
          <div style={pageStyles.emptyIcon}>📊</div>
          <div style={pageStyles.emptyText}>
            Статистика недоступна
          </div>
        </div>
      </div>
    );
  }

  // Определяем достижения
  const getAchievement = () => {
    if (stats.total_connections >= 100) {
      return { icon: '🏆', text: 'VPN Мастер - 100+ подключений!' };
    } else if (stats.total_connections >= 50) {
      return { icon: '🥇', text: 'VPN Эксперт - 50+ подключений!' };
    } else if (stats.total_connections >= 10) {
      return { icon: '🥈', text: 'VPN Пользователь - 10+ подключений!' };
    } else if (stats.total_connections >= 1) {
      return { icon: '🥉', text: 'Первое подключение!' };
    }
    return null;
  };

  const achievement = getAchievement();

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.title}>📊 Статистика</h1>
      <p style={pageStyles.subtitle}>
        Ваша активность в MatreshkaVPN
      </p>

      {/* Достижение */}
      {achievement && (
        <div style={pageStyles.achievementCard}>
          <div style={pageStyles.achievementIcon}>{achievement.icon}</div>
          <div style={pageStyles.achievementText}>{achievement.text}</div>
        </div>
      )}

      {/* Основная статистика */}
      <div style={pageStyles.statsGrid}>
        <Card 
          title="Подключений"
          icon="🔗"
          value={stats.total_connections.toString()}
          color="#4CAF50"
          subtitle="всего"
        />
        <Card 
          title="Время онлайн"
          icon="⏱️"
          value={formatDuration(stats.total_time)}
          color="#2196F3"
          subtitle="общее время"
        />
        <Card 
          title="Серверов"
          icon="🌍"
          value={stats.servers_used.toString()}
          color="#FF9800"
          subtitle="использовано"
        />
        <Card 
          title="Средняя сессия"
          icon="📈"
          value={stats.total_connections > 0 ? formatDuration(Math.floor(stats.total_time / stats.total_connections)) : '0с'}
          color="#9C27B0"
          subtitle="длительность"
        />
      </div>

      {/* Последние подключения */}
      <div style={pageStyles.recentSection}>
        <h3 style={pageStyles.sectionTitle}>
          🕒 Последние подключения
        </h3>
        
        {stats.recent_connections.length > 0 ? (
          stats.recent_connections.map((connection, index) => (
            <div key={index} style={pageStyles.connectionCard}>
              <div style={pageStyles.connectionHeader}>
                <div style={pageStyles.serverName}>
                  {connection.server_name}
                </div>
                <div style={pageStyles.duration}>
                  {formatDuration(connection.duration)}
                </div>
              </div>
              <div style={pageStyles.connectionInfo}>
                <span>{connection.country}</span>
                <span>{formatDate(connection.connected_at)}</span>
              </div>
            </div>
          ))
        ) : (
          <div style={pageStyles.emptyState}>
            <div style={pageStyles.emptyIcon}>🔌</div>
            <div style={pageStyles.emptyText}>
              Подключений пока нет.<br />
              Попробуйте подключиться к серверу!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;