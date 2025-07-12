const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Авторизация
  async authenticate(userData: any) {
    return this.request<{success: boolean; user: any}>('/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        telegram_id: userData.id,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
      }),
    });
  }

  // Получить серверы
  async getServers() {
    return this.request<{servers: any[]}>('/api/servers');
  }

  // Подключиться к серверу
  async connectToServer(telegramId: number, serverId: string) {
    return this.request<{success: boolean; message: string}>('/api/connect', {
      method: 'POST',
      body: JSON.stringify({
        telegram_id: telegramId,
        server_id: serverId,
      }),
    });
  }

  // Отключиться от сервера
  async disconnectFromServer(telegramId: number) {
    return this.request<{success: boolean; message: string}>('/api/disconnect', {
      method: 'POST',
      body: JSON.stringify({
        telegram_id: telegramId,
      }),
    });
  }

  // Создать подписку
  async createSubscription(telegramId: number, plan: string) {
    return this.request<{success: boolean; message: string; subscription_until: string}>('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        telegram_id: telegramId,
        plan: plan,
      }),
    });
  }

  // Получить статистику пользователя
  async getUserStats(telegramId: number) {
    return this.request<{
      total_connections: number;
      total_time: number;
      servers_used: number;
      recent_connections: any[];
    }>(`/api/user/${telegramId}/stats`);
  }
}

export const apiService = new ApiService();