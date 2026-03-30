import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FooterLinkColumn = ({ title, links }) => (
  <div className="flex flex-col items-center md:items-start w-full">
    {/* Título com espaçamento e tipografia de luxo */}
    <h4 className="text-sm md:text-base text-white font-bold uppercase tracking-[3px] mb-6 md:mb-8 opacity-90">
      {title}
    </h4>
    
    <ul className="space-y-4 md:space-y-3 w-full flex flex-col items-center md:items-start">
      {links.map((link) => (
        <li key={link.label} className="w-full flex justify-center md:justify-start">
          <Link 
            to={link.to} 
            className="text-sm text-pr-gray hover:text-pr-cyan transition-all duration-300 flex items-center gap-3 group relative py-1"
          >
            {/* O Ponto Cyan: Escondido no mobile para evitar ruído, surge no hover no Desktop */}
            <span className="hidden md:block w-1.5 h-1.5 bg-pr-cyan rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_#00f2fe]" />
            
            <span className="tracking-wide group-hover:translate-x-1 md:group-hover:translate-x-0 transition-transform">
              {link.label}
            </span>

            {/* Sublinhado animado para Mobile - Toque de Modernidade */}
            <span className="absolute bottom-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-0 h-[1px] bg-pr-cyan/40 group-hover:w-1/2 md:group-hover:w-full transition-all duration-500" />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

FooterLinkColumn.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FooterLinkColumn;