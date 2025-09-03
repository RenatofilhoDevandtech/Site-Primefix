import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useClickOutside } from '../../../hooks/useClickOutside';

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchNode = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={searchNode} className="relative hidden md:block">
      <div className={`relative transition-all duration-300 ${isOpen ? 'w-72' : 'w-56'}`}>
        <input
          type="search"
          placeholder="Buscar títulos..."
          className="bg-pr-gray-dark/70 border border-pr-border/50 rounded-full py-2 pl-4 pr-10 w-full text-sm text-pr-gray-light placeholder:text-pr-gray focus:outline-none focus:border-pr-cyan focus:ring-2 focus:ring-pr-cyan/30 transition-all duration-300 backdrop-blur-sm"
          onFocus={() => setIsOpen(true)}
        />
        <FontAwesomeIcon icon={faSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-pr-gray" />
      </div>
      {/* Aqui viria a lógica para mostrar os resultados da busca se 'isOpen' for true */}
    </div>
  );
};

export default Search;