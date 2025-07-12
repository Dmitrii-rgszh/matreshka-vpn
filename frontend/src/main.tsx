import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Глобальные стили для русского дизайна
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background: #1a1a2e;
  }

  #root {
    min-height: 100vh;
    width: 100%;
  }

  /* Скроллбар в русском стиле */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #16213e;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #DC143C 0%, #8B0000 100%);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #FF1744 0%, #DC143C 100%);
  }

  /* Выделение текста */
  ::selection {
    background: rgba(220, 20, 60, 0.3);
    color: #FFD700;
  }

  ::-moz-selection {
    background: rgba(220, 20, 60, 0.3);
    color: #FFD700;
  }

  /* Скрыть стандартные стили в Telegram WebApp */
  .tg-viewport {
    height: 100vh !important;
  }

  /* Анимации для элементов */
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .slide-up {
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  /* Стили для кнопок */
  button {
    font-family: inherit;
    border: none;
    outline: none;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  button:active {
    transform: scale(0.98);
  }

  /* Отключение зума на мобильных */
  input, textarea, select {
    font-size: 16px;
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
  }

  /* Стили для темной темы */
  .dark {
    color-scheme: dark;
  }

  /* Отключение выделения для интерактивных элементов */
  .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Стили для модальных окон */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .modal-content {
    background: linear-gradient(135deg, #16213e 0%, #0f3460 100%);
    border-radius: 16px;
    border: 1px solid rgba(255, 215, 0, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    max-width: 90vw;
    max-height: 90vh;
    overflow: auto;
  }

  /* Анимация для матрешки */
  .matreshka-float {
    animation: matreshkaFloat 3s ease-in-out infinite;
  }

  @keyframes matreshkaFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-5px) rotate(1deg); }
    50% { transform: translateY(-3px) rotate(0deg); }
    75% { transform: translateY(-7px) rotate(-1deg); }
  }

  /* Эффект свечения для акцентов */
  .glow-gold {
    filter: drop-shadow(0 0 10px #FFD700);
  }

  .glow-red {
    filter: drop-shadow(0 0 10px #DC143C);
  }

  .glow-green {
    filter: drop-shadow(0 0 10px #4CAF50);
  }
`;

// Добавляем стили в head
const styleSheet = document.createElement('style');
styleSheet.textContent = globalStyles;
document.head.appendChild(styleSheet);

// Инициализация Telegram WebApp
if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  
  // Настройка цветовой схемы (если поддерживается)
  if (tg.setHeaderColor) {
    tg.setHeaderColor('#FF6B6B');
  }
  if (tg.setBackgroundColor) {
    tg.setBackgroundColor('#FF6B6B');
  }
  
  // Отключение подтверждения закрытия
  tg.enableClosingConfirmation();
  
  console.log('Telegram WebApp инициализирован:', {
    version: tg.version,
    platform: tg.platform,
    colorScheme: tg.colorScheme,
    user: tg.initDataUnsafe?.user
  });
} else {
  console.warn('Приложение запущено вне Telegram WebApp');
}

// Рендеринг приложения
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);