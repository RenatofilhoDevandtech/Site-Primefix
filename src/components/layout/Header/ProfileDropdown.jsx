import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { profileLinks, profileActions } from './header.data';
import PropTypes from 'prop-types';

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Nosso custom hook em ação!
  const profileNode = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={profileNode} className="relative">
      <button
        className="flex items-center gap-2 text-pr-gray hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-pr-cyan to-blue-500 rounded-full flex items-center justify-center font-semibold text-pr-black">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <FontAwesomeIcon icon={faCaretDown} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* A mágica acontece aqui: preenchemos o menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-pr-gray-dark/95 backdrop-blur-lg rounded-lg shadow-xl border border-pr-border/30 overflow-hidden animate-fade-in-fast">
          {/* Seção de Informações do Utilizador */}
          <div className="p-4 border-b border-pr-border/30">
            <p className="text-white font-medium truncate">{user.name}</p>
            <p className="text-pr-gray text-sm truncate">{user.email}</p>
          </div>
          
          {/* Seção de Links de Navegação */}
          <div className="p-2">
            {profileLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-3 px-3 py-2 text-pr-gray hover:text-white hover:bg-pr-black/30 rounded-md transition-colors"
                onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
              >
                <FontAwesomeIcon icon={link.icon} className="w-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
          
          {/* Seção de Ações */}
          <div className="p-2 border-t border-pr-border/30">
            {profileActions.map((action) => (
               <button
                key={action.label}
                onClick={() => { action.onClick(); setIsOpen(false); }}
                className="flex items-center gap-3 w-full px-3 py-2 text-pr-gray hover:text-white hover:bg-pr-black/30 rounded-md transition-colors"
              >
                <FontAwesomeIcon icon={action.icon} className="w-4" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Adicionamos a validação de props para garantir que o componente recebe o que espera.
ProfileDropdown.propTypes = {
  user: PropTypes.shape({ 
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired 
  }).isRequired,
};

export default ProfileDropdown;