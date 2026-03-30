import { useState, useEffect, useCallback, useMemo } from 'react';
import HeroCarousel from '../components/features/HeroCarousel';
import MovieCarousel from '../components/features/MovieCarousel';
import MovieCard from '../components/ui/MovieCard';
import Toast from '../components/ui/Toast';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/Spinner';
import { useMovies } from '../contexts/MovieContext';
import { tmdbService } from '../services/tmdbService';
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

  const categories = useMemo(() => [
    { id: 'all', label: 'TODAS', icon: faTv },
    { id: 'popular', label: 'POPULARES', icon: faFire },
    { id: 'topRated', label: 'MELHORES AVALIADAS', icon: faStar },
    { id: 'onAir', label: 'NO AR', icon: faBroadcastTower }
  ], []);

  const fetchSeries = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [popular, topRated, onAir] = await Promise.all([
        tmdbService.getPopularTv(),
        tmdbService.getTopRatedTv(),
        tmdbService.getOnAirTv()
      ]);

      setSeriesData({
        featured: popular.slice(0, 5),
        popular: popular || [],
        topRated: topRated || [],
        onAir: onAir || []
      });

    } catch (err) {
      console.error('Erro ao carregar séries:', err);
      setError('Não foi possível carregar o catálogo de séries no momento.');
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
      title: series.name || series.title, // Séries usam .name na API
      release_date: series.first_air_date || series.release_date,
      media_type: 'tv'
    };

    if (isMovieInList(series.id)) {
      setToastInfo({ 
        isVisible: true, 
        message: `"${seriesAsMovie.title}" já está na sua lista.`, 
        type: 'info'
      });
    } else {
      addMovie(seriesAsMovie);
      setToastInfo({ 
        isVisible: true, 
        message: `"${seriesAsMovie.title}" adicionada com sucesso!`, 
        type: 'success'
      });
    }
  }, [addMovie, isMovieInList]);

  const filteredSeries = useMemo(() => {
    if (activeFilter === 'all') {
      const all = [...seriesData.popular, ...seriesData.topRated, ...seriesData.onAir];
      return all.filter((s, i, self) => i === self.findIndex(t => t.id === s.id));
    }
    return seriesData[activeFilter] || [];
  }, [activeFilter, seriesData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-pr-black flex items-center justify-center">
        <LoadingSpinner message="Sintonizando séries..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-pr-black px-4">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-5xl text-pr-red mb-6" />
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Erro de Conexão</h2>
        <p className="text-pr-gray mb-8">{error}</p>
        <Button onClick={fetchSeries} variant="primary" icon={faRefresh} className="font-bold">
          TENTAR NOVAMENTE
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-pr-black pb-20">
      {toastInfo.isVisible && (
        <Toast 
          message={toastInfo.message} 
          type={toastInfo.type}
          onClose={() => setToastInfo(prev => ({ ...prev, isVisible: false }))} 
        />
      )}

      {/* Hero em destaque */}
      {seriesData.featured.length > 0 && (
        <HeroCarousel 
          movies={seriesData.featured} 
          onAddToList={handleAddToList}
          mediaType="tv"
        />
      )}

      <div className="container mx-auto px-6 mt-12">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
            Séries <span className="text-pr-cyan">Prime</span>
          </h1>
          <p className="text-pr-gray-light mt-2 max-w-lg">
            Explore as produções mais aclamadas da TV mundial diretamente na sua conta.
          </p>
        </header>
        
        {/* Filtros Estilizados */}
        <nav className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs transition-all uppercase tracking-widest border
                ${activeFilter === cat.id 
                  ? 'bg-pr-cyan border-pr-cyan text-pr-black shadow-[0_0_15px_rgba(0,255,255,0.3)]' 
                  : 'bg-transparent border-white/10 text-pr-gray hover:border-pr-cyan hover:text-white'}`}
            >
              <FontAwesomeIcon icon={cat.icon} />
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Grid de Resultados */}
        <section>
          <div className="flex items-end gap-4 mb-8">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
              {categories.find(c => c.id === activeFilter)?.label}
            </h2>
            <span className="text-pr-cyan font-bold text-sm mb-1 opacity-60">
              {filteredSeries.length} TÍTULOS
            </span>
          </div>
          
          {filteredSeries.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredSeries.map((series) => (
                <MovieCard
                  key={series.id}
                  movie={series}
                  mediaType="tv"
                  onAddToList={() => handleAddToList(series)}
                  showAddButton={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-pr-gray-dark/10 rounded-3xl border border-white/5">
              <FontAwesomeIcon icon={faTv} className="text-5xl text-pr-gray-dark mb-4" />
              <h3 className="text-xl font-bold text-white uppercase">Nenhum título encontrado</h3>
            </div>
          )}
        </section>

        {/* Carrosséis Extras (apenas se 'Todas' estiver ativo) */}
        {activeFilter === 'all' && (
          <div className="space-y-16 mt-20">
            <MovieCarousel title="TOP RATED TV" items={seriesData.topRated} mediaType="tv" onItemSelect={handleAddToList} />
            <MovieCarousel title="POPULARES NO MOMENTO" items={seriesData.popular} mediaType="tv" onItemSelect={handleAddToList} />
          </div>
        )}
      </div>
    </main>
  );
};

export default SeriesPage;