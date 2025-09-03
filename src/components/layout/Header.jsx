import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faBell } from '@fortawesome/free-solid-svg-icons';
import { useScroll } from '../../hooks/useScroll';
import logoImage from '../../assets/Logo.png';
import NavLinks from './Header/NavLinks';
import Search from './Header/Search';
import ProfileDropdown from './Header/ProfileDropdown';
import MobileMenu from './Header/MobileMenu';
import { useAuth } from '../../hooks/useAuth';

const SCROLL_THRESHOLD = 50;

const Header = () => {
  const scrolled = useScroll(SCROLL_THRESHOLD);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4
    transition-all duration-300 ease-in-out
    ${scrolled
      ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg'
      : 'bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm'
    }
  `;

  return (
    <>
      <header className={headerClasses}>
        <div className="flex items-center gap-4">
          <Link to="/" aria-label="Página Inicial" className="flex items-center gap-2 group">
            <img src={logoImage} alt="Logo Primeflix" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
            <span className="text-2xl font-bold text-pr-cyan tracking-wider group-hover:text-white transition-colors duration-300 hidden sm:block">
              PRIMEFLIX
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <NavLinks />
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Search />
          {isAuthenticated && (
            <>
              <button className="relative text-pr-gray hover:text-pr-cyan" aria-label="Notificações">
                <FontAwesomeIcon icon={faBell} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <ProfileDropdown user={user} />
            </>
          )}
          <button className="lg:hidden text-pr-gray" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu" aria-expanded={isMenuOpen}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;