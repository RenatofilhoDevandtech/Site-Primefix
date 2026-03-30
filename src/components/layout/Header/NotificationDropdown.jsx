import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useNotifications } from '../../../hooks/useNotifications';


const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();

  const notificationNode = useClickOutside(() => setIsOpen(false));

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `${minutes}min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_release':
        return '🎬';
      case 'recommendation':
        return '✨';
      case 'achievement':
        return '🏆';
      default:
        return '📢';
    }
  };

  return (
    <div ref={notificationNode} className="relative">
      <button
        className="relative flex items-center justify-center w-10 h-10 text-pr-gray hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Notificações ${unreadCount > 0 ? `(${unreadCount} não lidas)` : ''}`}
      >
        <FontAwesomeIcon icon={faBell} className="text-lg" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pr-cyan text-pr-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-pr-gray-dark/95 backdrop-blur-lg rounded-lg shadow-xl border border-pr-border/30 overflow-hidden animate-fade-in-fast z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-pr-border/30">
            <h3 className="text-white font-semibold">Notificações</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-pr-cyan hover:text-pr-cyan/80 transition-colors"
                  title="Marcar todas como lidas"
                >
                  <FontAwesomeIcon icon={faCheck} className="mr-1" />
                  Marcar todas
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  title="Limpar todas"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          </div>

          {/* Lista de notificações */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <FontAwesomeIcon icon={faBell} className="text-3xl text-pr-gray-dark mb-3" />
                <p className="text-pr-gray">Nenhuma notificação</p>
                <p className="text-sm text-pr-gray-dark">Você será notificado sobre novos lançamentos e recomendações.</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-pr-border/20 hover:bg-pr-black/20 transition-colors ${
                    !notification.read ? 'bg-pr-cyan/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-lg flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm leading-tight">
                            {notification.title}
                          </h4>
                          <p className="text-pr-gray text-sm mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-pr-gray-dark mt-2">
                            {formatTimeAgo(notification.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-pr-cyan rounded-full"></div>
                          )}
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-pr-gray hover:text-red-400 transition-colors p-1"
                            title="Remover notificação"
                          >
                            <FontAwesomeIcon icon={faTimes} className="text-xs" />
                          </button>
                        </div>
                      </div>
                      {notification.actionUrl && (
                        <button
                          onClick={() => {
                            markAsRead(notification.id);
                            setIsOpen(false);
                            // Aqui você pode navegar para a URL da ação
                            console.log('Navegar para:', notification.actionUrl);
                          }}
                          className="mt-2 text-xs text-pr-cyan hover:text-pr-cyan/80 transition-colors"
                        >
                          Ver detalhes →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-pr-border/30">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-sm text-pr-gray hover:text-white transition-colors"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;