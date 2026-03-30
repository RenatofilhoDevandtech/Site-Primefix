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

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const icons = {
    success: faCheckCircle,
    error: faExclamationCircle,
    warning: faExclamationTriangle,
    info: faInfoCircle,
  };

  // Cores adaptadas para o tema Dark/Cyan do Primeflix
  const accentColors = {
    success: 'text-green-400 border-green-500/50 bg-green-500',
    error: 'text-red-400 border-red-500/50 bg-red-500',
    warning: 'text-yellow-400 border-yellow-500/50 bg-yellow-500',
    info: 'text-pr-cyan border-pr-cyan/50 bg-pr-cyan',
  };

  const positions = {
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-center': 'top-6 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
  };

  return (
    <div 
      className={`fixed ${positions[position]} z-[200] transition-all duration-300 ease-out
                 ${isVisible && !isExiting ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'}`}
      role="alert"
    >
      <div className="relative flex items-center min-w-[320px] max-w-md bg-pr-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Barra de Progresso Temporal na Base */}
        <div 
          className={`absolute bottom-0 left-0 h-[3px] opacity-40 ${accentColors[type].split(' ')[2]}`}
          style={{ 
            width: '100%', 
            animation: `shrink ${duration}ms linear forwards` 
          }}
        />

        {/* Ícone com Glow sutil */}
        <div className={`p-4 ${accentColors[type].split(' ')[0]}`}>
          <FontAwesomeIcon icon={icons[type]} className="text-xl drop-shadow-[0_0_8px_currentColor]" />
        </div>
        
        {/* Conteúdo com Tipografia do Sistema */}
        <div className="flex-grow py-4 pr-2">
          {title && (
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white mb-1">
              {title}
            </h3>
          )}
          <p className="text-sm text-pr-gray-light font-medium">{message}</p>
        </div>
        
        {/* Botão de fechar */}
        <button
          onClick={handleClose}
          className="p-4 text-pr-gray hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <FontAwesomeIcon icon={faXmark} className="text-xs" />
        </button>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;