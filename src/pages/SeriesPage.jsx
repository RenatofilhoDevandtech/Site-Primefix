import { useState, useEffect, useCallback, useMemo } from 'react';
import HeroCarousel from '../components/features/HeroCarousel';
import MovieCarousel from '../components/features/MovieCarousel';
import MovieCard from '../components/ui/MovieCard';
import Toast from '../components/ui/Toast';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/Spinner';
import { useMovies } from '../contexts/MovieContext';
import { tmdbService } from '../services/tmdbService';
// Removida a importação não utilizada: buildImageUrl
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTv, 
  faFire, 
  faStar, 
  faBroadcastTower, 
  faExclamationTriangle,
  faRefresh
} from '@fortawesome/free-solid-svg-icons';

const SeriesPage = () => {
  const [seriesData, setSeriesData] = useState({
    featured: [],
    popular: [],
    topRated: [],
    onAir: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastInfo, setToastInfo] = useState({ 
    isVisible: false, 
    message: '', 
    type: 'info' 
  });
  const [activeFilter, setActiveFilter] = useState('all');

  const { addMovie, isMovieInList } = useMovies();

  // Categorias de séries disponíveis
  const categories = useMemo(() => [
    { id: 'all', label: 'Todas', icon: faTv },
    { id: 'popular', label: 'Populares', icon: faFire },
    { id: 'top-rated', label: 'Melhores Avaliadas', icon: faStar },
    { id: 'on-air', label: 'No Ar', icon: faBroadcastTower }
  ], []);

  const fetchSeries = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Buscar todas as categorias de séries em paralelo
      const [popular, topRated, onAir] = await Promise.all([
        tmdbService.getPopularSeries?.() || Promise.resolve([]),
        tmdbService.getTopRatedSeries?.() || Promise.resolve([]),
        tmdbService.getOnAirSeries?.() || Promise.resolve([])
      ]);

      setSeriesData({
        featured: popular.slice(0, 5),
        popular,
        topRated,
        onAir
      });

    } catch (err) {
      console.error('Erro ao carregar séries:', err);
      setError(err.message || 'Não foi possível carregar as séries. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries]);

  const handleAddToList = useCallback((series) => {
    const seriesAsMovie = {
      ...series,
      title: series.name || series.title,
      release_date: series.first_air_date || series.release_date,
      media_type: 'tv' // Adicionando tipo de mídia para diferenciar
    };

    if (isMovieInList(series.id)) {
      setToastInfo({ 
        isVisible: true, 
        message: `"${series.name}" já está na sua lista.`, 
        type: 'info',
        duration: 3000
      });
    } else {
      addMovie(seriesAsMovie);
      setToastInfo({ 
        isVisible: true, 
        message: `"${series.name}" foi adicionado à sua lista!`, 
        type: 'success',
        duration: 3000
      });
    }
  }, [addMovie, isMovieInList]);

  const handleRetry = useCallback(() => {
    setError(null);
    fetchSeries();
  }, [fetchSeries]);

  // Séries filtradas baseadas na categoria selecionada
  const filteredSeries = useMemo(() => {
    if (activeFilter === 'all') {
      // Combinar todas as séries e remover duplicatas
      const allSeries = [...seriesData.popular, ...seriesData.topRated, ...seriesData.onAir];
      return allSeries.filter((series, index, self) => 
        index === self.findIndex(s => s.id === series.id)
      );
    }
    
    return seriesData[activeFilter] || [];
  }, [activeFilter, seriesData]);

  // Verificar se há séries em cada categoria
  const hasSeries = useMemo(() => ({
    popular: seriesData.popular.length > 0,
    topRated: seriesData.topRated.length > 0,
    onAir: seriesData.onAir.length > 0
  }), [seriesData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <LoadingSpinner 
          message="Carregando séries..."
          size="large"
          className="min-h-screen"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 to-gray-800 px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <FontAwesomeIcon 
              icon={faExclamationTriangle} 
              className="w-16 h-16 mx-auto text-red-500" 
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Ocorreu um Erro</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={handleRetry} 
              variant="primary"
              icon={faRefresh}
            >
              Tentar Novamente
            </Button>
            <Button 
              onClick={() => window.location.reload()} 
              variant="secondary"
            >
              Recarregar Página
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toast de notificação */}
      {toastInfo.isVisible && (
        <Toast 
          message={toastInfo.message} 
          type={toastInfo.type}
          duration={toastInfo.duration}
          onClose={() => setToastInfo(prev => ({ ...prev, isVisible: false }))} 
        />
      )}

      {/* Hero Carousel com séries em destaque */}
      {seriesData.featured.length > 0 && (
        <HeroCarousel 
          items={seriesData.featured} 
          onAddToList={handleAddToList}
          mediaType="tv"
        />
      )}

      {/* Conteúdo principal */}
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pb-12">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Séries</h1>
          <p className="text-gray-400 mb-8">
            Descubra as melhores séries para assistir
          </p>
          
          {/* Filtros de Categoria */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              (category.id !== 'on-air' || hasSeries.onAir) && (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? 'primary' : 'secondary'}
                  onClick={() => setActiveFilter(category.id)}
                  className="flex items-center gap-2"
                  size="sm"
                >
                  <FontAwesomeIcon icon={category.icon} />
                  {category.label}
                </Button>
              )
            ))}
          </div>

          {/* Resultados Filtrados */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-6">
              {activeFilter === 'all' ? 'Todas as Séries' : 
               `Séries ${categories.find(c => c.id === activeFilter)?.label}`}
              <span className="text-gray-400 ml-2">
                ({filteredSeries.length})
              </span>
            </h2>
            
            {filteredSeries.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {filteredSeries.map((series) => (
                  <MovieCard
                    key={series.id}
                    item={series}
                    mediaType="tv"
                    onAddToList={() => handleAddToList(series)}
                    showAddButton={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FontAwesomeIcon 
                  icon={faTv} 
                  className="text-5xl text-gray-600 mb-4" 
                />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nenhuma série encontrada
                </h3>
                <p className="text-gray-400">
                  Tente selecionar uma categoria diferente.
                </p>
              </div>
            )}
          </div>

          {/* Seções de Categorias (apenas se não estiver filtrado) */}
          {activeFilter === 'all' && (
            <div className="space-y-12">
              {hasSeries.popular && (
                <MovieCarousel 
                  title="Séries Populares" 
                  items={seriesData.popular}
                  mediaType="tv"
                  onItemSelect={handleAddToList}
                />
              )}
              
              {hasSeries.topRated && (
                <MovieCarousel 
                  title="Melhores Avaliadas" 
                  items={seriesData.topRated}
                  mediaType="tv"
                  onItemSelect={handleAddToList}
                />
              )}
              
              {hasSeries.onAir && (
                <MovieCarousel 
                  title="No Ar Agora" 
                  items={seriesData.onAir}
                  mediaType="tv"
                  onItemSelect={handleAddToList}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SeriesPage;