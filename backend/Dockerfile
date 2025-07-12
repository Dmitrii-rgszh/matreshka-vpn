FROM python:3.11-slim

WORKDIR /app

# Копируем requirements и устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем исходный код
COPY . .

# Создаем директорию для базы данных
RUN mkdir -p database

# Открываем порт
EXPOSE 8000

# Запускаем сервер
CMD ["python", "main.py"]