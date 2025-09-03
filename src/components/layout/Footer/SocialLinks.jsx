import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const SocialLinks = ({ links }) => (
  <div>
    <h4 className="text-lg text-pr-gray-light font-semibold mb-4">Siga-nos</h4>
    <div className="flex space-x-3">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          aria-label={link.label}
          target="_blank" // Abrir em nova aba
          rel="noopener noreferrer" // Boas práticas de segurança
          className="w-10 h-10 flex items-center justify-center rounded-full bg-pr-black/20 text-pr-gray hover:bg-pr-cyan hover:text-pr-black transition-all duration-300 transform hover:scale-110"
        >
          <FontAwesomeIcon icon={link.icon} />
        </a>
      ))}
    </div>
  </div>
);

SocialLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SocialLinks;