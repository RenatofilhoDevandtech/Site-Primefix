import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faTools, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logoImage from '../assets/logo.png';

const PlaceholderPage = ({ title, message }) => {
  return (
    <div className="min-h-screen bg-pr-black flex flex-col items-center justify-center text-white text-center p-6 selection:bg-pr-cyan selection:text-pr-black">
      
      {/* LOGO PADRONIZADA */}
      <header className="mb-16">
        <Link to="/">
          <img 
            src={logoImage} 
            alt="Siteprime Logo" 
            className="h-16 w-auto object-contain hover:opacity-80 transition-opacity" 
          />
        </Link>
      </header>

      <div className="relative max-w-2xl z-10 bg-pr-gray-dark/20 p-10 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl">
        <FontAwesomeIcon icon={faTools} className="text-5xl text-pr-cyan mb-8 opacity-50" />
        
        <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">
          {title}
        </h1>
        
        {/* CORREÇÃO AQUI: Removido 'text-lg', mantido apenas 'text-xs' para o padrão técnico */}
        <p className="text-xs text-pr-gray-light mb-10 leading-relaxed font-bold uppercase tracking-[0.2em] opacity-70">
          {message || 'O conteúdo desta página está em construção. Estamos preparando algo exclusivo para o catálogo.'}
        </p>
        
        {/* BOTÃO PADRÃO SITEPRIME */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 bg-pr-cyan text-pr-black font-black py-4 px-8 rounded-full hover:bg-white transition-all shadow-lg shadow-pr-cyan/20 uppercase tracking-tighter"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Voltar para a Home
        </Link>
      </div>

      {/* Efeito de iluminação de fundo */}
      <div className="absolute inset-0 bg-pr-cyan/5 blur-[120px] rounded-full scale-75 pointer-events-none" />
    </div>
  );
};

PlaceholderPage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default PlaceholderPage;