import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMovieCardLogic } from './MovieCard/useMovieCardLogic';
import CardImage from './MovieCard/CardImage';
import CardHoverOverlay from './MovieCard/CardHoverOverlay';

const MovieCard = ({ movie, onClick, onAddToList, isInList }) => {
  const [isHovered, setIsHovered] = useState(false);
  const movieLogic = useMovieCardLogic(movie);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(movie);
    }
  };

  return (
    <div
      onClick={() => onClick(movie)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyPress={handleKeyPress}
      className="relative cursor-pointer bg-pr-gray-dark rounded-lg shadow-lg transition-all duration-300 ease-in-out aspect-[2/3] group-hover/card:scale-125 group-hover/card:z-20 group-hover/card:shadow-2xl"
      role="button"
      tabIndex={0}
      aria-label={`${movieLogic.title}, lançado em ${movieLogic.releaseYear}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <CardImage
          imageUrl={movieLogic.imageUrl}
          alt={movieLogic.title}
          isLoaded={movieLogic.isImageLoaded}
          hasError={movieLogic.hasImageError}
          onLoad={movieLogic.handleImageLoad}
          onError={movieLogic.handleImageError}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-110"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none group-hover/card:opacity-0 transition-opacity duration-200">
        <h3 className="font-bold text-white text-sm leading-tight truncate">{movieLogic.title}</h3>
      </div>

      <CardHoverOverlay
        isHovered={isHovered}
        movieData={movieLogic}
        onAddToList={() => onAddToList(movie)}
        isInList={isInList}
      />
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onAddToList: PropTypes.func.isRequired,
  isInList: PropTypes.bool,
};

export default MovieCard;