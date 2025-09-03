import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Todos estes ícones serão usados no JSX abaixo
import { faPlay, faInfoCircle, faPlus, faVolumeOff, faVolumeUp, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useHeroCarousel } from '../../hooks/useHeroCarousel';

// --- Micro-Componente para o Fundo (Vídeo/Imagem) ---
const HeroBackground = ({ item, isMuted }) => {
  const [hasVideoError, setHasVideoError] = useState(false);
  const videoUrl = item.video_key && !hasVideoError
    ? `https://www.youtube.com/embed/${item.video_key}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${item.video_key}&playsinline=1&enablejsapi=1&modestbranding=1&rel=0`
    : null;

  return (
    <>
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: videoUrl ? 0 : 1 }}>
        <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt={item.title} className="w-full h-full object-cover" />
      </div>
      {videoUrl && (
        <iframe
          className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src={videoUrl}
          title={item.title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          onError={() => setHasVideoError(true)}
        />
      )}
    </>
  );
};

// --- Componente Principal ---
const HeroCarousel = ({ movies, onAddToList }) => {
  // Todas estas variáveis do hook serão usadas
  const { currentIndex, isHovering, goToNext, goToPrevious, setIsHovering } = useHeroCarousel(movies.length);
  const [isMuted, setIsMuted] = useState(true);

  if (!movies || movies.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-pr-black">
        <div className="w-16 h-16 border-4 border-pr-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentItem = movies[currentIndex];

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-pr-black group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <HeroBackground item={currentItem} isMuted={isMuted} />

      <div className="absolute inset-0 bg-gradient-to-t from-pr-black via-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-pr-black via-pr-black/50 to-transparent" />
      
      <div className="absolute bottom-[20%] left-4 md:left-12 lg:left-16 z-10 w-full max-w-lg">
        <div key={currentIndex} className="animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white drop-shadow-lg mb-4">{currentItem.title}</h2>
          <p className="hidden md:block text-pr-gray-light text-lg mb-6 line-clamp-3">{currentItem.overview}</p>
          <div className="flex items-center gap-3">
             <button className="flex items-center justify-center px-6 py-2.5 rounded-md bg-white text-black font-bold hover:bg-white/90 transition transform hover:scale-105">
                <FontAwesomeIcon icon={faPlay} className="mr-2" /> Assistir
             </button>
             <button className="flex items-center justify-center px-6 py-2.5 rounded-md bg-black/40 text-white backdrop-blur-sm hover:bg-white/20 transition transform hover:scale-105">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Detalhes
             </button>
             <button onClick={() => onAddToList(currentItem)} className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-white/20 border border-white/40 transition transform hover:scale-110">
                <FontAwesomeIcon icon={faPlus} />
             </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 md:right-12 lg:right-16 z-10">
        <button 
          onClick={() => setIsMuted(prev => !prev)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-white/20 border border-white/40 text-white backdrop-blur-sm transition transform hover:scale-110"
          aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
        >
          <FontAwesomeIcon icon={isMuted ? faVolumeOff : faVolumeUp} size="lg" />
        </button>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-20 px-4 md:px-12 lg:px-16 flex justify-center items-center">
        <div className="w-full max-w-xs h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div
            key={currentIndex}
            className="h-full bg-white"
            // 'isHovering' é usado aqui para pausar a animação
            style={{ animation: `progress-bar 10s linear`, animationPlayState: isHovering ? 'paused' : 'running' }}
          />
        </div>
      </div>

      {movies.length > 1 && (
        <>
          <button onClick={goToPrevious} aria-label="Anterior" className="absolute left-0 top-0 bottom-0 w-16 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"><FontAwesomeIcon icon={faChevronLeft} size="2x" /></button>
          <button onClick={goToNext} aria-label="Próximo" className="absolute right-0 top-0 bottom-0 w-16 text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"><FontAwesomeIcon icon={faChevronRight} size="2x" /></button>
        </>
      )}
    </div>
  );
};

HeroCarousel.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddToList: PropTypes.func.isRequired,
};

HeroBackground.propTypes = {
  item: PropTypes.object.isRequired,
  isMuted: PropTypes.bool.isRequired,
};

export default HeroCarousel;