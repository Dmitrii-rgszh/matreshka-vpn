from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
import sqlite3
import hashlib
import hmac
import json
import time
from datetime import datetime, timedelta
from typing import Optional, List
import urllib.parse

app = FastAPI(title="MatreshkaVPN API", version="1.0.0")

# CORS настройки для работы с фронтендом
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-domain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Настройки Telegram
TELEGRAM_BOT_TOKEN = "YOUR_BOT_TOKEN"  # Замените на ваш токен
security = HTTPBearer()

# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('database/vpn.db')
    cursor = conn.cursor()
    
    # Таблица пользователей
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            telegram_id INTEGER UNIQUE,
            username TEXT,
            first_name TEXT,
            last_name TEXT,
            is_premium BOOLEAN DEFAULT FALSE,
            subscription_until DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_login DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Таблица серверов
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS servers (
            id TEXT PRIMARY KEY,
            name TEXT,
            country TEXT,
            city TEXT,
            flag TEXT,
            ping INTEGER,
            load_percentage INTEGER,
            is_premium BOOLEAN DEFAULT FALSE,
            is_recommended BOOLEAN DEFAULT FALSE,
            is_active BOOLEAN DEFAULT TRUE
        )
    ''')
    
    # Таблица подключений
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS connections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            server_id TEXT,
            connected_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            disconnected_at DATETIME,
            duration INTEGER,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (server_id) REFERENCES servers (id)
        )
    ''')
    
    conn.commit()
    conn.close()

# Проверка подписи Telegram
def verify_telegram_auth(init_data: str) -> dict:
    try:
        parsed_data = urllib.parse.parse_qs(init_data)
        hash_value = parsed_data.get('hash', [''])[0]
        
        if not hash_value:
            raise HTTPException(status_code=401, detail="Missing hash")
        
        # Создаем строку для проверки
        check_string = '\n'.join([f"{k}={v[0]}" for k, v in sorted(parsed_data.items()) if k != 'hash'])
        
        # Проверяем подпись
        secret_key = hashlib.sha256(TELEGRAM_BOT_TOKEN.encode()).digest()
        calculated_hash = hmac.new(secret_key, check_string.encode(), hashlib.sha256).hexdigest()
        
        if calculated_hash != hash_value:
            raise HTTPException(status_code=401, detail="Invalid signature")
        
        # Парсим данные пользователя
        user_data = json.loads(parsed_data.get('user', ['{}'])[0])
        return user_data
        
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Auth failed: {str(e)}")

# Модели данных
class UserResponse:
    def __init__(self, telegram_id: int, username: str, first_name: str, 
                 last_name: str, is_premium: bool, subscription_until: str):
        self.telegram_id = telegram_id
        self.username = username
        self.first_name = first_name
        self.last_name = last_name
        self.is_premium = is_premium
        self.subscription_until = subscription_until

# API эндпоинты
@app.get("/")
async def root():
    return {"message": "MatreshkaVPN API", "status": "running", "version": "1.0.0"}

@app.post("/api/auth")
async def authenticate(init_data: dict):
    """Авторизация пользователя через Telegram WebApp"""
    try:
        # В реальном приложении здесь будет проверка init_data
        telegram_id = init_data.get("telegram_id")
        username = init_data.get("username", "")
        first_name = init_data.get("first_name", "")
        last_name = init_data.get("last_name", "")
        
        if not telegram_id:
            raise HTTPException(status_code=400, detail="Missing telegram_id")
        
        # Подключение к БД
        conn = sqlite3.connect('database/vpn.db')
        cursor = conn.cursor()
        
        # Проверяем существует ли пользователь
        cursor.execute('SELECT * FROM users WHERE telegram_id = ?', (telegram_id,))
        user = cursor.fetchone()
        
        if user:
            # Обновляем время последнего входа
            cursor.execute('UPDATE users SET last_login = ? WHERE telegram_id = ?', 
                         (datetime.now(), telegram_id))
        else:
            # Создаем нового пользователя
            cursor.execute('''
                INSERT INTO users (telegram_id, username, first_name, last_name)
                VALUES (?, ?, ?, ?)
            ''', (telegram_id, username, first_name, last_name))
        
        conn.commit()
        
        # Получаем актуальные данные пользователя
        cursor.execute('SELECT * FROM users WHERE telegram_id = ?', (telegram_id,))
        user_data = cursor.fetchone()
        conn.close()
        
        return {
            "success": True,
            "user": {
                "telegram_id": user_data[1],
                "username": user_data[2],
                "first_name": user_data[3],
                "last_name": user_data[4],
                "is_premium": bool(user_data[5]),
                "subscription_until": user_data[6]
            }
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/servers")
async def get_servers():
    """Получить список всех серверов"""
    try:
        conn = sqlite3.connect('database/vpn.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, country, city, flag, ping, load_percentage, 
                   is_premium, is_recommended, is_active 
            FROM servers WHERE is_active = 1
            ORDER BY is_recommended DESC, ping ASC
        ''')
        
        servers = []
        for row in cursor.fetchall():
            servers.append({
                "id": row[0],
                "name": row[1],
                "country": row[2],
                "city": row[3],
                "flag": row[4],
                "ping": row[5],
                "load": row[6],
                "isPremium": bool(row[7]),
                "isRecommended": bool(row[8])
            })
        
        conn.close()
        return {"servers": servers}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/connect")
async def connect_to_server(data: dict):
    """Подключение к серверу"""
    try:
        telegram_id = data.get("telegram_id")
        server_id = data.get("server_id")
        
        if not telegram_id or not server_id:
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        conn = sqlite3.connect('database/vpn.db')
        cursor = conn.cursor()
        
        # Проверяем пользователя
        cursor.execute('SELECT id, is_premium FROM users WHERE telegram_id = ?', (telegram_id,))
        user = cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Проверяем сервер
        cursor.execute('SELECT is_premium FROM servers WHERE id = ? AND is_active = 1', (server_id,))
        server = cursor.fetchone()
        
        if not server:
            raise HTTPException(status_code=404, detail="Server not found")
        
        # Проверяем доступ к Premium серверу
        # Проверяем доступ к Premium серверу
        if server[0] and not user[1]:  # Сервер Premium, а пользователь нет
            raise HTTPException(status_code=403, detail="Premium subscription required")
        
        # Для бесплатных пользователей - только серверы СНГ (исключая развитые страны)
        if not user[1]:  # Если пользователь не Premium
            cursor.execute('SELECT country FROM servers WHERE id = ?', (server_id,))
            server_country = cursor.fetchone()[0]
            restricted_countries = ["США", "Великобритания", "Германия", "Франция", "Швейцария", 
                                   "Япония", "Австралия", "Канада", "Швеция", "Норвегия", 
                                   "Дания", "Финляндия", "Австрия", "Нидерланды", "Сингапур",
                                   "Южная Корея", "ОАЭ", "Гонконг", "Индия", "Бразилия", 
                                   "Мексика", "Новая Зеландия", "ЮАР", "Чехия", "Польша"]
            if server_country in restricted_countries:
                raise HTTPException(status_code=403, detail="Premium subscription required for this country")
        
        # Отключаем предыдущие подключения
        cursor.execute('''
            UPDATE connections 
            SET disconnected_at = ?, duration = ?
            WHERE user_id = ? AND disconnected_at IS NULL
        ''', (datetime.now(), 0, user[0]))
        
        # Создаем новое подключение
        cursor.execute('''
            INSERT INTO connections (user_id, server_id, connected_at)
            VALUES (?, ?, ?)
        ''', (user[0], server_id, datetime.now()))
        
        conn.commit()
        conn.close()
        
        return {"success": True, "message": "Connected successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/disconnect")
async def disconnect_from_server(data: dict):
    """Отключение от сервера"""
    try:
        telegram_id = data.get("telegram_id")
        
        if not telegram_id:
            raise HTTPException(status_code=400, detail="Missing telegram_id")
        
        conn = sqlite3.connect('database/vpn.db')
        cursor = conn.cursor()
        
        # Получаем пользователя
        cursor.execute('SELECT id FROM users WHERE telegram_id = ?', (telegram_id,))
        user = cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Отключаем активные подключения
        cursor.execute('''
            UPDATE connections 
            SET disconnected_at = ?, 
                duration = CAST((julianday(?) - julianday(connected_at)) * 86400 AS INTEGER)
            WHERE user_id = ? AND disconnected_at IS NULL
        ''', (datetime.now(), datetime.now(), user[0]))
        
        conn.commit()
        conn.close()
        
        return {"success": True, "message": "Disconnected successfully"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/subscribe")
async def create_subscription(data: dict):
    """Создание Premium подписки"""
    try:
        telegram_id = data.get("telegram_id")
        plan = data.get("plan")  # "monthly" или "yearly"
        
        if not telegram_id or not plan:
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        # Определяем длительность подписки
        if plan == "monthly":
            duration_days = 30
        elif plan == "yearly":
            duration_days = 365
        else:
            raise HTTPException(status_code=400, detail="Invalid plan")
        
        conn = sqlite3.connect('database/vpn.db')
        cursor = conn.cursor()
        
        # Обновляем пользователя
        subscription_until = datetime.now() + timedelta(days=duration_days)
        cursor.execute('''
            UPDATE users 
            SET is_premium = 1, subscription_until = ?
            WHERE telegram_id = ?
        ''', (subscription_until, telegram_id))
        
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        conn.commit()
        conn.close()
        
        return {
            "success": True, 
            "message": "Subscription activated",
            "subscription_until": subscription_until.isoformat()
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/user/{telegram_id}/stats")
async def get_user_stats(telegram_id: int):
    """Получить статистику пользователя"""
    try:
        conn = sqlite3.connect('database/vpn.db')
        cursor = conn.cursor()
        
        # Получаем общую статистику
        cursor.execute('''
            SELECT 
                COUNT(*) as total_connections,
                SUM(CASE WHEN duration IS NOT NULL THEN duration ELSE 0 END) as total_time,
                COUNT(DISTINCT server_id) as servers_used
            FROM connections c
            JOIN users u ON c.user_id = u.id
            WHERE u.telegram_id = ?
        ''', (telegram_id,))
        
        stats = cursor.fetchone()
        
        # Получаем последние подключения
        cursor.execute('''
            SELECT s.name, s.country, c.connected_at, c.duration
            FROM connections c
            JOIN users u ON c.user_id = u.id
            JOIN servers s ON c.server_id = s.id
            WHERE u.telegram_id = ?
            ORDER BY c.connected_at DESC
            LIMIT 5
        ''', (telegram_id,))
        
        recent_connections = []
        for row in cursor.fetchall():
            recent_connections.append({
                "server_name": row[0],
                "country": row[1],
                "connected_at": row[2],
                "duration": row[3] or 0
            })
        
        conn.close()
        
        return {
            "total_connections": stats[0] or 0,
            "total_time": stats[1] or 0,
            "servers_used": stats[2] or 0,
            "recent_connections": recent_connections
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Функция для заполнения базы тестовыми серверами
def populate_test_servers():
    """Заполняет базу тестовыми серверами"""
    test_servers = [
        # Бесплатные серверы (СНГ кроме России)
        ("minsk-1", "Минск #1", "Беларусь", "Минск", "🇧🇾", 42, 38, False, True),
        ("almaty-1", "Алматы #1", "Казахстан", "Алматы", "🇰🇿", 58, 29, False, False),
        ("tashkent-1", "Ташкент #1", "Узбекистан", "Ташкент", "🇺🇿", 65, 34, False, False),
        ("yerevan-1", "Ереван #1", "Армения", "Ереван", "🇦🇲", 48, 41, False, False),
        ("tbilisi-1", "Тбилиси #1", "Грузия", "Тбилиси", "🇬🇪", 52, 36, False, False),
        
        # Premium серверы (Европа)
        ("amsterdam-1", "Амстердам #1", "Нидерланды", "Амстердам", "🇳🇱", 75, 55, True, False),
        ("amsterdam-2", "Амстердам #2", "Нидерланды", "Амстердам", "🇳🇱", 78, 43, True, False),
        ("london-1", "Лондон #1", "Великобритания", "Лондон", "🇬🇧", 85, 62, True, False),
        ("paris-1", "Париж #1", "Франция", "Париж", "🇫🇷", 82, 47, True, False),
        ("berlin-1", "Берлин #1", "Германия", "Берлин", "🇩🇪", 89, 51, True, False),
        ("zurich-1", "Цюрих #1", "Швейцария", "Цюрих", "🇨🇭", 95, 33, True, False),
        ("vienna-1", "Вена #1", "Австрия", "Вена", "🇦🇹", 91, 39, True, False),
        ("prague-1", "Прага #1", "Чехия", "Прага", "🇨🇿", 88, 44, True, False),
        ("warsaw-1", "Варшава #1", "Польша", "Варшава", "🇵🇱", 72, 48, True, False),
        
        # Premium серверы (Азия)
        ("singapore-1", "Сингапур #1", "Сингапур", "Сингапур", "🇸🇬", 145, 28, True, False),
        ("tokyo-1", "Токио #1", "Япония", "Токио", "🇯🇵", 165, 41, True, False),
        ("seoul-1", "Сеул #1", "Южная Корея", "Сеул", "🇰🇷", 155, 36, True, False),
        ("dubai-1", "Дубай #1", "ОАЭ", "Дубай", "🇦🇪", 125, 52, True, False),
        ("hongkong-1", "Гонконг #1", "Гонконг", "Гонконг", "🇭🇰", 135, 46, True, False),
        ("mumbai-1", "Мумбаи #1", "Индия", "Мумбаи", "🇮🇳", 185, 53, True, False),
        
        # Premium серверы (Америка)
        ("usa-1", "Нью-Йорк #1", "США", "Нью-Йорк", "🇺🇸", 220, 67, True, False),
        ("usa-2", "Лос-Анджелес #1", "США", "Лос-Анджелес", "🇺🇸", 245, 58, True, False),
        ("usa-3", "Чикаго #1", "США", "Чикаго", "🇺🇸", 235, 61, True, False),
        ("canada-1", "Торонто #1", "Канада", "Торонто", "🇨🇦", 215, 44, True, False),
        ("brazil-1", "Сан-Паулу #1", "Бразилия", "Сан-Паулу", "🇧🇷", 280, 39, True, False),
        ("mexico-1", "Мехико #1", "Мексика", "Мехико", "🇲🇽", 265, 42, True, False),
        
        # Premium серверы (Океания и Африка)
        ("australia-1", "Сидней #1", "Австралия", "Сидней", "🇦🇺", 320, 31, True, False),
        ("newzealand-1", "Окленд #1", "Новая Зеландия", "Окленд", "🇳🇿", 340, 28, True, False),
        ("southafrica-1", "Кейптаун #1", "ЮАР", "Кейптаун", "🇿🇦", 298, 27, True, False),
        
        # Premium серверы (Скандинавия)
        ("sweden-1", "Стокгольм #1", "Швеция", "Стокгольм", "🇸🇪", 68, 35, True, False),
        ("norway-1", "Осло #1", "Норвегия", "Осло", "🇳🇴", 71, 32, True, False),
        ("finland-1", "Хельсинки #1", "Финляндия", "Хельсинки", "🇫🇮", 65, 37, True, False),
        ("denmark-1", "Копенгаген #1", "Дания", "Копенгаген", "🇩🇰", 73, 40, True, False),
    ]
    
    conn = sqlite3.connect('database/vpn.db')
    cursor = conn.cursor()
    
    for server in test_servers:
        cursor.execute('''
            INSERT OR REPLACE INTO servers 
            (id, name, country, city, flag, ping, load_percentage, is_premium, is_recommended)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', server)
    
    conn.commit()
    conn.close()

if __name__ == "__main__":
    import uvicorn
    init_db()
    populate_test_servers()
    print("🪆 MatreshkaVPN API запущен на http://localhost:8000")
    print("📖 Документация доступна на http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)