import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';

// Importação corrigida para garantir que o objeto seja lido corretamente
import { movieStorageService } from '../services/movieStorageService';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar a lista inicial
  useEffect(() => {
    const loadMovies = () => {
      try {
        // Alinhado com o nome no seu serviço: getMyList
        const savedMovies = movieStorageService.getMyList();
        setMyList(savedMovies);
      } catch (error) {
        console.error("Falha ao carregar a lista de filmes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, []);

  // --- Funções CRUD Corrigidas para os nomes do seu Service ---

  const addMovie = useCallback((movie) => {
    try {
      // Ajustado de 'addMovieToList' para 'addItem' (conforme seu service)
      const newItem = movieStorageService.addItem(movie);
      if (newItem) {
        setMyList(prevList => [...prevList, newItem]);
        return newItem;
      }
    } catch (error) {
      console.error("Falha ao adicionar filme:", error);
      throw error;
    }
  }, []);

  const updateMovie = useCallback((updatedMovie) => {
    try {
      // Ajustado de 'updateMovieInList' para 'updateItem'
      movieStorageService.updateItem(updatedMovie);
      setMyList(prevList => 
        prevList.map(movie => 
          movie.localId === updatedMovie.localId ? updatedMovie : movie
        )
      );
    } catch (error) {
      console.error("Falha ao atualizar filme:", error);
      throw error;
    }
  }, []);

  const deleteMovie = useCallback((localId) => {
    try {
      // Ajustado de 'removeMovieFromList' para 'removeItem'
      movieStorageService.removeItem(localId);
      setMyList(prevList => prevList.filter(movie => movie.localId !== localId));
    } catch (error) {
      console.error("Falha ao remover filme:", error);
      throw error;
    }
  }, []);

  const isMovieInList = useCallback((apiId) => {
    // Usando o método nativo do seu service para performance
    return movieStorageService.isItemInList(apiId);
  }, []);

  const getMovieByLocalId = useCallback((localId) => {
    return movieStorageService.getItemById(localId);
  }, []);

  const toggleMovie = useCallback(async (movie) => {
    const inList = isMovieInList(movie.id);
    if (inList) {
      // Remove
      const item = myList.find(m => m.id === movie.id);
      if (item) {
        await deleteMovie(item.localId);
      }
    } else {
      // Add
      await addMovie(movie);
    }
  }, [isMovieInList, myList, deleteMovie, addMovie]);

  const value = useMemo(() => ({
    myList,
    isLoading,
    addMovie,
    updateMovie,
    deleteMovie,
    toggleMovie,
    isMovieInList,
    getMovieByLocalId,
  }), [
    myList, 
    isLoading, 
    addMovie, 
    updateMovie, 
    deleteMovie,
    toggleMovie,
    isMovieInList, 
    getMovieByLocalId,
  ]);

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies deve ser usado dentro de um MovieProvider');
  }
  return context;
};