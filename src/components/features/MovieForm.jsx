/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { tmdbService } from '../../services/tmdbService';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faImage, 
  faCalendar, 
  faStar, 
  faClock,
  faFilm,
  faSpinner,
  faCheckCircle,
  faTimesCircle,
  faSearch
} from '@fortawesome/free-solid-svg-icons';

// --- COMPONENTE ---
const MovieForm = ({ onSubmit, initialData = null, isSubmitting = false }) => {
  // --- ESTADOS ---
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    poster_path: '',
    release_date: '',
    vote_average: '',
    runtime: '',
    genres: '',
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Efeito para preencher o formulário com dados iniciais (para edição)
  useEffect(() => {
    if (initialData) {
      const genresString = Array.isArray(initialData.genres) 
        ? initialData.genres.map(g => g.name).join(', ') 
        : initialData.genres || '';

      const posterPath = initialData.poster_path?.startsWith('http')
        ? initialData.poster_path
        : initialData.poster_path ? `https://image.tmdb.org/t/p/w500${initialData.poster_path}` : '';

      setFormData({
        title: initialData.title || '',
        overview: initialData.overview || '',
        genres: genresString,
        poster_path: posterPath,
        release_date: initialData.release_date || '',
        vote_average: initialData.vote_average || '',
        runtime: initialData.runtime || '',
      });
    }
  }, [initialData]);

  // Efeito para validar a imagem quando a URL muda
  useEffect(() => {
    if (formData.poster_path) {
      validateImage(formData.poster_path);
    } else {
      setImagePreview('');
      setImageError(null);
    }
  }, [formData.poster_path]);

  // --- FUNÇÕES ---

  const validateImage = (url) => {
    setIsImageLoading(true);
    setImageError(null);
    const img = new Image();
    img.onload = () => {
      setIsImageLoading(false);
      setImagePreview(url);
    };
    img.onerror = () => {
      setIsImageLoading(false);
      setImageError('Não foi possível carregar a imagem a partir desta URL.');
    };
    img.src = url;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSubmitting) {
      onSubmit(formData);
    }
  };

  // Função para buscar filmes no TMDB
  const handleSearchTMDB = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    try {
      const results = await tmdbService.searchMovies(searchQuery);
      setSearchResults(results.results.slice(0, 5)); // Limita a 5 resultados
    } catch (error) {
      console.error("Erro ao buscar no TMDB:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Função para preencher o formulário com um resultado da busca
  const handleSelectMovie = async (movie) => {
    try {
        const details = await tmdbService.getMovieDetails(movie.id);
        setFormData({
            title: details.title || '',
            overview: details.overview || '',
            genres: details.genres?.map(g => g.name).join(', ') || '',
            poster_path: details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : '',
            release_date: details.release_date || '',
            vote_average: details.vote_average || '',
            runtime: details.runtime || '',
        });
        setSearchQuery('');
        setSearchResults([]);
    } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
    }
  };

  // --- RENDERIZAÇÃO ---
  return (
    <div className="max-w-4xl mx-auto bg-secondary/50 backdrop-blur-lg border border-white/10 rounded-xl p-6 md:p-8">
      <h2 className="text-3xl font-bold text-text-light mb-2">
        {initialData ? 'Editar Filme' : 'Adicionar Novo Título'}
      </h2>
      <p className="text-text-muted mb-8">Preencha os campos manualmente ou use a busca para preencher automaticamente.</p>

      {/* Seção de Busca no TMDB */}
      <div className="mb-8 relative">
        <form onSubmit={handleSearchTMDB} className="flex gap-2">
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar filme no TMDB para preencher..."
          />
          <Button type="submit" variant="secondary" disabled={isSearching}>
            {isSearching ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faSearch} />}
          </Button>
        </form>
        {searchResults.length > 0 && (
          <ul className="absolute w-full bg-secondary border border-white/10 rounded-md mt-2 max-h-60 overflow-y-auto z-10">
            {searchResults.map(movie => (
              <li 
                key={movie.id}
                onClick={() => handleSelectMovie(movie)}
                className="flex items-center p-2 gap-3 hover:bg-primary/20 cursor-pointer"
              >
                <img 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : 'https://via.placeholder.com/92x138?text=N/A'}
                  alt={movie.title}
                  className="w-10 rounded-sm"
                />
                <div>
                  <p className="font-bold text-text-light">{movie.title}</p>
                  <p className="text-sm text-text-muted">{movie.release_date?.split('-')[0] || 'Data desconhecida'}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Inputs do formulário */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-text-muted mb-2">Título *</label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="overview" className="block text-sm font-medium text-text-muted mb-2">Sinopse *</label>
            <textarea
              id="overview" name="overview" value={formData.overview} onChange={handleChange}
              rows="6" required
              className="w-full bg-secondary border border-white/20 rounded-md p-3 text-text-light placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="release_date" className="block text-sm font-medium text-text-muted mb-2">Lançamento</label>
              <Input id="release_date" name="release_date" type="date" value={formData.release_date} onChange={handleChange} icon={faCalendar} />
            </div>
            <div>
              <label htmlFor="runtime" className="block text-sm font-medium text-text-muted mb-2">Duração (minutos)</label>
              <Input id="runtime" name="runtime" type="number" value={formData.runtime} onChange={handleChange} icon={faClock} />
            </div>
            <div>
              <label htmlFor="vote_average" className="block text-sm font-medium text-text-muted mb-2">Avaliação (0-10)</label>
              <Input id="vote_average" name="vote_average" type="number" step="0.1" value={formData.vote_average} onChange={handleChange} icon={faStar} />
            </div>
            <div>
              <label htmlFor="genres" className="block text-sm font-medium text-text-muted mb-2">Géneros</label>
              <Input id="genres" name="genres" value={formData.genres} onChange={handleChange} icon={faFilm} />
            </div>
          </div>
          <div>
            <label htmlFor="poster_path" className="block text-sm font-medium text-text-muted mb-2">URL da Imagem de Capa *</label>
            <Input id="poster_path" name="poster_path" type="url" value={formData.poster_path} onChange={handleChange} required />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-text-muted mb-2">Pré-visualização da Capa</label>
          <div className="relative w-full aspect-[2/3] bg-secondary rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center">
            {isImageLoading && <FontAwesomeIcon icon={faSpinner} className="text-text-muted text-3xl animate-spin" />}
            {imageError && <FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-3xl" title={imageError} />}
            {imagePreview && !imageError && (
              <img src={imagePreview} alt="Pré-visualização da capa" className="w-full h-full object-cover rounded-md" />
            )}
            {!imagePreview && !isImageLoading && !imageError && (
               <FontAwesomeIcon icon={faImage} className="text-text-muted text-3xl" />
            )}
          </div>
          <div className="text-xs text-center text-text-muted h-4">
            {isImageLoading && <p>Verificando...</p>}
            {imageError && <p className="text-red-500">{imageError}</p>}
            {imagePreview && !isImageLoading && !imageError && <p className="text-green-500 flex items-center justify-center gap-1"><FontAwesomeIcon icon={faCheckCircle} /> Imagem válida</p>}
          </div>
        </div>

        <div className="md:col-span-3 flex justify-end gap-3 pt-4 border-t border-white/10">
          <Button type="button" variant="secondary" onClick={() => window.history.back()}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting || isImageLoading || !!imageError}>
            {isSubmitting ? <><FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> Salvando...</> : (initialData ? 'Atualizar Filme' : 'Adicionar Filme')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;

