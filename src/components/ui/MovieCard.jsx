import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMovies } from '../../contexts/MovieContext';
import { useMovieCardLogic } from './MovieCard/useMovieCardLogic';
import CardImage from './MovieCard/CardImage';
import CardHoverOverlay from './MovieCard/CardHoverOverlay';

const MovieCard = ({ movie, onClick, layout = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const movieLogic = useMovieCardLogic(movie);
  const { toggleMovie, myList } = useMovies();
  const isInList = myList.some(m => m.id === movie.id);

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
      onKeyDown={handleKeyPress}
      /* CORREÇÃO: 
         1. Mudei scale-125 para scale-105. O 125 explode o layout e esconde os textos.
         2. Adicionei overflow-hidden para garantir que o zoom da imagem não vaze.
         3. group/card agora controla tudo com z-index fixo.
      */
      className={`relative cursor-pointer bg-pr-gray-dark rounded-xl shadow-lg transition-all duration-500 ease-out group/card transform-gpu ${
        layout === 'grid' 
          ? 'aspect-[2/3] hover:scale-105 hover:z-30 hover:shadow-cyan-glow' 
          : 'flex gap-4 h-32 w-full'
      }`}
      role="button"
      tabIndex={0}
      aria-label={`${movieLogic.title}, lançado em ${movieLogic.releaseYear}`}
    >
      {/* Container da Imagem */}
      <div className={`${layout === 'grid' ? 'absolute inset-0' : 'w-24'} overflow-hidden rounded-xl z-10`}>
        <CardImage
          imageUrl={movieLogic.imageUrl}
          alt={movieLogic.title}
          isLoaded={movieLogic.isImageLoaded}
          hasError={movieLogic.hasImageError}
          onLoad={movieLogic.handleImageLoad}
          onError={movieLogic.handleImageError}
          /* A escala da imagem agora é sutil para não brigar com o scale do card */
        />
      </div>
      
      {/* Título Visível (Apenas quando NÃO está em hover) */}
      {layout === 'grid' && (
        <div className={`absolute bottom-0 left-0 right-0 p-4 z-15 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <h3 className="font-bold text-white text-xs md:text-sm leading-tight truncate drop-shadow-lg">
            {movieLogic.title}
          </h3>
        </div>
      )}

      {/* Overlay de Interação (z-index superior) */}
      <CardHoverOverlay
        isHovered={isHovered}
        movieData={movieLogic}
        onAddToList={(e) => {
          e.stopPropagation();
          toggleMovie(movie);
        }}
        isInList={isInList}
      />
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  layout: PropTypes.string,
};

export default MovieCard;