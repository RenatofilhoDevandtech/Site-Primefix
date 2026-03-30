import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faHeart, faStar, faCheck } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const CardHoverOverlay = ({ isHovered, movieData, onAddToList, isInList }) => {
  const handleActionClick = (e, action) => {
    e.stopPropagation(); 
    if (action) action();
  };
  
  return (
    <div className={`
      absolute inset-0 z-30 flex flex-col justify-between 
      px-6 py-5 transition-all duration-500 ease-in-out
      /* Escurece fundo no hover para destaque total dos textos */
      bg-pr-black/40 backdrop-blur-[2px]
      ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      
      {/* Topo: Rating e Botão de Lista */}
      <div className={`
        flex justify-between items-start transition-all duration-500 delay-75
        ${isHovered ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
      `}>
        {movieData.rating && (
          <div className="flex items-center bg-pr-black/80 text-white px-2.5 py-1 rounded-lg text-[11px] font-black backdrop-blur-md border border-white/10 shadow-xl">
            <FontAwesomeIcon icon={faStar} className="mr-1.5 text-yellow-500" />
            {movieData.rating.toFixed(1)}
          </div>
        )}
        
        <button
          onClick={(e) => handleActionClick(e, onAddToList)}
          className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 border backdrop-blur-md
                      ${isInList 
                        ? 'bg-pr-cyan border-pr-cyan text-pr-black shadow-[0_0_15px_rgba(0,255,255,0.4)]' 
                        : 'bg-pr-black/40 border-white/20 text-white hover:border-pr-cyan hover:text-pr-cyan'
                      }`}
        >
          <FontAwesomeIcon icon={isInList ? faCheck : faHeart} size="sm" />
        </button>
      </div>
      
      {/* Centro: Play Button */}
      <div className={`
        flex items-center justify-center transition-all duration-500
        ${isHovered ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
      `}>
         <div className="bg-pr-cyan/20 rounded-full p-2 backdrop-blur-sm border border-pr-cyan/30 shadow-cyan-glow">
            <FontAwesomeIcon 
              icon={faPlayCircle} 
              className="text-pr-cyan text-5xl" 
            />
         </div>
      </div>
      
      {/* Base: Info do Filme */}
      <div className={`
        transition-all duration-500 delay-100
        ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}>
        <h3 className="font-black text-base text-white leading-tight uppercase tracking-tighter line-clamp-2 mb-2 drop-shadow-lg">
          {movieData.title}
        </h3>
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-pr-gray-light">
          <span>{movieData.releaseYear}</span>
          <span className="w-1 h-1 bg-pr-cyan rounded-full opacity-60" />
          <span>{movieData.formattedRuntime}</span>
        </div>
      </div>
    </div>
  );
};

CardHoverOverlay.propTypes = {
  isHovered: PropTypes.bool.isRequired,
  movieData: PropTypes.object.isRequired,
  onAddToList: PropTypes.func.isRequired,
  isInList: PropTypes.bool.isRequired,
};

export default CardHoverOverlay;