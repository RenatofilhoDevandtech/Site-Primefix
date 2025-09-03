/* eslint-disable react/prop-types */
// Componente Spinner refinado para o Design System Primeflix

const Spinner = ({ 
  size = 'md', 
  variant = 'primary',
  className = '',
  label = 'Carregando...',
  center = false 
}) => {
  // Mapeamento de tamanhos para classes do Tailwind
  const sizeClasses = {
    xs: 'w-4 h-4 border-2',
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4',
  };

  // Variantes de cor
  const variantClasses = {
    primary: 'border-pr-border border-t-pr-cyan',
    secondary: 'border-pr-border border-t-pr-gray-light',
    success: 'border-pr-border border-t-green-500',
    danger: 'border-pr-border border-t-red-500',
    warning: 'border-pr-border border-t-yellow-500',
    light: 'border-white/20 border-t-white',
    dark: 'border-pr-black/20 border-t-pr-black',
  };

  // Anel com uma "trilha" sutil e um segmento primário vibrante que gira
  const baseClasses = `
    rounded-full animate-spin
    ${variantClasses[variant]}
  `;

  // Container para centralizar se necessário
  const containerClasses = `
    inline-flex items-center justify-center
    ${center ? 'w-full h-full flex items-center justify-center' : ''}
  `;

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      <div 
        className={`${baseClasses} ${sizeClasses[size]} ${className}`}
        aria-label={label}
      >
        {/* Elemento visual do spinner */}
      </div>
      
      {/* Label opcional para acessibilidade */}
      {label && (
        <span className="sr-only">
          {label}
        </span>
      )}
    </div>
  );
};

export default Spinner;