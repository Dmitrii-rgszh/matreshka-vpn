import React, { useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import { useApi } from '../hooks/useApi';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  originalPrice?: number;
  discount?: string;
  isPopular?: boolean;
  features: string[];
}

const Subscription: React.FC = () => {
  const { hapticFeedback, showAlert, user } = useTelegram();
  const { createSubscription, loading } = useApi();
  const [selectedPlan, setSelectedPlan] = useState<string>('yearly');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans: SubscriptionPlan[] = [
    {
      id: 'monthly',
      name: '1 месяц',
      price: 59,
      period: 'месяц',
      features: [
        'Все серверы по всему миру',
        'Безлимитный трафик',
        'Максимальная скорость',
        'Поддержка 24/7'
      ]
    },
    {
      id: 'yearly',
      name: '1 год',
      price: 499,
      period: 'год',
      originalPrice: 708,
      discount: 'Экономия 209₽ (30%)',
      isPopular: true,
      features: [
        'Все серверы по всему миру',
        'Безлимитный трафик',
        'Максимальная скорость',
        'Поддержка 24/7',
        'Приоритетное подключение',
        'Эксклюзивные серверы'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    hapticFeedback('light');
    setSelectedPlan(planId);
  };

  const handleSubscribe = async () => {
    if (!user) {
      showAlert('Ошибка: пользователь не авторизован');
      return;
    }

    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    setIsProcessing(true);
    hapticFeedback('medium');

    try {
      const response = await createSubscription(selectedPlan);
      
      if (response?.success) {
        hapticFeedback('success');
        showAlert(`🎉 Подписка "${plan.name}" успешно активирована!\n\nТеперь у вас есть доступ ко всем Premium серверам.`);
        
        // Небольшая задержка перед переходом на главную
        setTimeout(() => {
          window.location.hash = '/';
        }, 2000);
      } else {
        hapticFeedback('error');
        showAlert('Не удалось активировать подписку. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      hapticFeedback('error');
      showAlert('Произошла ошибка при оформлении подписки');
    } finally {
      setIsProcessing(false);
    }
  };

  const pageStyles = {
    container: {
      padding: '20px',
      maxWidth: '400px',
      margin: '0 auto',
      paddingBottom: '20px',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '30px',
    },
    crownIcon: {
      fontSize: '60px',
      marginBottom: '15px',
      filter: 'drop-shadow(0 0 20px #FFD700)',
      animation: 'crownFloat 2s ease-in-out infinite',
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#FFD700',
      marginBottom: '8px',
      textShadow: '0 0 15px rgba(255, 215, 0, 0.5)',
    },
    subtitle: {
      fontSize: '16px',
      color: '#ffffff',
      opacity: 0.9,
      lineHeight: '1.4',
    },
    planCard: {
      background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)',
      borderRadius: '16px',
      padding: '20px',
      marginBottom: '16px',
      border: '2px solid rgba(255, 215, 0, 0.3)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    planCardSelected: {
      border: '2px solid #FFD700',
      boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)',
      transform: 'translateY(-2px)',
    },
    planCardPopular: {
      border: '2px solid #FFD700',
      boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
    },
    popularBadge: {
      position: 'absolute' as const,
      top: '-1px',
      right: '20px',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      color: '#8B0000',
      padding: '4px 12px',
      borderRadius: '0 0 8px 8px',
      fontSize: '12px',
      fontWeight: '700',
      textTransform: 'uppercase' as const,
    },
    planHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '15px',
    },
    planInfo: {
      flex: 1,
    },
    planName: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '4px',
    },
    originalPrice: {
      fontSize: '14px',
      color: '#b0b8c5',
      textDecoration: 'line-through',
      opacity: 0.7,
    },
    discount: {
      fontSize: '12px',
      color: '#4CAF50',
      fontWeight: '600',
      marginTop: '2px',
    },
    planPrice: {
      textAlign: 'right' as const,
    },
    price: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#FFD700',
      lineHeight: '1',
    },
    period: {
      fontSize: '14px',
      color: '#b0b8c5',
      marginTop: '2px',
    },
    features: {
      marginTop: '16px',
    },
    feature: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#ffffff',
    },
    featureIcon: {
      color: '#4CAF50',
      fontWeight: '600',
    },
    subscribeButton: {
      width: '100%',
      padding: '16px',
      borderRadius: '12px',
      border: 'none',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      color: '#8B0000',
      fontSize: '18px',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '20px',
      boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
    },
    features2: {
      background: 'rgba(255, 215, 0, 0.1)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      border: '1px solid rgba(255, 215, 0, 0.3)',
    },
    featuresTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#FFD700',
      marginBottom: '15px',
      textAlign: 'center' as const,
    },
    premiumFeature: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '12px',
      padding: '8px 0',
    },
    premiumFeatureIcon: {
      fontSize: '20px',
      filter: 'drop-shadow(0 0 8px #FFD700)',
    },
    premiumFeatureText: {
      fontSize: '16px',
      color: '#ffffff',
      fontWeight: '500',
    },
    sparkles: {
      position: 'absolute' as const,
      top: '10px',
      left: '10px',
      right: '10px',
      bottom: '10px',
      pointerEvents: 'none' as const,
      opacity: 0.1,
      background: 'radial-gradient(circle at 20% 20%, #FFD700 2px, transparent 2px), radial-gradient(circle at 80% 80%, #FFD700 1px, transparent 1px)',
      backgroundSize: '40px 40px, 30px 30px',
      animation: 'sparkleMove 8s linear infinite',
    }
  };

  const premiumFeatures = [
    { icon: '🌍', text: 'Серверы в 25+ странах' },
    { icon: '⚡', text: 'Безлимитный трафик' },
    { icon: '🚀', text: 'До 1 Гбит/с скорость' },
    { icon: '🛡️', text: 'Военное шифрование' },
    { icon: '📱', text: '5 устройств одновременно' },
    { icon: '🎯', text: 'Блокировка рекламы' },
  ];

  return (
    <div style={pageStyles.container}>
      {/* Заголовок */}
      <div style={pageStyles.header}>
        <div style={pageStyles.crownIcon}>👑</div>
        <h1 style={pageStyles.title}>Premium подписка</h1>
        <p style={pageStyles.subtitle}>
          Получите полный доступ к MatreshkaVPN с русской душой
        </p>
      </div>

      {/* Премиум функции */}
      <div style={pageStyles.features2}>
        <h3 style={pageStyles.featuresTitle}>Что входит в Premium</h3>
        {premiumFeatures.map((feature, index) => (
          <div key={index} style={pageStyles.premiumFeature}>
            <span style={pageStyles.premiumFeatureIcon}>{feature.icon}</span>
            <span style={pageStyles.premiumFeatureText}>{feature.text}</span>
          </div>
        ))}
      </div>

      {/* Планы подписки */}
      {plans.map((plan) => {
        const isSelected = selectedPlan === plan.id;
        
        return (
          <div
            key={plan.id}
            style={{
              ...pageStyles.planCard,
              ...(isSelected ? pageStyles.planCardSelected : {}),
              ...(plan.isPopular ? pageStyles.planCardPopular : {}),
            }}
            onClick={() => handlePlanSelect(plan.id)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.transform = 'translateY(0px)';
              }
            }}
          >
            {/* Блестки */}
            <div style={pageStyles.sparkles}></div>
            
            {/* Популярный план */}
            {plan.isPopular && (
              <div style={pageStyles.popularBadge}>
                ⭐ Популярный
              </div>
            )}
            
            {/* Заголовок плана */}
            <div style={pageStyles.planHeader}>
              <div style={pageStyles.planInfo}>
                <div style={pageStyles.planName}>{plan.name}</div>
                {plan.originalPrice && (
                  <div style={pageStyles.originalPrice}>
                    {plan.originalPrice}₽
                  </div>
                )}
                {plan.discount && (
                  <div style={pageStyles.discount}>
                    {plan.discount}
                  </div>
                )}
              </div>
              
              <div style={pageStyles.planPrice}>
                <div style={pageStyles.price}>{plan.price}₽</div>
                <div style={pageStyles.period}>за {plan.period}</div>
              </div>
            </div>
            
            {/* Особенности плана */}
            <div style={pageStyles.features}>
              {plan.features.map((feature, index) => (
                <div key={index} style={pageStyles.feature}>
                  <span style={pageStyles.featureIcon}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <button
        style={{
          ...pageStyles.subscribeButton,
          opacity: isProcessing || loading ? 0.7 : 1,
          cursor: isProcessing || loading ? 'not-allowed' : 'pointer',
        }}
        onClick={handleSubscribe}
        disabled={isProcessing || loading}
        onMouseEnter={(e) => {
          if (!isProcessing && !loading) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.6)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isProcessing && !loading) {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.4)';
          }
        }}
      >
        {isProcessing || loading ? '⏳ Обработка...' : 'Получить Premium 👑'}
      </button>

      <style>{`
        @keyframes crownFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        
        @keyframes sparkleMove {
          0% { background-position: 0px 0px, 0px 0px; }
          100% { background-position: 40px 40px, -30px -30px; }
        }
      `}</style>
    </div>
  );
};

export default Subscription;