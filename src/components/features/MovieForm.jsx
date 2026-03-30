import { useState, useEffect } from 'react';
import { tmdbService } from '../../services/tmdbService';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faImage,
  faSpinner, faCheckCircle, faTimesCircle, faSearch, faMagic
} from '@fortawesome/free-solid-svg-icons';

const MovieForm = ({ onSubmit, initialData = null, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    title: '', overview: '', poster_path: '', release_date: '',
    vote_average: '', runtime: '', genres: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Sync de dados iniciais para edição
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

  // Validação de Imagem com Debounce visual
  useEffect(() => {
    if (formData.poster_path) {
      const timer = setTimeout(() => validateImage(formData.poster_path), 500);
      return () => clearTimeout(timer);
    } else {
      setImagePreview('');
      setImageError(null);
    }
  }, [formData.poster_path]);

  const validateImage = (url) => {
    setIsImageLoading(true);
    setImageError(null);
    const img = new Image();
    img.onload = () => { setIsImageLoading(false); setImagePreview(url); };
    img.onerror = () => { setIsImageLoading(false); setImageError('URL de imagem inválida.'); };
    img.src = url;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchTMDB = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await tmdbService.search(searchQuery);
      setSearchResults(results.results.slice(0, 5));
    } catch (error) {
      console.error("Erro TMDB:", error);
    } finally {
      setIsSearching(false);
    }
  };

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
      setSearchResults([]);
      setSearchQuery('');
    } catch (error) {
      console.error("Erro Detalhes:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-[#0f0f0f]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
      <div className="p-6 md:p-12">
        <header className="mb-10 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2 text-pr-cyan">
            <FontAwesomeIcon icon={faMagic} className="text-sm" />
            <span className="text-[10px] uppercase tracking-[4px] font-bold">Content Manager</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
            {initialData ? 'Refinar Título' : 'Novo Conteúdo'}
          </h2>
        </header>

        {/* Busca Inteligente */}
        <section className="mb-12">
          <form onSubmit={handleSearchTMDB} className="flex gap-3 bg-white/5 p-2 rounded-2xl border border-white/5 focus-within:border-pr-cyan/50 transition-all">
            <input 
              className="flex-grow bg-transparent border-none focus:ring-0 text-white px-4 placeholder:text-white/20 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar no TMDB para auto-preencher..."
            />
            <Button type="submit" variant="primary" className="h-11 w-11 !p-0 rounded-xl" disabled={isSearching}>
              {isSearching ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : <FontAwesomeIcon icon={faSearch} />}
            </Button>
          </form>
          
          {searchResults.length > 0 && (
            <div className="relative">
              <ul className="absolute w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl animate-in fade-in slide-in-from-top-2">
                {searchResults.map(movie => (
                  <li key={movie.id} onClick={() => handleSelectMovie(movie)} className="flex items-center p-3 gap-4 hover:bg-pr-cyan/10 cursor-pointer transition-colors border-b border-white/5 last:border-none">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : ''} className="w-10 h-14 object-cover rounded-lg shadow-lg" alt="" />
                    <div>
                      <p className="font-bold text-white text-sm">{movie.title}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{movie.release_date?.split('-')[0]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Coluna de Inputs */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <Input label="Título Oficial" name="title" value={formData.title} onChange={handleChange} required placeholder="Ex: Inception" />
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[2px] font-bold text-white/40 ml-1">Sinopse do Conteúdo</label>
                <textarea
                  name="overview" value={formData.overview} onChange={handleChange} rows="5" required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/10 focus:outline-none focus:border-pr-cyan/50 transition-all resize-none text-sm leading-relaxed"
                  placeholder="Descreva a trama do filme..."
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input label="Data" name="release_date" type="date" value={formData.release_date} onChange={handleChange} />
                <Input label="Minutos" name="runtime" type="number" value={formData.runtime} onChange={handleChange} />
                <Input label="IMDB" name="vote_average" type="number" step="0.1" value={formData.vote_average} onChange={handleChange} />
                <Input label="Gêneros" name="genres" value={formData.genres} onChange={handleChange} />
              </div>

              <Input label="URL do Poster (W500)" name="poster_path" value={formData.poster_path} onChange={handleChange} required placeholder="https://image.tmdb.org/..." />
            </div>
          </div>

          {/* Coluna de Preview (Sticky) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6 flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[3px] font-bold text-white/20">Poster Preview</span>
              <div className="relative w-full aspect-[2/3] max-w-[280px] bg-white/5 rounded-[32px] border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group shadow-2xl">
                {isImageLoading && <FontAwesomeIcon icon={faSpinner} className="text-pr-cyan text-3xl animate-spin z-10" />}
                {imagePreview && !imageError ? (
                  <img src={imagePreview} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Preview" />
                ) : (
                  <FontAwesomeIcon icon={faImage} className="text-white/10 text-5xl" />
                )}
                {imageError && <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center"><FontAwesomeIcon icon={faTimesCircle} className="text-red-500 text-3xl" /></div>}
              </div>
              
              {/* Status da Imagem */}
              <div className="h-6 flex items-center gap-2">
                {imagePreview && !imageError && !isImageLoading && (
                  <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} /> Assets Ready
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="lg:col-span-12 flex flex-col sm:flex-row justify-end gap-4 pt-10 border-t border-white/5">
            <Button type="button" variant="secondary" onClick={() => window.history.back()} className="h-14 px-10 rounded-2xl order-2 sm:order-1 text-[10px] uppercase font-black tracking-widest">
              Descartar
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting || imageError} className="h-14 px-12 rounded-2xl order-1 sm:order-2 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
              {isSubmitting ? <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> : (initialData ? 'Salvar Alterações' : 'Publicar Título')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;