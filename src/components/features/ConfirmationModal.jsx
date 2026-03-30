import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExclamationTriangle, 
  faCheckCircle, 
  faInfoCircle,
  faQuestionCircle,
  faTimes,
  faShieldHeart
} from '@fortawesome/free-solid-svg-icons';
import Button from '../ui/Button';

const modalConfig = {
  warning: { icon: faExclamationTriangle, iconColor: 'text-yellow-400', bgColor: 'bg-yellow-400/10', border: 'border-yellow-400/20', buttonVariant: 'warning' },
  danger: { icon: faExclamationTriangle, iconColor: 'text-red-500', bgColor: 'bg-red-500/10', border: 'border-red-500/20', buttonVariant: 'danger' },
  success: { icon: faCheckCircle, iconColor: 'text-green-500', bgColor: 'bg-green-500/10', border: 'border-green-500/20', buttonVariant: 'success' },
  info: { icon: faInfoCircle, iconColor: 'text-pr-cyan', bgColor: 'bg-pr-cyan/10', border: 'border-pr-cyan/20', buttonVariant: 'primary' },
  default: { icon: faQuestionCircle, iconColor: 'text-pr-cyan', bgColor: 'bg-pr-cyan/10', border: 'border-pr-cyan/20', buttonVariant: 'primary' }
};

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
};

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  type = 'default',
  confirmText = 'Confirmar',
  cancelText = 'Voltar',
  size = 'md'
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const config = modalConfig[type] || modalConfig.default;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
    } else {
      const timer = setTimeout(() => setIsMounted(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Overlay de Alta Fidelidade */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Container do Modal */}
      <div
        className={`relative w-full ${sizeClasses[size]} bg-[#0a0a0a]/90 backdrop-blur-3xl border-t sm:border border-white/10 
        rounded-t-[32px] sm:rounded-[40px] shadow-[0_20px_100px_rgba(0,0,0,0.8)] transition-all duration-500 transform
        ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 sm:translate-y-0 sm:scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra de arraste visual para Mobile */}
        <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-4 sm:hidden"></div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/20 hover:text-pr-cyan transition-all p-2 rounded-xl hover:bg-white/5"
          aria-label="Fechar"
        >
          <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
        </button>

        <div className="p-8 md:p-10">
          <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6">
            {/* Ícone com Aura de Brilho */}
            <div className={`flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-[22px] ${config.bgColor} border ${config.border} relative group`}>
               <div className={`absolute inset-0 rounded-[22px] blur-xl opacity-20 ${config.bgColor}`}></div>
               <FontAwesomeIcon icon={config.icon} className={`h-7 w-7 ${config.iconColor} relative z-10`} />
            </div>
            
            <div className="flex-grow text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                {title}
              </h2>
              <p className="text-sm text-white/50 mt-3 leading-relaxed tracking-wide">
                {message}
              </p>
            </div>
          </div>
        </div>
        
        {/* Rodapé de Ação */}
        <div className="px-8 pb-10 sm:pb-10 flex flex-col sm:flex-row sm:justify-end gap-3">
          <Button 
            variant="secondary" 
            onClick={onClose}
            className="w-full sm:w-auto order-2 sm:order-1 bg-white/5 border-white/5 text-white/60 hover:text-white h-14 sm:h-12 rounded-2xl md:rounded-full text-[10px] uppercase tracking-[2px] font-black"
          >
            {cancelText}
          </Button>
          <Button 
            variant={config.buttonVariant} 
            onClick={onConfirm}
            className="w-full sm:w-auto order-1 sm:order-2 h-14 sm:h-12 rounded-2xl md:rounded-full text-[10px] uppercase tracking-[2px] font-black shadow-lg"
          >
            {confirmText}
          </Button>
        </div>

        {/* Badge de Segurança Subtil */}
        <div className="hidden sm:flex items-center justify-center gap-2 pb-6 opacity-10">
           <FontAwesomeIcon icon={faShieldHeart} className="text-[10px]" />
           <span className="text-[9px] uppercase tracking-[2px]">Cresce Ai Trusted System</span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;