import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useTelegram } from './useTelegram';

export const useApi = () => {
  const { user } = useTelegram();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const withErrorHandling = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка';
      setError(errorMessage);
      console.error('API Error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const authenticate = () => {
    if (!user) return Promise.resolve(null);
    return withErrorHandling(() => apiService.authenticate(user));
  };

  const getServers = () => {
    return withErrorHandling(() => apiService.getServers());
  };

  const connectToServer = (serverId: string) => {
    if (!user) return Promise.resolve(null);
    return withErrorHandling(() => apiService.connectToServer(user.id, serverId));
  };

  const disconnectFromServer = () => {
    if (!user) return Promise.resolve(null);
    return withErrorHandling(() => apiService.disconnectFromServer(user.id));
  };

  const createSubscription = (plan: string) => {
    if (!user) return Promise.resolve(null);
    return withErrorHandling(() => apiService.createSubscription(user.id, plan));
  };

  const getUserStats = () => {
    if (!user) return Promise.resolve(null);
    return withErrorHandling(() => apiService.getUserStats(user.id));
  };

  return {
    loading,
    error,
    authenticate,
    getServers,
    connectToServer,
    disconnectFromServer,
    createSubscription,
    getUserStats,
  };
};