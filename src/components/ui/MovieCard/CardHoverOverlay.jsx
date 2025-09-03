import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faHeart, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types'; // Agora será usado

const CardHoverOverlay = ({ isHovered, movieData, onAddToList, isInList }) => {
  const handleActionClick = (e, action) => {
    e.stopPropagation(); // Impede que o clique se propague para o card principal
    if (action) action();
  };
  
  return (
    <div className={`absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex justify-between items-start">
        {movieData.rating && (
          <div className="flex items-center bg-black/50 text-white px-2 py-1 rounded text-sm font-bold backdrop-blur-sm">
            <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-400" />
            {movieData.rating.toFixed(1)}
          </div>
        )}
        <button
          onClick={(e) => handleActionClick(e, onAddToList)}
          title={isInList ? 'Remover da lista' : 'Adicionar à lista'}
          aria-label={isInList ? 'Remover da lista' : 'Adicionar à lista'}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 backdrop-blur-sm
                      ${isInList 
                        ? 'bg-pr-cyan text-pr-black scale-110' 
                        : 'bg-black/50 text-white hover:bg-pr-cyan hover:text-pr-black hover:scale-110'
                      }`}
        >
          {/* O ícone muda com base na prop isInList */}
          <FontAwesomeIcon icon={isInList ? faClock : faHeart} size="sm" />
        </button>
      </div>
      
      <div className="flex-grow flex items-center justify-center">
         <div className="bg-black/50 rounded-full p-2 transform transition-transform duration-300 group-hover:scale-110">
            <FontAwesomeIcon icon={faPlayCircle} className="text-pr-cyan text-4xl opacity-90 drop-shadow-lg" />
         </div>
      </div>
      
      <div className="transform transition-transform duration-300 group-hover:translate-y-0">
        <h3 className="font-bold text-lg text-white leading-tight line-clamp-2">{movieData.title}</h3>
        <div className="flex items-center justify-between mt-1 text-sm text-pr-gray-light">
          <p>{movieData.releaseYear}</p>
          <p>{movieData.formattedRuntime}</p>
        </div>
      </div>
    </div>
  );
};

// Adicionando o bloco de PropTypes para corrigir o erro e validar as props
CardHoverOverlay.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  movieData: PropTypes.shape({
    title: PropTypes.string,
    rating: PropTypes.number,
    releaseYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    formattedRuntime: PropTypes.string,
  }).isRequired,
  onAddToList: PropTypes.func.isRequired,
  isInList: PropTypes.bool.isRequired,
};

export default CardHoverOverlay;