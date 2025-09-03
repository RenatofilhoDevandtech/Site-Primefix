import { useState, useEffect, useCallback } from 'react';
import HeroCarousel from '../components/features/HeroCarousel';
import MovieCarousel from '../components/features/MovieCarousel';
import MovieCard from '../components/ui/MovieCard';
import Toast from '../components/ui/Toast';
import Button from '../components/ui/Button';
import { useMovies } from '../contexts/MovieContext';
import { tmdbService } from '../services/tmdbService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faFire, faStar, faCalendar } from '@fortawesome/free-solid-svg-icons';

const MoviesPage = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastInfo, setToastInfo] = useState({ isVisible: false, message: '', type: 'info' });
  const [activeFilter, setActiveFilter] = useState('all');

  const { addMovie, isMovieInList } = useMovies();

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Buscar todas as categorias de filmes
      const [popular, topRated, nowPlaying, upcoming] = await Promise.allSettled([
        tmdbService.getPopularMovies(),
        tmdbService.getTopRatedMovies(),
        tmdbService.getNowPlayingMovies && tmdbService.getNowPlayingMovies(),
        tmdbService.getUpcomingMovies && tmdbService.getUpcomingMovies(),
      ].filter(Boolean));

      // Processar respostas
      const popularResults = popular.status === 'fulfilled' ? popular.value : [];
      const topRatedResults = topRated.status === 'fulfilled' ? topRated.value : [];
      const nowPlayingResults = nowPlaying && nowPlaying.status === 'fulfilled' ? nowPlaying.value : [];
      const upcomingResults = upcoming && upcoming.status === 'fulfilled' ? upcoming.value : [];

      // Definir filmes em destaque (usando os populares)
      setFeaturedMovies(popularResults.slice(0, 5));
      setPopularMovies(popularResults);
      setTopRatedMovies(topRatedResults);
      setNowPlayingMovies(nowPlayingResults);
      setUpcomingMovies(upcomingResults);

      // Verificar se todas as requisições falharam
      const requests = [popular, topRated, nowPlaying, upcoming].filter(req => req !== undefined);
      const failedRequests = requests.filter(req => req.status === 'rejected');
      
      if (failedRequests.length === requests.length) {
        throw new Error('Não foi possível carregar os filmes. Verifique sua conexão.');
      }
    } catch (err) {
      setError(err.message || 'Não foi possível carregar os filmes. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleAddToList = (movie) => {
    if (isMovieInList(movie.id)) {
      setToastInfo({ 
        isVisible: true, 
        message: `"${movie.title}" já está na sua lista.`, 
        type: 'info' 
      });
    } else {
      addMovie(movie);
      setToastInfo({ 
        isVisible: true, 
        message: `"${movie.title}" foi adicionado à sua lista!`, 
        type: 'success' 
      });
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchMovies();
  };

  // Filtrar filmes com base na categoria selecionada
  const getFilteredMovies = () => {
    switch (activeFilter) {
      case 'popular':
        return popularMovies;
      case 'top-rated':
        return topRatedMovies;
      case 'now-playing':
        return nowPlayingMovies;
      case 'upcoming':
        return upcomingMovies;
      default:
        return [...popularMovies, ...topRatedMovies, ...nowPlayingMovies, ...upcomingMovies]
          .filter((movie, index, self) => 
            index === self.findIndex(m => m.id === movie.id)
          );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pr-black to-pr-gray-dark/30">
        <div className="h-[56.25vw] min-h-[400px] max-h-[95vh] w-full bg-pr-border animate-pulse"></div>
        <div className="py-12 space-y-12">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="h-8 w-48 bg-pr-border rounded-lg ml-4 md:ml-0 animate-pulse"></div>
              <div className="flex space-x-4 px-4 md:px-0 overflow-x-hidden">
                {[...Array(6)].map((_, cardIndex) => (
                  <div key={cardIndex} className="flex-shrink-0 w-48 aspect-[2/3] bg-pr-border rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-pr-black to-pr-gray-dark/30 px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg className="w-16 h-16 mx-auto text-pr-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-pr-gray-light mb-2">Ocorreu um Erro</h2>
          <p className="text-pr-gray mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleRetry} variant="primary">
              Tentar Novamente
            </Button>
            <Button onClick={() => window.location.reload()} variant="secondary">
              Recarregar Página
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const filteredMovies = getFilteredMovies();

  return (
    <>
      {toastInfo.isVisible && (
        <Toast 
          message={toastInfo.message} 
          type={toastInfo.type} 
          onClose={() => setToastInfo({ ...toastInfo, isVisible: false })} 
        />
      )}

      <HeroCarousel movies={featuredMovies} onAddToList={handleAddToList} />

      <div className="py-8 bg-pr-gray-dark/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-pr-gray-light mb-6">Explorar Filmes</h2>
          
          {/* Filtros de Categoria */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              variant={activeFilter === 'all' ? 'primary' : 'secondary'}
              onClick={() => setActiveFilter('all')}
              className="flex items-center"
            >
              <FontAwesomeIcon icon={faFilm} className="mr-2" />
              Todos
            </Button>
            <Button
              variant={activeFilter === 'popular' ? 'primary' : 'secondary'}
              onClick={() => setActiveFilter('popular')}
              className="flex items-center"
            >
              <FontAwesomeIcon icon={faFire} className="mr-2" />
              Populares
            </Button>
            <Button
              variant={activeFilter === 'top-rated' ? 'primary' : 'secondary'}
              onClick={() => setActiveFilter('top-rated')}
              className="flex items-center"
            >
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              Melhores Avaliados
            </Button>
            {nowPlayingMovies.length > 0 && (
              <Button
                variant={activeFilter === 'now-playing' ? 'primary' : 'secondary'}
                onClick={() => setActiveFilter('now-playing')}
                className="flex items-center"
              >
                <FontAwesomeIcon icon={faFilm} className="mr-2" />
                Nos Cinemas
              </Button>
            )}
            {upcomingMovies.length > 0 && (
              <Button
                variant={activeFilter === 'upcoming' ? 'primary' : 'secondary'}
                onClick={() => setActiveFilter('upcoming')}
                className="flex items-center"
              >
                <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                Em Breve
              </Button>
            )}
          </div>

          {/* Resultados Filtrados */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleAddToList(movie)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faFilm} className="text-5xl text-pr-border mb-4" />
              <h3 className="text-xl font-bold text-pr-gray-light mb-2">Nenhum filme encontrado</h3>
              <p className="text-pr-gray">Tente selecionar uma categoria diferente.</p>
            </div>
          )}
        </div>
      </div>

      {/* Seções de Categorias (apenas se não estiver filtrado) */}
      {activeFilter === 'all' && (
        <div className="py-12 space-y-12 bg-gradient-to-b from-pr-black to-pr-gray-dark/30">
          {popularMovies.length > 0 && (
            <MovieCarousel 
              title="Populares" 
              movies={popularMovies}
              onMovieSelect={handleAddToList}
            />
          )}
          
          {topRatedMovies.length > 0 && (
            <MovieCarousel 
              title="Melhores Avaliados" 
              movies={topRatedMovies}
              onMovieSelect={handleAddToList}
            />
          )}
          
          {nowPlayingMovies.length > 0 && (
            <MovieCarousel 
              title="Nos Cinemas" 
              movies={nowPlayingMovies}
              onMovieSelect={handleAddToList}
            />
          )}
          
          {upcomingMovies.length > 0 && (
            <MovieCarousel 
              title="Em Breve" 
              movies={upcomingMovies}
              onMovieSelect={handleAddToList}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MoviesPage;