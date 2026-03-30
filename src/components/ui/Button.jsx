import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
  
  // Classes base: Adicionado tracking-widest e uppercase para o look Prime
  const baseClasses = `
    inline-flex items-center justify-center font-black uppercase tracking-widest
    transition-all duration-300 ease-out select-none
    focus:outline-none focus:ring-4
    disabled:opacity-30 disabled:cursor-not-allowed disabled:grayscale
    active:scale-95 will-change-transform
    ${fullWidth ? 'w-full' : ''}
  `;

  const sizeClasses = {
    sm: 'px-4 py-2 text-[10px] rounded-lg',
    md: 'px-6 py-3 text-[11px] rounded-xl',
    lg: 'px-8 py-4 text-xs rounded-2xl',
    xl: 'px-10 py-5 text-sm rounded-2xl'
  };

  const variantClasses = {
    primary: `
      bg-pr-cyan text-pr-black 
      hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:brightness-110
      focus:ring-pr-cyan/20
    `,
    secondary: `
      bg-white/5 text-white backdrop-blur-md 
      border border-white/10 
      hover:bg-white/10 hover:border-white/20
      focus:ring-white/10
    `,
    danger: `
      bg-red-600 text-white
      hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:bg-red-700
      focus:ring-red-600/20
    `,
    ghost: `
      bg-transparent text-pr-gray-light
      hover:bg-white/5 hover:text-white
      focus:ring-white/5
    `,
    outline: `
      bg-transparent text-pr-cyan border-2 border-pr-cyan/50
      hover:border-pr-cyan hover:bg-pr-cyan/5
      focus:ring-pr-cyan/10
    `,
  };

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
    ${loading ? 'cursor-wait' : ''}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {/* Container para manter o alinhamento mesmo com spinner */}
      <div className="flex items-center justify-center gap-2.5">
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin opacity-70" />
        ) : iconLeft ? (
          <FontAwesomeIcon icon={iconLeft} className="text-current opacity-80" />
        ) : null}
        
        <span className="relative top-[0.5px]">{children}</span>
        
        {iconRight && !loading && (
          <FontAwesomeIcon icon={iconRight} className="text-current opacity-80" />
        )}
      </div>
    </button>
  );
};

export default Button;