import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCrown } from '@fortawesome/free-solid-svg-icons';
import { useScroll } from '../../hooks/useScroll';
import logoImage from '../../assets/Logo.png';
import NavLinks from './Header/NavLinks';
import Search from './Header/Search';
import ProfileDropdown from './Header/ProfileDropdown';
import NotificationDropdown from './Header/NotificationDropdown';
import MobileMenu from './Header/MobileMenu';
import { useAuth } from '../../hooks/useAuth';

const SCROLL_THRESHOLD = 50;

const Header = () => {
  const scrolled = useScroll(SCROLL_THRESHOLD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const headerClasses = `
    fixed top-0 left-0 right-0 z-[100] h-20 flex items-center justify-between px-4 md:px-10
    transition-all duration-500 ease-in-out
    ${scrolled
      ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
      : 'bg-gradient-to-b from-black/90 via-black/20 to-transparent'
    }
  `;

  return (
    <>
      <header className={headerClasses}>
        {/* LADO ESQUERDO: LOGO E NAV CENTRALIZADA NO MOBILE */}
        <div className="flex items-center gap-8">
          <Link to="/" aria-label="Home Cresce Ai" className="flex items-center group shrink-0">
            <img 
              src={logoImage} 
              alt="Cresce Ai" 
              className="h-8 md:h-11 w-auto transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(0,242,254,0.5)]" 
            />
          </Link>

          <nav className="hidden lg:flex items-center">
            <NavLinks />
          </nav>
        </div>

        {/* LADO DIREITO: AÇÕES E CONVERSÃO */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* BOTÃO DE PLANO ESTRATÉGICO (Visível no Mobile e Desktop) */}
          <Link 
            to="/subscribe" 
            className="hidden sm:flex items-center gap-2 bg-pr-cyan/10 hover:bg-pr-cyan text-pr-cyan hover:text-pr-black border border-pr-cyan/20 px-4 py-2 rounded-full transition-all duration-300 group"
          >
            <FontAwesomeIcon icon={faCrown} className="text-[10px] group-hover:animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-widest">Planos</span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <Search />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3 md:gap-5">
                <NotificationDropdown />
                <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
                <ProfileDropdown user={user} />
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-[10px] font-black uppercase tracking-widest text-white hover:text-pr-cyan transition-colors px-2"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* MENU HAMBURGER COM FEEDBACK VISUAL */}
          <button 
            className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-300 ${
              isMenuOpen ? 'bg-pr-cyan text-pr-black' : 'bg-white/5 text-pr-cyan'
            }`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Abrir Menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl" />
          </button>
        </div>
      </header>

      {/* MENU LATERAL MOBILE - Otimizado para UX */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;