# 🪆 РусVPN - Защита с душой

> Безопасный VPN через Telegram WebApp с русским характером

## 🚀 Особенности

- 🪆 **Русский дизайн** с матрешкой в очках Нео
- ⚡ **Telegram WebApp** интеграция
- 🛡️ **Freemium + Premium** модель
- 🌍 **Серверы по всему миру**
- 🎨 **Современный UI/UX** с анимациями
- 📱 **Адаптивный дизайн** для всех устройств

## 🛠️ Технологии

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Python (FastAPI)
- **Database**: SQLite
- **Containerization**: Docker
- **Styling**: Inline styles с русскими мотивами

## 🏗️ Структура проекта

```
vpn-telegram-miniapp/
├── frontend/          # React приложение
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   ├── public/
│   └── Dockerfile
├── backend/           # Python API
├── database/          # SQLite схемы
└── docker-compose.yml
```

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- Python 3.11+
- Docker & Docker Compose
- Telegram Bot Token

### Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/ваш-username/vpn-telegram-miniapp.git
   cd vpn-telegram-miniapp
   ```

2. **Настройте переменные окружения**
   ```bash
   cp frontend/.env.example frontend/.env
   # Отредактируйте .env файл
   ```

3. **Запустите с Docker**
   ```bash
   docker-compose up --build
   ```

4. **Или запустите локально**
   ```bash
   # Frontend
   cd frontend
   npm install
   npm run dev
   
   # Backend (в другом терминале)
   cd backend
   pip install -r requirements.txt
   python main.py
   ```

## 📱 Telegram Bot Setup

1. Создайте бота через [@BotFather](https://t.me/BotFather)
2. Получите токен бота
3. Настройте WebApp URL: `https://ваш-домен.com`
4. Добавьте токен в `.env` файл

## 💰 Монетизация

- **Freemium**: 3 сервера, 1 ГБ/месяц
- **Premium**: 
  - 59₽/месяц 
  - 499₽/год (выгода 16%)
  - Все серверы + безлимитный трафик

## 🎨 Дизайн система

- **Цвета**: Красный (#DC143C), Золотой (#FFD700), Синий (#1a1a2e)
- **Шрифт**: SF Pro Display
- **Иконки**: Эмодзи + кастомные
- **Анимации**: CSS-in-JS с плавными переходами

## 📊 MVP Roadmap

- [x] Базовая структура проекта
- [x] Telegram WebApp интеграция
- [x] Дизайн система
- [x] Главная страница с кнопкой подключения
- [ ] Страница серверов
- [ ] Система подписок
- [ ] Настройки пользователя
- [ ] Backend API
- [ ] Реальное VPN подключение

## 🤝 Разработка

```bash
# Установка зависимостей
npm install

# Разработка
npm run dev

# Сборка
npm run build

# Линтинг
npm run lint
```

## 📝 Лицензия

MIT License - используйте как хотите!

## 👨‍💻 Автор

Создано с русской душой и современными технологиями.

---

⭐ **Поставьте звезду, если проект понравился!**