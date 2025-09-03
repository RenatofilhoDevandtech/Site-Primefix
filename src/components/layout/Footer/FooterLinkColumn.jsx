import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FooterLinkColumn = ({ title, links }) => (
  <div>
    <h4 className="text-lg text-pr-gray-light font-semibold mb-4">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link to={link.to} className="hover:text-pr-cyan transition-colors flex items-center gap-2 group">
            <span className="w-1 h-1 bg-pr-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Adicionando validação de props para robustez
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