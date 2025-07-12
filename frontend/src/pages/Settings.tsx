import React, { useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';

interface SettingItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  type: 'toggle' | 'select' | 'action';
  value?: boolean | string;
  options?: { label: string; value: string }[];
  action?: () => void;
}

const Settings: React.FC = () => {
  const { hapticFeedback, showAlert, showConfirm, user } = useTelegram();
  
  const [autoConnect, setAutoConnect] = useState(true);
  const [killSwitch, setKillSwitch] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [protocol, setProtocol] = useState('wireguard');
  const [theme, setTheme] = useState('auto');

  const handleToggle = (setting: string, currentValue: boolean) => {
    hapticFeedback('light');
    
    switch (setting) {
      case 'autoConnect':
        setAutoConnect(!currentValue);
        break;
      case 'killSwitch':
        setKillSwitch(!currentValue);
        break;
      case 'notifications':
        setNotifications(!currentValue);
        break;
    }
  };

  const handleSelect = (setting: string, value: string) => {
    hapticFeedback('light');
    
    switch (setting) {
      case 'protocol':
        setProtocol(value);
        break;
      case 'theme':
        setTheme(value);
        break;
    }
  };

  const handleClearData = async () => {
    const confirmed = await showConfirm('Очистить все данные приложения? Это действие нельзя отменить.');
    if (confirmed) {
      hapticFeedback('success');
      showAlert('Данные приложения очищены!');
    }
  };

  const handleSupport = () => {
    hapticFeedback('light');
    showAlert('Свяжитесь с нами: @MatreshkaVPN_Support');
  };

  const handleAbout = () => {
    hapticFeedback('light');
    showAlert('MatreshkaVPN v1.0.0\n🪆 Защита с русской душой\n\nСделано с ❤️ в России');
  };

  const settings: SettingItem[] = [
    {
      id: 'autoConnect',
      title: 'Автоподключение',
      subtitle: 'Подключаться к VPN при запуске',
      icon: '🚀',
      type: 'toggle',
      value: autoConnect,
    },
    {
      id: 'killSwitch',
      title: 'Kill Switch',
      subtitle: 'Блокировать интернет при разрыве VPN',
      icon: '🛡️',
      type: 'toggle',
      value: killSwitch,
    },
    {
      id: 'notifications',
      title: 'Уведомления',
      subtitle: 'Получать уведомления о состоянии',
      icon: '🔔',
      type: 'toggle',
      value: notifications,
    },
    {
      id: 'protocol',
      title: 'Протокол VPN',
      subtitle: 'Выберите протокол подключения',
      icon: '⚙️',
      type: 'select',
      value: protocol,
      options: [
        { label: 'WireGuard (рекомендуем)', value: 'wireguard' },
        { label: 'OpenVPN', value: 'openvpn' },
        { label: 'IKEv2', value: 'ikev2' },
      ],
    },
    {
      id: 'theme',
      title: 'Тема оформления',
      subtitle: 'Выберите тему приложения',
      icon: '🎨',
      type: 'select',
      value: theme,
      options: [
        { label: 'Автоматически', value: 'auto' },
        { label: 'Светлая', value: 'light' },
        { label: 'Тёмная', value: 'dark' },
        { label: 'Русская (красная)', value: 'russian' },
      ],
    },
  ];

  const actionItems: SettingItem[] = [
    {
      id: 'support',
      title: 'Поддержка',
      subtitle: 'Связаться с технической поддержкой',
      icon: '💬',
      type: 'action',
      action: handleSupport,
    },
    {
      id: 'clearData',
      title: 'Очистить данные',
      subtitle: 'Удалить все сохранённые данные',
      icon: '🗑️',
      type: 'action',
      action: handleClearData,
    },
    {
      id: 'about',
      title: 'О приложении',
      subtitle: 'Информация о версии и разработчиках',
      icon: 'ℹ️',
      type: 'action',
      action: handleAbout,
    },
  ];

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
    userCard: {
      background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '30px',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    userAvatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      border: '2px solid rgba(255, 215, 0, 0.5)',
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '4px',
    },
    userStatus: {
      fontSize: '14px',
      color: '#FFD700',
      fontWeight: '500',
    },
    section: {
      marginBottom: '25px',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#FFD700',
      marginBottom: '15px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    },
    settingCard: {
      background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '8px',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    settingIcon: {
      fontSize: '24px',
      filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.5))',
    },
    settingInfo: {
      flex: 1,
    },
    settingTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '4px',
    },
    settingSubtitle: {
      fontSize: '12px',
      color: '#b0b8c5',
      lineHeight: '1.3',
    },
    settingControl: {
      minWidth: '60px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    toggle: {
      width: '50px',
      height: '28px',
      borderRadius: '14px',
      position: 'relative' as const,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    toggleActive: {
      background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
      boxShadow: '0 0 15px rgba(76, 175, 80, 0.5)',
    },
    toggleInactive: {
      background: 'linear-gradient(135deg, #666 0%, #444 100%)',
    },
    toggleSlider: {
      position: 'absolute' as const,
      top: '2px',
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      background: '#ffffff',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    },
    toggleSliderActive: {
      left: '24px',
    },
    toggleSliderInactive: {
      left: '2px',
    },
    selectValue: {
      fontSize: '14px',
      color: '#FFD700',
      fontWeight: '500',
    },
    arrow: {
      fontSize: '16px',
      color: '#b0b8c5',
      marginLeft: '8px',
    },
  };

  const renderControl = (setting: SettingItem) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div
            style={{
              ...pageStyles.toggle,
              ...(setting.value ? pageStyles.toggleActive : pageStyles.toggleInactive),
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle(setting.id, setting.value as boolean);
            }}
          >
            <div
              style={{
                ...pageStyles.toggleSlider,
                ...(setting.value ? pageStyles.toggleSliderActive : pageStyles.toggleSliderInactive),
              }}
            ></div>
          </div>
        );
      
      case 'select':
        const selectedOption = setting.options?.find(opt => opt.value === setting.value);
        return (
          <div style={pageStyles.settingControl}>
            <span style={pageStyles.selectValue}>
              {selectedOption?.label.split(' ')[0]}
            </span>
            <span style={pageStyles.arrow}>›</span>
          </div>
        );
      
      case 'action':
        return (
          <span style={pageStyles.arrow}>›</span>
        );
      
      default:
        return null;
    }
  };

  const getUserInitials = () => {
    if (!user) return '👤';
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || '👤';
  };

  return (
    <div style={pageStyles.container}>
      <h1 style={pageStyles.title}>⚙️ Настройки</h1>
      <p style={pageStyles.subtitle}>
        Настройте приложение под себя
      </p>

      {/* Карточка пользователя */}
      {user && (
        <div style={pageStyles.userCard}>
          <div style={pageStyles.userAvatar}>
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
              getUserInitials()
            )}
          </div>
          <div style={pageStyles.userInfo}>
            <div style={pageStyles.userName}>
              {user.first_name} {user.last_name || ''}
            </div>
            <div style={pageStyles.userStatus}>
              {user.is_premium ? '👑 Premium пользователь' : '🆓 Freemium пользователь'}
            </div>
          </div>
        </div>
      )}

      {/* Основные настройки */}
      <div style={pageStyles.section}>
        <div style={pageStyles.sectionTitle}>Основные настройки</div>
        {settings.map((setting) => (
          <div
            key={setting.id}
            style={pageStyles.settingCard}
            onClick={() => {
              if (setting.type === 'select') {
                // Здесь можно добавить модальное окно выбора
                hapticFeedback('light');
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={pageStyles.settingIcon}>{setting.icon}</div>
            <div style={pageStyles.settingInfo}>
              <div style={pageStyles.settingTitle}>{setting.title}</div>
              <div style={pageStyles.settingSubtitle}>{setting.subtitle}</div>
            </div>
            <div style={pageStyles.settingControl}>
              {renderControl(setting)}
            </div>
          </div>
        ))}
      </div>

      {/* Дополнительные действия */}
      <div style={pageStyles.section}>
        <div style={pageStyles.sectionTitle}>Дополнительно</div>
        {actionItems.map((item) => (
          <div
            key={item.id}
            style={pageStyles.settingCard}
            onClick={item.action}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={pageStyles.settingIcon}>{item.icon}</div>
            <div style={pageStyles.settingInfo}>
              <div style={pageStyles.settingTitle}>{item.title}</div>
              <div style={pageStyles.settingSubtitle}>{item.subtitle}</div>
            </div>
            <div style={pageStyles.settingControl}>
              {renderControl(item)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;