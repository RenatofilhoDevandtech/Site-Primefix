import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { navLinks } from './header.data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const MobileMenu = ({ isOpen, onClose }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        const node = menuRef.current; 

        const focusableElements = node.querySelectorAll('a[href], button, input');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKeyPress = (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) { 
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else { 
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        firstElement?.focus();
        node.addEventListener('keydown', handleTabKeyPress);
        return () => node?.removeEventListener('keydown', handleTabKeyPress);
    }, [isOpen]);

    // ESTILO PADRONIZADO: Sem itálicos, Uppercase e Tracking
    const mobileNavLinkStyles = ({ isActive }) => {
      const baseClasses = 'block py-5 px-6 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 border-l-4';
      return isActive 
        ? `${baseClasses} border-pr-cyan bg-pr-cyan/10 text-pr-cyan shadow-[inset_10px_0_15px_-10px_rgba(0,255,255,0.3)]` 
        : `${baseClasses} border-transparent text-pr-gray-light hover:text-white hover:bg-white/5`;
    };

    if (!isOpen) return null;

    return (
        <div 
            ref={menuRef} 
            className="fixed inset-0 z-40 mt-16 bg-pr-black/98 backdrop-blur-2xl md:hidden animate-fade-in border-t border-white/5"
        >
            <div className="p-6">
                {/* CAMPO DE BUSCA PADRONIZADO */}
                <div className="relative mb-10">
                    <input 
                        type="search" 
                        placeholder="BUSCAR NO CATÁLOGO..." 
                        className="bg-white/5 border border-white/10 rounded-full py-4 px-6 w-full text-white text-[10px] font-bold uppercase tracking-widest placeholder:text-pr-gray focus:outline-none focus:border-pr-cyan focus:ring-1 focus:ring-pr-cyan/30 transition-all" 
                    />
                    <FontAwesomeIcon icon={faSearch} className="absolute right-6 top-1/2 -translate-y-1/2 text-pr-cyan text-sm" />
                </div>
                
                {/* NAVEGAÇÃO MOBILE */}
                <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.to}
                            className={mobileNavLinkStyles}
                            onClick={onClose}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* DECORAÇÃO DE FUNDO (Sutil) */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
                    <p className="text-[10px] font-black tracking-[0.5em] text-pr-gray uppercase">
                        Siteprime © 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

MobileMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MobileMenu;