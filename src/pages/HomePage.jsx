import { useMemo, useCallback } from 'react'; // Otimização de performance
import HeroCarousel from '../components/features/HeroCarousel';
import MovieCarousel from '../components/features/MovieCarousel';
import Toast from '../components/ui/Toast';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import { useMovies } from '../contexts/MovieContext';
import { usePageData } from '../hooks/usePageData';
import { useToast } from '../hooks/useToast';
import { useSmartRecommendations } from '../hooks/useSmartRecommendations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFire, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const { data: movies, isLoading, error, retry } = usePageData();
  const { addMovie, isMovieInList, myList } = useMovies();
  const { toastInfo, showToast } = useToast();
  const { getRecommendations, getTrendingInsights } = useSmartRecommendations();

  // NEGÓCIO: Memoizamos as recomendações para evitar cálculos pesados em cada renderização da SPA
  const smartRecommendations = useMemo(() => {
    if (!movies) return [];
    return getRecommendations([
      ...movies.popular,
      ...movies.topRated,
      ...movies.upcoming
    ].filter(movie => !isMovieInList(movie.id)));
  }, [movies, getRecommendations, isMovieInList]);

  // UX: Função de clique otimizada com feedback imediato
  const handleAddToList = useCallback((movie) => {
    if (isMovieInList(movie.id)) {
      showToast(`"${movie.title}" já está na sua curadoria.`, 'info');
    } else {
      addMovie(movie);
      showToast(`Adicionado! Vamos personalizar suas próximas sugestões.`, 'success');
    }
  }, [isMovieInList, addMovie, showToast]);

  const trendingInsights = useMemo(() => getTrendingInsights(movies?.trending || []), [movies?.trending, getTrendingInsights]);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay message={error} onRetry={retry} />;

  return (
    <div className="min-h-screen bg-pr-black text-white selection:bg-pr-cyan selection:text-pr-black">
      <Toast {...toastInfo} />

      {/* --- HERO SECTION --- 
          Dor resolvida: O "O que assistir agora?". O gradiente profundo 
          garante legibilidade e imersão total (estilo Prime Video 2024).
      */}
      <section className="relative transition-all duration-700 ease-in-out">
        <HeroCarousel movies={movies.trending.slice(0, 5)} onAddToList={handleAddToList} />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-pr-black via-pr-black/60 to-transparent z-10" />
      </section>

      <main className="relative z-20 -mt-20 space-y-12 pb-20">
        
        {/* --- WELCOME & PERSONALIZATION BAR --- 
            Visão de Negócio: Prova social e engajamento imediato.
        */}
        <header className="px-4 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Para você, <span className="text-pr-cyan">Cineasta</span>
              </h1>
              <p className="text-pr-gray-light mt-2 max-w-xl">
                {myList.length > 0 
                  ? `Analisamos sua lista de ${myList.length} títulos para curar esta seleção.`
                  : "Explore nossa biblioteca premium. Comece adicionando o que você gosta."}
              </p>
            </div>
          </div>
        </header>

        {/* --- SMART ROWS (Seções Inteligentes) --- 
            UX: Primeiro o que é pessoal (Recomendados), depois o que é tendência.
        */}
        <div className="space-y-16">
          
          {/* 1. ROW PERSONALIZADA (Retenção) */}
          {smartRecommendations.length > 0 && (
            <div className="animate-fade-in group">
              <div className="px-4 md:px-12 lg:px-16 mb-4 max-w-7xl mx-auto flex items-center gap-3">
                <div className="p-2 bg-pr-cyan/10 rounded-lg group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faStar} className="text-pr-cyan" />
                </div>
                <h2 className="text-2xl font-bold">Baseado nos seus favoritos</h2>
              </div>
              <MovieCarousel movies={smartRecommendations.slice(0, 15)} onAddToList={handleAddToList} title="Recomendados para Você" />
            </div>
          )}

          {/* 2. ROWS DE MERCADO (Discovery) */}
          {[
            { title: 'Hits Mundiais', key: 'popular', icon: faFire, color: 'text-orange-500' },
            { title: 'Crítica Especializada', key: 'topRated', icon: faStar, color: 'text-yellow-400' },
            { title: 'Estreias Siteprime', key: 'upcoming', icon: faLightbulb, color: 'text-pr-cyan' }
          ].map((section) => (
            <section key={section.key} className="px-4 md:px-12 lg:px-16 max-w-8xl mx-auto group">
               <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl md:text-2xl font-bold hover:text-pr-cyan cursor-pointer transition-colors">
                  {section.title}
                </h2>
                <FontAwesomeIcon icon={section.icon} className={`${section.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
              <MovieCarousel title={section.title} movies={movies[section.key]} onAddToList={handleAddToList} />
            </section>
          ))}
        </div>

        {/* --- INSIGHTS DE TENDÊNCIA (Lei de Hick) --- 
            Negócio: Ajuda o usuário a decidir rápido mostrando dados reais (Trending).
        */}
        {trendingInsights.length > 0 && (
          <section className="mx-4 md:mx-12 lg:mx-16 p-8 bg-pr-gray-dark/20 rounded-3xl border border-white/5 backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-1 w-bg-pr-cyan rounded-full bg-pr-cyan shadow-[0_0_15px_rgba(0,255,255,0.5)]" />
                <h2 className="text-2xl font-bold">Radar Siteprime</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingInsights.slice(0, 3).map((insight, i) => (
                  <article key={i} className="hover:bg-white/5 p-4 rounded-xl transition-all border border-transparent hover:border-white/10">
                    <h3 className="text-pr-cyan font-bold mb-2 flex items-center gap-2">
                       <FontAwesomeIcon icon={faFire} className="text-xs" />
                       {insight.title}
                    </h3>
                    <p className="text-sm text-pr-gray-light leading-relaxed">{insight.description}</p>
                  </article>
                ))}
             </div>
          </section>
        )}

        {/* --- FOOTER CTA --- 
            Visão de Venda: Se o usuário chegou ao fim da página sem clicar em nada, 
            ele precisa de um caminho claro.
        */}
        <footer className="py-20 text-center border-t border-white/5 mt-10">
          <h2 className="text-3xl font-bold mb-6">Pronto para a próxima maratona?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-pr-cyan text-pr-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-pr-cyan/20">
              Explorar Catálogo Completo
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-all">
              Criar Perfil de Família
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;