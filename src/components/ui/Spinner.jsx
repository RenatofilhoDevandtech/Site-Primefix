const Spinner = ({ 
  size = 'md', 
  variant = 'primary',
  className = '',
  label = 'Carregando...',
  center = false 
}) => {
  // Ajuste de espessura de borda para look mais moderno (border-t-2)
  const sizeClasses = {
    xs: 'w-4 h-4 border-2',
    sm: 'w-6 h-6 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-[5px]',
  };

  // Variantes com efeito de brilho (shadow) no segmento de cor
  const variantClasses = {
    primary: 'border-white/10 border-t-pr-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]',
    secondary: 'border-white/10 border-t-pr-gray-light',
    success: 'border-white/10 border-t-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]',
    danger: 'border-white/10 border-t-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]',
    warning: 'border-white/10 border-t-yellow-500',
    light: 'border-white/5 border-t-white',
    dark: 'border-pr-black/20 border-t-pr-black',
  };

  // Animação suave com ease-in-out para um feeling mais orgânico
  const baseClasses = `
    rounded-full animate-spin
    ${variantClasses[variant]}
  `;

  const containerClasses = `
    inline-flex items-center justify-center
    ${center ? 'min-h-[200px] w-full flex items-center justify-center' : ''}
  `;

  return (
    <div className={`${containerClasses} ${className}`} role="status" aria-live="polite">
      <div 
        className={`${baseClasses} ${sizeClasses[size]}`}
        aria-label={label}
      >
      </div>
      
      {/* Label para acessibilidade */}
      {label && (
        <span className="sr-only">
          {label}
        </span>
      )}
    </div>
  );
};

export default Spinner;