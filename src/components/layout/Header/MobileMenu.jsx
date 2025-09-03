import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { navLinks } from './header.data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const MobileMenu = ({ isOpen, onClose }) => {
    const menuRef = useRef(null);

    // Efeito para "prender" o foco dentro do menu (Focus Trapping)
    useEffect(() => {
        if (!isOpen) return;

        // CORREÇÃO PARA react-hooks/exhaustive-deps:
        // Guardamos o ref.current numa variável local ao efeito.
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

        // Usamos a variável local na função de limpeza.
        return () => node?.removeEventListener('keydown', handleTabKeyPress);
    }, [isOpen]);

    // Estilo para o link de navegação ativo no menu mobile
    const mobileNavLinkStyles = ({ isActive }) => {
      const baseClasses = 'block py-3 px-4 text-lg transition-colors duration-300 border-l-4';
      return isActive 
        ? `${baseClasses} border-pr-cyan bg-pr-black/30 text-pr-cyan` 
        : `${baseClasses} border-transparent text-pr-gray hover:text-pr-cyan hover:bg-pr-black/20`;
    };

    if (!isOpen) return null;

    return (
        <div ref={menuRef} className="fixed inset-0 z-40 mt-16 bg-pr-black/95 backdrop-blur-xl md:hidden animate-fade-in">
            <div className="p-4">
                {/* Campo de busca mobile */}
                <div className="relative mb-6">
                    <input type="search" placeholder="Buscar títulos..." className="bg-pr-gray-dark/70 border border-pr-border/50 rounded-full py-3 px-4 w-full text-white placeholder:text-pr-gray focus:outline-none focus:border-pr-cyan" />
                    <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-pr-gray" />
                </div>
                
                {/* Navegação mobile */}
                <nav className="space-y-1">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.to}
                            className={mobileNavLinkStyles}
                            onClick={onClose} // Usamos a prop onClose para fechar o menu!
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};

MobileMenu.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MobileMenu;