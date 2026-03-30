import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';
import { tmdbService } from '../../../services/tmdbService';
import { buildImageUrl } from '../../../utils/imageUrlBuilder';
import { throttle } from '../../../utils/throttle';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchNode = useClickOutside(() => setIsOpen(false));
  const navigate = useNavigate();

  const searchMovies = useCallback(
    throttle(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        setIsLoading(true);
        const searchResults = await tmdbService.search(searchQuery);
        setResults(searchResults.slice(0, 5)); 
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    searchMovies(query);
  }, [query, searchMovies]);

  const handleResultClick = (movie) => {
    navigate(`/movie/${movie.id}`);
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <div ref={searchNode} className="relative hidden md:block">
      {/* Input de Busca com animação de largura e foco em Cyan */}
      <div className={`relative transition-all duration-500 ease-out ${isOpen ? 'w-80' : 'w-48'}`}>
        <input
          type="search"
          placeholder="Buscar títulos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="bg-white/5 border border-white/10 rounded-full py-2.5 pl-5 pr-12 w-full text-sm text-white placeholder:text-pr-gray focus:outline-none focus:border-pr-cyan focus:ring-4 focus:ring-pr-cyan/10 transition-all duration-300 backdrop-blur-md"
        />
        <FontAwesomeIcon 
          icon={faSearch} 
          className={`absolute right-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isOpen ? 'text-pr-cyan' : 'text-pr-gray'}`} 
        />
      </div>

      {/* Resultados da Busca - Glassmorphism Estilizado */}
      {isOpen && (query.trim() || isLoading) && (
        <div className="absolute top-[calc(100%+12px)] right-0 w-80 bg-pr-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50 overflow-hidden animate-fade-in-fast">
          
          {isLoading && (
            <div className="p-6 text-center">
              <div className="inline-block w-5 h-5 border-2 border-pr-cyan/30 border-t-pr-cyan rounded-full animate-spin mb-2"></div>
              <p className="text-xs text-pr-gray uppercase tracking-widest font-bold">Buscando...</p>
            </div>
          )}

          {!isLoading && results.length === 0 && query.trim() && (
            <div className="p-8 text-center">
              <p className="text-sm text-pr-gray opacity-60 italic-none">Nenhum título encontrado</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="p-2 space-y-1">
              <p className="px-3 py-2 text-[10px] font-black text-pr-cyan uppercase tracking-[0.2em] opacity-80">
                Principais Resultados
              </p>
              {results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleResultClick(movie)}
                  className="flex items-center gap-4 p-2.5 hover:bg-white/5 rounded-xl cursor-pointer transition-all duration-200 group"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={buildImageUrl(movie.poster_path, 'w92')}
                      alt={movie.title}
                      className="w-10 h-14 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
                      onError={(e) => { e.target.src = '/placeholder-movie.jpg'; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white text-sm font-medium truncate group-hover:text-pr-cyan transition-colors">
                      {movie.title}
                    </h4>
                    <p className="text-pr-gray text-xs mt-0.5 font-bold">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;