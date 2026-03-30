import { NavLink } from 'react-router-dom';
import { navLinks } from './header.data'; 

const NavLinks = () => {
  // 1. Função de estilos com melhor feedback visual
  const navLinkStyles = ({ isActive }) => {
    // Adicionado padding vertical (py-2) para aumentar a área de clique
    const baseClasses = 'relative text-base font-medium transition-all duration-300 group py-2 px-1';
    
    if (isActive) {
      return `${baseClasses} text-pr-cyan after:content-[''] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-pr-cyan after:rounded-full after:shadow-[0_0_10px_#00ffff]`;
    }
    
    return `${baseClasses} text-pr-gray hover:text-white`;
  };

  return (
    <div className="flex items-center gap-8">
      {navLinks.map((link) => (
        <NavLink 
          key={link.label} 
          to={link.to}     
          className={navLinkStyles}
        >
          {/* O span mantém o efeito de escala sutil no hover */}
          <span className="group-hover:scale-105 transition-transform inline-block pointer-events-none">
            {link.label}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;