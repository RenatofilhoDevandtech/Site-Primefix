import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PlaceholderPage = ({ title, message }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-white text-center p-4 animate-fade-in">
      <FontAwesomeIcon icon={faTools} className="text-5xl text-pr-cyan mb-6" />
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg text-pr-gray-light max-w-2xl mb-8">
        {message || 'O conteúdo desta página está em construção. Agradecemos a sua paciência enquanto preparamos algo incrível para você.'}
      </p>
      <Link
        to="/"
        className="bg-pr-cyan hover:bg-pr-cyan/90 text-pr-black font-medium py-3 px-6 rounded-lg transition duration-300 inline-block"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

PlaceholderPage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default PlaceholderPage;