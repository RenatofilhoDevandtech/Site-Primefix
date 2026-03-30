import PropTypes from 'prop-types';
import Button from './Button'; 

const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center bg-transparent px-6 py-20">
      <div className="text-center max-w-lg animate-fade-in">
        
        {/* Ícone de Erro com Glow Neon Vermelho */}
        <div className="relative mb-8 inline-block">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full animate-pulse"></div>
          <svg 
            className="relative w-20 h-20 mx-auto text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Tipografia Alinhada ao Design System */}
        <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">
          Oops! Conexão Interrompida
        </h2>
        
        <p className="text-pr-gray-light text-base font-medium mb-10 max-w-sm mx-auto leading-relaxed opacity-80">
          {message || "Não conseguimos carregar as informações agora. Por favor, verifique sua internet ou tente novamente."}
        </p>

        {/* Botão com Brilho de Ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={onRetry} 
            variant="primary" 
            className="px-10 py-4 shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-pr-cyan/40 transition-all font-black uppercase tracking-widest text-[11px]"
          >
            Tentar Novamente
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="ghost" 
            className="text-pr-gray hover:text-white font-black uppercase tracking-widest text-[11px]"
          >
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorDisplay;