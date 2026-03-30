import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const SocialLinks = ({ links }) => (
  <div className="flex flex-col items-center md:items-start">
    {/* Título com o padrão de espaçamento cinematográfico */}
    <h4 className="text-[10px] uppercase tracking-[4px] text-white/50 font-black mb-6">
      Social Experience
    </h4>
    
    <div className="flex items-center gap-4 md:gap-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-12 h-12 md:w-10 md:h-10 
            flex items-center justify-center 
            rounded-2xl md:rounded-xl 
            bg-white/[0.03] border border-white/5 
            text-pr-gray-light
            transition-all duration-500
            hover:bg-pr-cyan hover:text-pr-black hover:border-pr-cyan
            hover:shadow-[0_0_20px_rgba(0,242,254,0.4)]
            hover:-translate-y-1
            group
          "
        >
          <FontAwesomeIcon 
            icon={link.icon} 
            className="text-lg md:text-sm group-hover:scale-110 transition-transform" 
          />
        </a>
      ))}
    </div>
  </div>
);

SocialLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SocialLinks;