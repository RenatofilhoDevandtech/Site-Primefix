import PropTypes from 'prop-types';
import MovieCard from '../ui/MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useCarouselScroll } from '../../hooks/useCarouselScroll';

const MovieCarousel = ({ title, movies, onAddToList }) => {
  const { scrollRef, scroll, showLeftButton, showRightButton } = useCarouselScroll(movies);
  
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="group mb-12" aria-label={`Carrossel de ${title}`}>
      <h2 className="text-2xl font-bold text-white mb-4 ml-4 md:ml-6 lg:ml-8">
        {title}
      </h2>
      
      <div className="relative">
        {/* Adicionado padding vertical (py-12) para o card ter espaço para expandir */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pl-4 md:pl-6 lg:ml-8 pr-4 md:pr-6 lg:pr-8 py-12"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="group/card flex-shrink-0 w-[50vw] sm:w-[30vw] md:w-[23vw] lg:w-[18vw]">
              <MovieCard 
                movie={movie} 
                onClick={() => { /* Lógica de clique para detalhes do filme */ }}
                onAddToList={() => onAddToList(movie)}
                // isInList={isMovieInList(movie.id)} // Exemplo de como passar o estado da lista
              />
            </div>
          ))}
        </div>

        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            aria-label={`Rolar ${title} para a esquerda`}
            className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-pr-black via-pr-black/80 to-transparent z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="2x" />
          </button>
        )}
        
        {showRightButton && (
          <button
            onClick={() => scroll('right')}
            aria-label={`Rolar ${title} para a direita`}
            className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-pr-black via-pr-black/80 to-transparent z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronRight} size="2x" />
          </button>
        )}
      </div>
    </section>
  );
};

MovieCarousel.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddToList: PropTypes.func.isRequired,
};

export default MovieCarousel;