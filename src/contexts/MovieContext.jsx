/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';

import * as movieStorageService from '../services/movieStorageService';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [myList, setMyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar a lista inicial de filmes
  useEffect(() => {
    const loadMovies = () => {
      try {
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

  // --- Funções CRUD Otimizadas com useCallback ---

  const addMovie = useCallback((movie) => {
    try {
      // O serviço já cuida de gerar um localId único
      const newMovie = movieStorageService.addMovieToList(movie);
      setMyList(prevList => [...prevList, newMovie]);
      return newMovie;
    } catch (error) {
      console.error("Falha ao adicionar filme:", error);
      throw error;
    }
  }, []);

  const updateMovie = useCallback((updatedMovie) => {
    try {
      movieStorageService.updateMovieInList(updatedMovie);
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
      movieStorageService.removeMovieFromList(localId);
      setMyList(prevList => prevList.filter(movie => movie.localId !== localId));
    } catch (error) {
      console.error("Falha ao remover filme:", error);
      throw error;
    }
  }, []);

  const isMovieInList = useCallback((apiId) => {
    return myList.some(movie => movie.id === apiId);
  }, [myList]);

  const getMovieByLocalId = useCallback((localId) => {
    return myList.find(movie => movie.localId === localId);
  }, [myList]);

  const refreshList = useCallback(() => {
    try {
      const savedMovies = movieStorageService.getMyList();
      setMyList(savedMovies);
      return savedMovies;
    } catch (error) {
      console.error("Falha ao recarregar lista:", error);
      throw error;
    }
  }, []);

  // --- Valor do Contexto Otimizado com useMemo ---

  const value = useMemo(() => ({
    myList,
    isLoading,
    addMovie,
    updateMovie,
    deleteMovie,
    isMovieInList,
    getMovieByLocalId,
    refreshList,
  }), [
    myList, 
    isLoading, 
    addMovie, 
    updateMovie, 
    deleteMovie, 
    isMovieInList, 
    getMovieByLocalId,
    refreshList
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