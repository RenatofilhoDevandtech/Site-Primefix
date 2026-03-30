import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import logoImage from '../assets/Logo.png'; // Caminho corrigido para um nível acima

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-pr-black flex flex-col items-center justify-center text-white p-6 selection:bg-pr-cyan selection:text-pr-black">
      
      {/* --- CABEÇALHO COM LOGO AJUSTADA --- */}
      <header className="mb-20 flex justify-center"> {/* Aumentei a margem inferior para dar respiro */}
        <Link to="/" className="block group">
          <img 
            src={logoImage} 
            alt="Siteprime Logo" 
            // AJUSTE DE TAMANHO: Aumentei de h-12 para h-20 (80px) para ter presença de marca.
            // O w-auto mantém a proporção.
            className="h-20 w-auto object-contain group-hover:opacity-80 transition-opacity drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]" 
          />
        </Link>
      </header>
      
      {/* Container de Erro - Mantido do design original */}
      <div className="relative text-center max-w-xl"> {/* Aumentei levemente o max-w para equilibrar com a logo maior */}
        
        {/* Glow de fundo */}
        <div className="absolute inset-0 bg-pr-cyan/5 blur-3xl rounded-full scale-150" />
        
        <div className="relative z-10 bg-pr-gray-dark/20 p-10 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl">
          
          <div className="flex items-center justify-center gap-2 mb-6 text-pr-cyan opacity-50">
             <FontAwesomeIcon icon={faFilm} className="text-sm" />
             <span className="text-xs uppercase font-bold tracking-widest">SISTEMA INTERROMPIDO</span>
          </div>

          <h1 className="text-9xl font-black text-pr-cyan mb-2 tracking-tighter drop-shadow-[0_0_20px_rgba(0,255,255,0.3)]">
            404
          </h1>
          
          <h2 className="text-3xl font-black mb-8 text-white uppercase tracking-tighter leading-none">
            PÁGINA <span className="text-pr-gray-light">NÃO</span> ENCONTRADA
          </h2>
          
          <p className="text-lg text-pr-gray-light mb-10 leading-relaxed max-w-md mx-auto">
            O endereço solicitado não foi localizado ou o conteúdo não está mais disponível em nossos servidores.
          </p>
          
          {/* BOTÃO PADRÃO SITEPRIME */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 bg-pr-cyan text-pr-black font-bold py-4 px-8 rounded-full hover:bg-white transition-colors shadow-lg shadow-pr-cyan/20 uppercase tracking-tighter"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;