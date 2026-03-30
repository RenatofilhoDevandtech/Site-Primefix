import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroCarousel from '../components/features/HeroCarousel';
import MovieCarousel from '../components/features/MovieCarousel';
import MovieCard from '../components/ui/MovieCard';
import Toast from '../components/ui/Toast';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/Spinner';
import { useMovies } from '../contexts/MovieContext';
import { tmdbService } from '../services/tmdbService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faFire, faStar, faCalendar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const MoviesPage = () => {
  const navigate = useNavigate();
  const [moviesData, setMoviesData] = useState({
    popular: [],
    topRated: [],
    nowPlaying: [],
    upcoming: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastInfo, setToastInfo] = useState({ isVisible: false, message: '', type: 'info' });
  const [activeFilter, setActiveFilter] = useState('all');

  const { toggleMovie, isMovieInList } = useMovies();

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const results = await Promise.allSettled([
        tmdbService.getPopularMovies(),
        tmdbService.getTopRatedMovies(),
        tmdbService.getNowPlayingMovies?.(),
        tmdbService.getUpcomingMovies?.(),
      ]);

      const [popular, topRated, nowPlaying, upcoming] = results.map(res => 
        res.status === 'fulfilled' ? res.value : []
      );

      if (results.every(res => res.status === 'rejected')) {
        throw new Error('Falha na conexão com o catálogo de filmes.');
      }

      setMoviesData({ popular, topRated, nowPlaying, upcoming });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleToggleMovie = (movie) => {
    const wasAdded = toggleMovie(movie);
    setToastInfo({
      isVisible: true,
      message: wasAdded ? `"${movie.title}" guardado na sua lista!` : `Removido da sua lista.`,
      type: wasAdded ? 'success' : 'info'
    });
  };

  const filteredMovies = useMemo(() => {
    if (activeFilter === 'all') {
      const combined = [...moviesData.popular, ...moviesData.topRated, ...moviesData.nowPlaying, ...moviesData.upcoming];
      return combined.filter((m, i, self) => self.findIndex(t => t.id === m.id) === i);
    }
    const map = {
      'popular': moviesData.popular,
      'top-rated': moviesData.topRated,
      'now-playing': moviesData.nowPlaying,
      'upcoming': moviesData.upcoming
    };
    return map[activeFilter] || [];
  }, [activeFilter, moviesData]);

  if (isLoading) return <MoviesSkeleton />;

  if (error) return <ErrorView error={error} onRetry={fetchMovies} />;

  return (
    <main className="min-h-screen bg-pr-black text-white selection:bg-pr-cyan selection:text-pr-black pb-20">
      {toastInfo.isVisible && (
        <Toast 
          {...toastInfo}
          onClose={() => setToastInfo({ ...toastInfo, isVisible: false })} 
        />
      )}

      {/* Hero Section Impactante */}
      <HeroCarousel movies={moviesData.popular.slice(0, 5)} onAddToList={handleToggleMovie} />

      <section className="container mx-auto px-6 mt-12">
        {/* HEADER DO CATÁLOGO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
              FILMES <span className="text-pr-cyan">PRIME</span>
            </h1>
            <p className="text-pr-gray-light mt-2 max-w-md">
              Explore os maiores sucessos de bilheteria e clássicos do cinema mundial.
            </p>
          </div>
          
          {/* BARRA DE FILTROS ESTILIZADA */}
          <nav className="flex flex-wrap gap-3 bg-white/5 p-2 rounded-3xl backdrop-blur-md border border-white/5">
            <FilterButton active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} icon={faFilm} label="TODOS" />
            <FilterButton active={activeFilter === 'popular'} onClick={() => setActiveFilter('popular')} icon={faFire} label="EM ALTA" />
            <FilterButton active={activeFilter === 'top-rated'} onClick={() => setActiveFilter('top-rated')} icon={faStar} label="CRÍTICA" />
            <FilterButton active={activeFilter === 'upcoming'} onClick={() => setActiveFilter('upcoming')} icon={faCalendar} label="EM BREVE" />
          </nav>
        </div>

        {/* GRID DE FILMES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => navigate(`/movie/${movie.id}`)}
              isInList={isMovieInList(movie.id)}
              onAddToList={() => handleToggleMovie(movie)}
            />
          ))}
        </div>

        {/* CARROSSEL DE SEÇÕES (Apenas em "Todos") */}
        {activeFilter === 'all' && (
          <div className="mt-24 space-y-20">
             <MovieCarousel title="LANÇAMENTOS RECENTES" movies={moviesData.nowPlaying} onAddToList={handleToggleMovie} />
             <MovieCarousel title="TOP AVALIADOS" movies={moviesData.topRated} onAddToList={handleToggleMovie} />
          </div>
        )}
      </section>
    </main>
  );
};

// Componente de Botão de Filtro - Padronizado com a SeriesPage
const FilterButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 font-bold text-xs uppercase tracking-widest border ${
      active 
      ? 'bg-pr-cyan border-pr-cyan text-pr-black shadow-[0_0_15px_rgba(0,255,255,0.3)]' 
      : 'bg-transparent border-transparent text-pr-gray hover:text-white hover:border-white/10'
    }`}
  >
    <FontAwesomeIcon icon={icon} className="text-sm" />
    {label}
  </button>
);

const MoviesSkeleton = () => (
  <div className="min-h-screen bg-pr-black flex items-center justify-center">
    <LoadingSpinner message="Preparando catálogo..." size="large" />
  </div>
);

const ErrorView = ({ error, onRetry }) => (
  <div className="h-screen flex flex-col items-center justify-center text-center p-6 bg-pr-black">
    <FontAwesomeIcon icon={faExclamationTriangle} className="text-pr-red text-5xl mb-6" />
    <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Erro de Carregamento</h2>
    <p className="text-pr-gray mb-8">{error}</p>
    <Button variant="primary" onClick={onRetry} className="font-bold">TENTAR NOVAMENTE</Button>
  </div>
);

export default MoviesPage;