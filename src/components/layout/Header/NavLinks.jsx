import { NavLink } from 'react-router-dom';
// 1. Importamos o array 'navLinks' do nosso ficheiro de dados.
import { navLinks } from './header.data'; 

const NavLinks = () => {
  // 2. Definimos a função que calcula os estilos. 
  // O NavLink do react-router-dom nos dá o parâmetro 'isActive' automaticamente.
  const navLinkStyles = ({ isActive }) => {
    const baseClasses = 'relative text-base font-medium transition-all duration-300 group';
    // Se o link estiver ativo (corresponde à URL atual), adicionamos classes extras.
    if (isActive) {
      return `${baseClasses} text-pr-cyan after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-pr-cyan after:rounded-full`;
    }
    // Senão, retornamos as classes padrão.
    return `${baseClasses} text-pr-gray hover:text-pr-cyan`;
  };

  return (
    // 3. Usamos um Fragment (<>) para agrupar a lista de links.
    <>
      {/* 4. Usamos .map() para percorrer cada item do array 'navLinks'. */}
      {navLinks.map((link) => (
        // 5. Para cada item, criamos um componente <NavLink>.
        <NavLink 
          key={link.label} // A 'key' é essencial para o React otimizar a renderização de listas.
          to={link.to}     // O atributo 'to' recebe o caminho do nosso objeto de dados.
          className={navLinkStyles} // A 'className' usa nossa função de estilos.
        >
          {/* O <span> interno é para o efeito de zoom no texto ao passar o mouse. */}
          <span className="group-hover:scale-105 transition-transform inline-block">
            {link.label} {/* O 'label' do nosso objeto de dados é renderizado como o texto do link. */}
          </span>
        </NavLink>
      ))}
    </>
  );
};

export default NavLinks;