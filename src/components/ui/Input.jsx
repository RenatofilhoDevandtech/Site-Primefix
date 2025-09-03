/* eslint-disable react/prop-types */
import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
  // Classes base focadas em clareza, consistência e um estado de foco premium.
  const baseClasses = `
    w-full bg-pr-gray-dark border rounded-lg
    text-pr-gray-light placeholder:text-pr-gray 
    transition-all duration-300
    focus:outline-none focus:ring-2
    disabled:opacity-50 disabled:bg-pr-border disabled:cursor-not-allowed
    read-only:bg-pr-border read-only:cursor-not-allowed
  `;

  // Classes de tamanho
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  // Classes de variante
  const variantClasses = {
    default: `
      border-pr-border 
      focus:border-pr-cyan focus:ring-pr-cyan/50
    `,
    error: `
      border-red-500
      focus:border-red-500 focus:ring-red-500/50
    `,
    success: `
      border-green-500
      focus:border-green-500 focus:ring-green-500/50
    `,
    search: `
      border-pr-border rounded-full
      focus:border-pr-cyan focus:ring-pr-cyan/50
    `
  };

  // Combinar todas as classes
  const inputClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[error ? 'error' : success ? 'success' : variant]}
    ${className}
  `;

  // Renderizar ícone esquerdo se fornecido
  const renderIconLeft = () => {
    if (iconLeft) {
      return (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={iconLeft} className="text-pr-gray" />
        </div>
      );
    }
    return null;
  };

  // Renderizar ícone direito ou botão de limpar
  const renderIconRight = () => {
    if (clearable && props.value && !props.disabled) {
      return (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-pr-gray hover:text-pr-gray-light transition-colors"
          aria-label="Limpar campo"
        >
          <FontAwesomeIcon icon={faTimesCircle} />
        </button>
      );
    }
    
    if (iconRight) {
      return (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={iconRight} className="text-pr-gray" />
        </div>
      );
    }
    
    // Ícone para mostrar/ocultar senha
    if (type === 'password') {
      return (
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-pr-gray hover:text-pr-gray-light transition-colors"
          onClick={props.onTogglePasswordVisibility}
          aria-label={props.showPassword ? 'Ocultar senha' : 'Mostrar senha'}
        >
          <FontAwesomeIcon icon={props.showPassword ? faEyeSlash : faEye} />
        </button>
      );
    }
    
    return null;
  };

  // Ajustar padding quando há ícones
  const paddingClasses = `
    ${iconLeft ? 'pl-10' : ''}
    ${iconRight || clearable || type === 'password' ? 'pr-10' : ''}
  `;

  return (
    <div className="w-full">
      <div className="relative">
        {renderIconLeft()}
        
        <input
          ref={ref}
          type={type}
          className={`${inputClasses} ${paddingClasses}`}
          {...props}
        />
        
        {renderIconRight()}
      </div>
      
      {/* Mensagem de erro ou sucesso */}
      {(error || success) && (
        <p className={`mt-2 text-sm ${error ? 'text-red-500' : 'text-green-500'}`}>
          {error || (success && 'Campo válido!')}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;