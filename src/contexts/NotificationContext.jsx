import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext();

export { NotificationContext };
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simular notificações de novos lançamentos
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'new_release',
        title: 'Novo filme disponível!',
        message: '"Dune: Parte 2" já está disponível em nossa plataforma.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
        read: false,
        actionUrl: '/movie/693134'
      },
      {
        id: 2,
        type: 'recommendation',
        title: 'Recomendação para você',
        message: 'Baseado nos seus gostos, recomendamos "Oppenheimer".',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
        read: false,
        actionUrl: '/movie/872585'
      },
      {
        id: 3,
        type: 'achievement',
        title: 'Conquista desbloqueada!',
        message: 'Parabéns! Você assistiu 10 filmes este mês.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
        read: true,
        actionUrl: '/my-list'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  // Atualizar contador de não lidas
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Simular novas notificações periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      // Chance de 10% de gerar uma nova notificação a cada 30 segundos
      if (Math.random() < 0.1) {
        const types = ['new_release', 'recommendation', 'achievement'];
        const randomType = types[Math.floor(Math.random() * types.length)];

        const messages = {
          new_release: [
            '"Avatar: O Caminho da Água" chegou à nossa coleção!',
            'Novo documentário: "Free Solo" disponível agora.',
            'Série completa: "The Crown" - Temporada 6.'
          ],
          recommendation: [
            'Novo filme baseado nos seus gostos: "Parasita".',
            'Você pode gostar: "Your Name" - Animação incrível.',
            'Recomendação semanal: "The Shawshank Redemption".'
          ],
          achievement: [
            'Meta atingida! 5 filmes assistidos esta semana.',
            'Novo marco: 50 filmes na sua lista!',
            'Conquista: Primeiro filme de terror adicionado.'
          ]
        };

        addNotification({
          type: randomType,
          title: randomType === 'new_release' ? 'Novo conteúdo disponível!' :
                 randomType === 'recommendation' ? 'Recomendação personalizada' :
                 'Nova conquista!',
          message: messages[randomType][Math.floor(Math.random() * messages[randomType].length)]
        });
      }
    }, 30000); // A cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};