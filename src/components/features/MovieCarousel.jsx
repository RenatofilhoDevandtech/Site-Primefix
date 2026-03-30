import PropTypes from 'prop-types';
import MovieCard from '../ui/MovieCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useCarouselScroll } from '../../hooks/useCarouselScroll';
import { useNavigate } from 'react-router-dom';

const MovieCarousel = ({ title, movies, onAddToList }) => {
  const { scrollRef, scroll, showLeftButton, showRightButton, isScrolling } = useCarouselScroll(movies, false);
  const navigate = useNavigate();

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="group mb-16" aria-label={`Carrossel de ${title}`}>
      {/* Título com melhor hierarquia visual - Lei de Nielsen #4: Consistência */}
      <div className="flex items-center justify-between mb-6 px-4 md:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-white hover:text-pr-cyan transition-colors duration-200 cursor-pointer">
          {title}
        </h2>
        {/* Indicador de quantidade - Lei de Nielsen #1: Visibilidade do status */}
        <span className="text-sm text-pr-gray-light bg-pr-gray-dark/50 px-3 py-1 rounded-full">
          {movies.length} {movies.length === 1 ? 'filme' : 'filmes'}
        </span>
      </div>

      <div className="relative">
        {/* Container sem barra de scroll - Lei de Nielsen #8: Design estético e minimalista */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pl-4 md:pl-6 lg:pl-8 pr-4 md:pr-6 lg:pr-8 py-4"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
          tabIndex={0}
          role="region"
          aria-label={`Carrossel ${title}`}
        >
          {movies.map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              className="movie-card flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px] xl:w-[240px] transition-transform duration-300 ease-out hover:scale-105"
            >
              <MovieCard
                movie={movie}
                onClick={() => navigate(`/movie/${movie.id}`)}
                onAddToList={() => onAddToList(movie)}
              />
            </div>
          ))}
        </div>

        {/* Botões de navegação melhorados - Lei de Nielsen #2: Compatibilidade com o mundo real */}
        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            disabled={isScrolling}
            aria-label={`Rolar ${title} para a esquerda`}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-24 bg-gradient-to-r from-pr-black/90 via-pr-black/70 to-transparent z-20 text-white opacity-60 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer hover:from-pr-black hover:via-pr-black/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" className="drop-shadow-lg" />
          </button>
        )}

        {showRightButton && (
          <button
            onClick={() => scroll('right')}
            disabled={isScrolling}
            aria-label={`Rolar ${title} para a direita`}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-24 bg-gradient-to-l from-pr-black/90 via-pr-black/70 to-transparent z-20 text-white opacity-60 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer hover:from-pr-black hover:via-pr-black/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
          >
            <FontAwesomeIcon icon={faChevronRight} size="lg" className="drop-shadow-lg" />
          </button>
        )}

        {/* Indicador de progresso sutil - Lei de Nielsen #1: Visibilidade do status */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-pr-gray-dark/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-pr-cyan transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(100, ((scrollRef.current?.scrollLeft || 0) / Math.max(1, (scrollRef.current?.scrollWidth || 1) - (scrollRef.current?.clientWidth || 0))) * 100)}%`
            }}
          />
        </div>
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