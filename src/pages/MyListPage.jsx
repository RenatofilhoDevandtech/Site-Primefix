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
  faPlusCircle, 
  faFilm, 
  faSearch, 
  faFilter,
  faSort,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const MyListPage = () => {
  const { myList, isLoading, deleteMovie } = useMovies();
  const navigate = useNavigate();

  // Estados para controlar o modal de confirmação de exclusão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  // Estados para busca e filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('addedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  const handleOpenDeleteModal = (movie) => {
    setMovieToDelete(movie);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (movieToDelete) {
      deleteMovie(movieToDelete.localId);
    }
    setIsModalOpen(false);
    setMovieToDelete(null);
  };

  // Filtrar e ordenar a lista
  const filteredAndSortedList = useMemo(() => {
    let filtered = myList;
    
    // Aplicar filtro de busca
    if (searchQuery) {
      filtered = filtered.filter(movie => 
        movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.overview?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Aplicar ordenação
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'title':
          aValue = a.title || '';
          bValue = b.title || '';
          break;
        case 'rating':
          aValue = a.vote_average || 0;
          bValue = b.vote_average || 0;
          break;
        case 'year':
          aValue = a.release_date ? new Date(a.release_date).getFullYear() : 0;
          bValue = b.release_date ? new Date(b.release_date).getFullYear() : 0;
          break;
        case 'addedDate':
        default:
          aValue = a.addedAt || a.localId;
          bValue = b.addedAt || b.localId;
          break;
      }
      
      // Comparar valores
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
    });
    
    return filtered;
  }, [myList, searchQuery, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('addedDate');
    setSortOrder('desc');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="py-12 md:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-pr-gray bg-clip-text text-transparent">
            Minha Lista
          </h1>
          <Button onClick={() => navigate('/add-movie')}>
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
            Adicionar Novo Título
          </Button>
        </div>

        {/* Barra de busca e filtros */}
        <div className="mb-8 bg-pr-gray-dark/50 backdrop-blur-lg rounded-xl p-4 border border-pr-border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Input
                type="text"
                placeholder="Buscar na minha lista..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                iconLeft={faSearch}
                clearable={true}
                onClear={() => setSearchQuery('')}
              />
            </div>
            
            <Button 
              variant="secondary" 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center"
            >
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              Filtros
            </Button>
          </div>
          
          {/* Painel de filtros expandido */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-pr-border">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <label className="text-pr-gray-light font-medium">Ordenar por:</label>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-pr-gray-dark border border-pr-border rounded-lg px-3 py-2 text-pr-gray-light"
                >
                  <option value="addedDate">Data de adição</option>
                  <option value="title">Título</option>
                  <option value="rating">Avaliação</option>
                  <option value="year">Ano</option>
                </select>
                
                <Button 
                  variant="ghost" 
                  onClick={toggleSortOrder}
                  className="flex items-center"
                >
                  <FontAwesomeIcon icon={faSort} className="mr-2" />
                  {sortOrder === 'asc' ? 'Crescente' : 'Decrescente'}
                </Button>
                
                {(searchQuery || sortBy !== 'addedDate') && (
                  <Button 
                    variant="ghost" 
                    onClick={clearFilters}
                    className="flex items-center text-pr-red hover:text-pr-red/80"
                  >
                    <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
                    Limpar filtros
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Contador de resultados */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-pr-gray">
              {filteredAndSortedList.length} {filteredAndSortedList.length === 1 ? 'resultado' : 'resultados'} para &quot;{searchQuery}&quot;
            </p>
          </div>
        )}

        {filteredAndSortedList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredAndSortedList.map((movie) => (
              <MovieCard
                key={movie.localId || movie.id}
                movie={movie}
                showActions={true}
                onEdit={() => navigate(`/edit-movie/${movie.localId}`)}
                onDelete={() => handleOpenDeleteModal(movie)}
              />
            ))}
          </div>
        ) : (
          // "Empty State" aprimorado
          <div className="text-center py-20 flex flex-col items-center">
            {searchQuery ? (
              <>
                <FontAwesomeIcon icon={faSearch} className="text-7xl text-pr-border mb-6" />
                <h2 className="text-2xl font-bold text-pr-gray-light">Nenhum resultado encontrado</h2>
                <p className="text-pr-gray mt-2 max-w-md">
                  Não encontramos nenhum título correspondente a &quot;{searchQuery}&quot;. Tente ajustar sua busca.
                </p>
                <Button onClick={clearFilters} className="mt-8">
                  Limpar busca
                </Button>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faFilm} className="text-7xl text-pr-border mb-6" />
                <h2 className="text-2xl font-bold text-pr-gray-light">Sua lista está vazia.</h2>
                <p className="text-pr-gray mt-2 max-w-md">
                  Parece que você ainda não adicionou nenhum título. Comece a explorar ou adicione seu primeiro filme!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button onClick={() => navigate('/')}>
                    Explorar Catálogo
                  </Button>
                  <Button onClick={() => navigate('/add-movie')} variant="primary">
                    Adicionar Primeiro Título
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        message={`Você tem certeza que deseja remover &quot;${movieToDelete?.title}&quot; da sua lista? Esta ação não pode ser desfeita.`}
        type="danger"
      />
    </>
  );
};

export default MyListPage;