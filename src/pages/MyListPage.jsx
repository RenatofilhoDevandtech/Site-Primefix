import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/ui/MovieCard';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Input from '../components/ui/Input';
import ConfirmationModal from '../components/features/ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle, faFilm, faSearch, faFilter, faStar, faClock,
  faTh, faList, faTrash, faEdit, faArrowUp, faArrowDown
} from '@fortawesome/free-solid-svg-icons';

const MyListPage = () => {
  const { myList, isLoading, deleteMovie } = useMovies();
  const navigate = useNavigate();

  // Estados de UI
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Estados de Filtro
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('addedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterGenre, setFilterGenre] = useState('all');

  // --- LÓGICA DE NEGÓCIO: STATS ---
  const listStats = useMemo(() => {
    if (!myList.length) return null;
    const totalMinutes = myList.reduce((sum, m) => sum + (Number(m.runtime) || 0), 0);
    const avgRating = myList.reduce((sum, m) => sum + (m.vote_average || 0), 0) / myList.length;
    
    return {
      count: myList.length,
      hours: Math.floor(totalMinutes / 60),
      avg: avgRating.toFixed(1),
      lastAdded: myList[0]?.title // Assume que o primeiro é o mais recente
    };
  }, [myList]);

  // --- LÓGICA DE FILTRAGEM ---
  const displayList = useMemo(() => {
    return myList
      .filter(movie => {
        const matchesSearch = movie.title?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = filterGenre === 'all' || movie.genres?.some(g => g.name === filterGenre);
        return matchesSearch && matchesGenre;
      })
      .sort((a, b) => {
        const factor = sortOrder === 'asc' ? 1 : -1;
        if (sortBy === 'title') return a.title.localeCompare(b.title) * factor;
        if (sortBy === 'rating') return (a.vote_average - b.vote_average) * factor;
        return (new Date(a.addedAt) - new Date(b.addedAt)) * factor;
      });
  }, [myList, searchQuery, filterGenre, sortBy, sortOrder]);

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-pr-black"><Spinner size="xl" /></div>;

  return (
    <div className="min-h-screen bg-pr-black pb-20">
      
      {/* 1. HERO STATS (Visibilidade do Status do Sistema) */}
      <header className="bg-gradient-to-b from-pr-cyan/20 to-pr-black pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Minha Coleção</h1>
              <p className="text-pr-gray-light text-lg">Gerencie seus títulos favoritos e descobertas.</p>
            </div>
            
            {listStats && (
              <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
                <StatCard label="Títulos" value={listStats.count} icon={faFilm} />
                <StatCard label="Horas de Filme" value={listStats.hours} icon={faClock} />
                <StatCard label="Média Rating" value={listStats.avg} icon={faStar} color="text-yellow-400" />
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
        
        {/* 2. TOOLBAR (Flexibilidade e Eficiência) */}
        <section className="bg-pr-gray-dark/30 backdrop-blur-md sticky top-20 z-30 p-4 rounded-2xl border border-white/5 flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="relative w-full md:w-96">
            <Input 
              placeholder="Pesquisar na minha lista..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 bg-black/40 border-white/10"
            />
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-pr-gray" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setShowFilters(!showFilters)} className={showFilters ? 'text-pr-cyan' : ''}>
              <FontAwesomeIcon icon={faFilter} className="mr-2" /> Filtros
            </Button>
            
            <div className="h-8 w-[1px] bg-white/10 mx-2 hidden sm:block" />
            
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-pr-cyan text-black' : 'hover:bg-white/5'}`}>
              <FontAwesomeIcon icon={faTh} />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-pr-cyan text-black' : 'hover:bg-white/5'}`}>
              <FontAwesomeIcon icon={faList} />
            </button>
            
            <Button variant="primary" onClick={() => navigate('/add-movie')} className="ml-4">
              <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> Adicionar Filme
            </Button>
            
            <Button variant="outline" onClick={() => navigate('/search')} className="ml-2">
              <FontAwesomeIcon icon={faSearch} className="mr-2" /> Explorar
            </Button>
          </div>
        </section>

        {/* 3. FILTROS EXPANDIDOS (Reconhecimento em vez de lembrança) */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-pr-gray-dark/20 rounded-xl border border-white/5 animate-slide-down">
            <FilterGroup label="Ordenar por">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-pr-black border-white/10 rounded-lg p-2 w-full">
                <option value="addedDate">Data de Adição</option>
                <option value="title">Título A-Z</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </FilterGroup>
            
            <FilterGroup label="Direção">
              <div className="flex bg-pr-black rounded-lg p-1">
                <button onClick={() => setSortOrder('desc')} className={`flex-1 py-1 rounded ${sortOrder === 'desc' ? 'bg-pr-gray' : ''}`}>
                  <FontAwesomeIcon icon={faArrowDown} className="mr-2" /> Descendente
                </button>
                <button onClick={() => setSortOrder('asc')} className={`flex-1 py-1 rounded ${sortOrder === 'asc' ? 'bg-pr-gray' : ''}`}>
                  <FontAwesomeIcon icon={faArrowUp} className="mr-2" /> Ascendente
                </button>
              </div>
            </FilterGroup>

            <FilterGroup label="Gênero">
               <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)} className="bg-pr-black border-white/10 rounded-lg p-2 w-full">
                <option value="all">Todos os gêneros</option>
                {/* Aqui você mapearia os gêneros reais da sua lista */}
              </select>
            </FilterGroup>
          </div>
        )}

        {/* 4. LISTA DE CONTEÚDO */}
        {displayList.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6" 
            : "flex flex-col gap-4"
          }>
            {displayList.map(movie => (
              <div key={movie.localId} className="group relative">
                <MovieCard 
                  movie={movie} 
                  layout={viewMode}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                />
                
                {/* Ações de Hover (Prevenção de Erros no Delete) */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => navigate(`/edit/${movie.localId}`)} className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-pr-cyan hover:text-black transition">
                     <FontAwesomeIcon icon={faEdit} />
                   </button>
                   <button onClick={() => { setMovieToDelete(movie); setIsModalOpen(true); }} className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-red-500 transition">
                     <FontAwesomeIcon icon={faTrash} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => { deleteMovie(movieToDelete.localId); setIsModalOpen(false); }}
        title="Remover da lista?"
        message={`Deseja mesmo remover "${movieToDelete?.title}"? Você poderá adicioná-lo novamente depois.`}
      />
    </div>
  );
};

// Sub-componentes para limpeza de código
const StatCard = ({ label, value, icon, color = "text-pr-cyan" }) => (
  <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl min-w-[140px]">
    <div className="flex items-center gap-3 mb-1">
      <FontAwesomeIcon icon={icon} className={`${color} text-sm`} />
      <span className="text-xs uppercase tracking-wider font-bold text-pr-gray">{label}</span>
    </div>
    <div className="text-2xl font-black text-white">{value}</div>
  </div>
);

const FilterGroup = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-pr-gray-light uppercase ml-1">{label}</label>
    {children}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-20 space-y-6">
    <div className="inline-flex p-6 bg-white/5 rounded-full">
      <FontAwesomeIcon icon={faFilm} className="text-6xl text-pr-gray-dark" />
    </div>
    <div className="max-w-sm mx-auto">
      <h3 className="text-2xl font-bold mb-2">Sua lista está esperando...</h3>
      <p className="text-pr-gray mb-8">Parece que você ainda não salvou nenhum filme. Explore o catálogo e comece sua coleção!</p>
      <Button variant="primary" size="lg">Ir para o Início</Button>
    </div>
  </div>
);

export default MyListPage;