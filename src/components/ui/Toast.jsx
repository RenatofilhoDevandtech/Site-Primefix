// src/components/ui/Toast.jsx
import { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faExclamationCircle, 
  faExclamationTriangle, 
  faInfoCircle,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

const Toast = ({ 
  message, 
  type = 'info', 
  onClose, 
  duration = 4000,
  position = 'top-right',
  title 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Função para fechar o toast com animação
  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  // Animação de entrada
  useEffect(() => {
    const enterTimer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(enterTimer);
  }, []);

  // Fecha o toast automaticamente após a duração especificada
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, handleClose]); // Adicionado handleClose como dependência

  const handleMouseEnter = () => {
    // Pausa o timer de fechamento quando o mouse está sobre o toast
    const timers = setTimeout(() => {}, 0);
    return () => clearTimeout(timers);
  };

  const icons = {
    success: faCheckCircle,
    error: faExclamationCircle,
    warning: faExclamationTriangle,
    info: faInfoCircle,
  };

  const colors = {
    success: 'bg-green-600/90 border-green-700',
    error: 'bg-red-600/90 border-red-700',
    warning: 'bg-yellow-600/90 border-yellow-700',
    info: 'bg-pr-cyan/90 border-cyan-700',
  };

  const iconColors = {
    success: 'text-green-300',
    error: 'text-red-300',
    warning: 'text-yellow-300',
    info: 'text-cyan-300',
  };

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div 
      className={`fixed ${positions[position]} z-50 transition-all duration-300 ease-in-out
                 ${isVisible ? (isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100') : 'opacity-0 scale-95'}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => {}}
    >
      <div 
        className={`flex items-start max-w-sm rounded-lg border shadow-2xl backdrop-blur-lg
                   ${colors[type]} text-white overflow-hidden`}
      >
        {/* Ícone */}
        <div className={`flex-shrink-0 p-3 ${iconColors[type]}`}>
          <FontAwesomeIcon icon={icons[type]} className="text-xl" />
        </div>
        
        {/* Conteúdo */}
        <div className="flex-grow p-3 pr-2">
          {title && (
            <h3 className="font-bold text-sm mb-1">{title}</h3>
          )}
          <p className="text-sm">{message}</p>
        </div>
        
        {/* Botão de fechar */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Fechar notificação"
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Toast;