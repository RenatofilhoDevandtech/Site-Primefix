/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExclamationTriangle, 
  faCheckCircle, 
  faInfoCircle,
  faQuestionCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button';

// --- CONFIGURAÇÃO (definida fora do componente para melhor desempenho) ---
const modalConfig = {
  warning: { icon: faExclamationTriangle, iconColor: 'text-yellow-400', bgColor: 'bg-yellow-400/10', buttonVariant: 'warning' },
  danger: { icon: faExclamationTriangle, iconColor: 'text-red-500', bgColor: 'bg-red-500/10', buttonVariant: 'danger' },
  success: { icon: faCheckCircle, iconColor: 'text-green-500', bgColor: 'bg-green-500/10', buttonVariant: 'success' },
  info: { icon: faInfoCircle, iconColor: 'text-blue-400', bgColor: 'bg-blue-400/10', buttonVariant: 'primary' },
  default: { icon: faQuestionCircle, iconColor: 'text-primary', bgColor: 'bg-primary/10', buttonVariant: 'primary' }
};

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
};

// --- COMPONENTE ---
const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  type = 'default',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  size = 'md'
}) => {
  const modalRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const config = modalConfig[type] || modalConfig.default;

  // Animação de entrada e saída
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Fechar com a tecla Esc
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Conteúdo do Modal */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size]} bg-secondary/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CORREÇÃO: Adicionado o botão de fechar no canto superior direito */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-muted hover:text-text-light transition-colors p-2 rounded-full hover:bg-white/10"
          aria-label="Fechar modal"
        >
          <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
        </button>

        <div className="flex items-start p-6">
          <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full ${config.bgColor} mr-4`}>
            <FontAwesomeIcon icon={config.icon} className={`h-5 w-5 ${config.iconColor}`} />
          </div>
          
          <div className="flex-grow">
            <h2 id="modal-title" className="text-xl font-bold text-text-light">
              {title}
            </h2>
            <p id="modal-description" className="text-sm text-text-muted mt-2">
              {message}
            </p>
          </div>
        </div>
        
        <div className="bg-black/20 px-6 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 rounded-b-xl">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={config.buttonVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

