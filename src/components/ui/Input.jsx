import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTimesCircle, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const Input = forwardRef(({ 
  type = 'text', 
  variant = 'default',
  size = 'md',
  className = '', 
  error = '',
  success = false,
  iconLeft = null,
  iconRight = null,
  clearable = false,
  onClear,
  ...props 
}, ref) => {

  // Fundo mais escuro para contraste com o BackgroundGlow e bordas arredondadas modernas
  const baseClasses = `
    w-full bg-pr-black/40 border backdrop-blur-sm
    text-white placeholder:text-pr-gray/60 
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-4
    disabled:opacity-40 disabled:cursor-not-allowed
    read-only:opacity-60
  `;

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-4 text-base'
  };

  const variantClasses = {
    default: `
      border-white/10 
      focus:border-pr-cyan focus:ring-pr-cyan/10
    `,
    error: `
      border-red-500/50 
      focus:border-red-500 focus:ring-red-500/10
    `,
    success: `
      border-green-500/50 
      focus:border-green-500 focus:ring-green-500/10
    `,
    search: `
      border-white/10 rounded-full bg-white/5
      focus:border-pr-cyan focus:ring-pr-cyan/10
    `
  };

  const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[error ? 'error' : success ? 'success' : variant]}
    ${iconLeft ? 'pl-11' : ''}
    ${(iconRight || clearable || type === 'password' || error || success) ? 'pr-11' : ''}
    ${className}
  `;

  return (
    <div className="w-full group">
      <div className="relative flex items-center">
        
        {/* Ícone Esquerdo */}
        {iconLeft && (
          <div className="absolute left-4 text-pr-gray group-focus-within:text-pr-cyan transition-colors duration-300">
            <FontAwesomeIcon icon={iconLeft} />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
        
        {/* Ícones de Estado e Ações à Direita */}
        <div className="absolute right-4 flex items-center gap-2">
          {clearable && props.value && !props.disabled && (
            <button
              type="button"
              onClick={onClear}
              className="text-pr-gray hover:text-white transition-colors"
              aria-label="Limpar"
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
          )}
          
          {type === 'password' && (
            <button
              type="button"
              className="text-pr-gray hover:text-pr-cyan transition-colors"
              onClick={props.onTogglePasswordVisibility}
            >
              <FontAwesomeIcon icon={props.showPassword ? faEyeSlash : faEye} />
            </button>
          )}

          {iconRight && !error && !success && (
            <FontAwesomeIcon icon={iconRight} className="text-pr-gray" />
          )}

          {error && <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500 animate-pulse" />}
          {success && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
        </div>
      </div>
      
      {/* Mensagem de Feedback com Animação */}
      {error && (
        <p className="mt-1.5 ml-1 text-[11px] font-bold uppercase tracking-wider text-red-500 animate-fade-in-fast">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;