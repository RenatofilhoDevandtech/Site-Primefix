import PropTypes from 'prop-types';
import Button from './Button'; // Assume que você tem um componente de botão genérico

const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-pr-black to-pr-gray-dark/30 px-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Oops! Algo deu errado.</h2>
        <p className="text-pr-gray-light mb-8">{message}</p>
        <Button onClick={onRetry} variant="primary" size="lg">
          Tentar Novamente
        </Button>
      </div>
    </div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorDisplay;