import { useEffect, useState } from 'react';
import { TelegramWebApp, WebAppUser } from '../telegram';

export const useTelegram = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [user, setUser] = useState<WebAppUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('useTelegram useEffect triggered');
    const app = window.Telegram?.WebApp;
    console.log('Telegram WebApp found:', !!app);
    
    if (app) {
      console.log('Setting up real Telegram user');
      setWebApp(app);
      setUser(app.initDataUnsafe?.user || null);
      
      // Инициализация приложения
      app.ready();
      app.expand();
      
      // Настройка темы
      if (app.colorScheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
      
      setIsReady(true);
    } else {
      // Для разработки вне Telegram - создаем тестового пользователя
      console.warn('Telegram WebApp не найден. Используем тестового пользователя.');
      const testUser = {
        id: 123456789,
        first_name: 'Тест',
        last_name: 'Пользователь',
        username: 'testuser',
        language_code: 'ru',
        is_premium: false
      };
      console.log('Setting test user:', testUser);
      setUser(testUser);
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    console.log('User state changed:', user);
  }, [user]);

  const showMainButton = (text: string, onClick: () => void) => {
    if (webApp?.MainButton) {
      webApp.MainButton.setText(text);
      webApp.MainButton.onClick(onClick);
      webApp.MainButton.show();
    }
  };

  const hideMainButton = () => {
    if (webApp?.MainButton) {
      webApp.MainButton.hide();
    }
  };

  const showBackButton = (onClick: () => void) => {
    if (webApp?.BackButton) {
      webApp.BackButton.onClick(onClick);
      webApp.BackButton.show();
    }
  };

  const hideBackButton = () => {
    if (webApp?.BackButton) {
      webApp.BackButton.hide();
    }
  };

  const hapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning') => {
    try {
      if (webApp?.HapticFeedback) {
        if (type === 'success' || type === 'error' || type === 'warning') {
          webApp.HapticFeedback.notificationOccurred(type);
        } else {
          webApp.HapticFeedback.impactOccurred(type);
        }
      }
    } catch (error) {
      // Игнорируем ошибки haptic feedback - не критично
      console.debug('HapticFeedback not supported:', error);
    }
  };

  const showAlert = (message: string) => {
    if (webApp) {
      webApp.showAlert(message);
    } else {
      alert(message);
    }
  };

  const showConfirm = (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (webApp) {
        webApp.showPopup({
          title: 'Подтверждение',
          message,
          buttons: [
            { id: 'ok', type: 'ok', text: 'Да' },
            { id: 'cancel', type: 'cancel', text: 'Нет' }
          ]
        });
        // Обработка результата через события
        const handler = (event?: any) => {
          if (event?.button_id === 'ok') {
            resolve(true);
          } else {
            resolve(false);
          }
          if (webApp.offEvent) {
            webApp.offEvent('popupClosed', handler);
          }
        };
        if (webApp.onEvent) {
          webApp.onEvent('popupClosed', handler);
        }
      } else {
        resolve(confirm(message));
      }
    });
  };

  const close = () => {
    if (webApp) {
      webApp.close();
    }
  };

  return {
    webApp,
    user,
    isReady,
    isDark: webApp?.colorScheme === 'dark',
    showMainButton,
    hideMainButton,
    showBackButton,
    hideBackButton,
    hapticFeedback,
    showAlert,
    showConfirm,
    close,
  };
};