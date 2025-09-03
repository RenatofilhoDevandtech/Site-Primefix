/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Componente de Botão final para o Design System Primeflix
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  type = 'button', 
  className = '', 
  disabled = false, 
  loading = false,
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  ...props 
}) => {
  // Classes base universais para todos os botões
  const baseClasses = `
    inline-flex items-center justify-center font-bold rounded-lg 
    transition-all duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pr-black
    disabled:opacity-40 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  // Classes de tamanho
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
    xl: 'px-10 py-4 text-xl'
  };

  // Classes específicas para cada variante, com propósito e hierarquia claros
  const variantClasses = {
    primary: `
      bg-pr-cyan text-pr-black 
      hover:brightness-110 hover:shadow-lg hover:shadow-pr-cyan/30
      active:brightness-95 active:scale-95
      shadow-lg shadow-pr-cyan/20
      focus:ring-pr-cyan
    `,
    secondary: `
      bg-pr-gray-dark/50 text-pr-gray-light backdrop-blur-md 
      border border-pr-border 
      hover:bg-pr-gray-dark/80 hover:shadow-lg hover:shadow-pr-gray/10
      active:brightness-95 active:scale-95
      focus:ring-pr-gray-light
    `,
    danger: `
      bg-pr-red text-pr-black
      hover:brightness-110 hover:shadow-lg hover:shadow-pr-red/30
      active:brightness-95 active:scale-95
      shadow-lg shadow-pr-red/20
      focus:ring-pr-red
    `,
    success: `
      bg-green-600 text-white
      hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30
      active:brightness-95 active:scale-95
      shadow-lg shadow-green-600/20
      focus:ring-green-500
    `,
    warning: `
      bg-yellow-500 text-pr-black
      hover:bg-yellow-600 hover:shadow-lg hover:shadow-yellow-500/30
      active:brightness-95 active:scale-95
      shadow-lg shadow-yellow-500/20
      focus:ring-yellow-400
    `,
    ghost: `
      bg-transparent text-pr-gray
      hover:bg-pr-border hover:text-pr-gray-light
      active:bg-pr-border/80
      focus:ring-pr-gray
    `,
    outline: `
      bg-transparent text-pr-cyan border-2 border-pr-cyan
      hover:bg-pr-cyan hover:text-pr-black
      active:bg-pr-cyan/90
      focus:ring-pr-cyan
    `,
    outlineSecondary: `
      bg-transparent text-pr-gray-light border-2 border-pr-border
      hover:bg-pr-border hover:text-pr-gray-light
      active:bg-pr-border/80
      focus:ring-pr-gray
    `,
  };

  // Combinar todas as classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
    ${loading ? 'opacity-70 cursor-not-allowed' : ''}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {/* Ícone esquerdo ou spinner de loading */}
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
      ) : iconLeft ? (
        <FontAwesomeIcon icon={iconLeft} className="mr-2" />
      ) : null}
      
      {/* Conteúdo do botão */}
      {children}
      
      {/* Ícone direito */}
      {iconRight && !loading && (
        <FontAwesomeIcon icon={iconRight} className="ml-2" />
      )}
    </button>
  );
};

export default Button;