import { useState, useMemo, useCallback } from 'react';

export const useMovieCardLogic = (movie) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  const cardData = useMemo(() => {
    // URL da imagem com fallback premium
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://placehold.co/500x750/0F1115/00FFFF?text=Sem+Poster';

    // Ano de Lançamento (Filmes usam release_date, Séries usam first_air_date)
    const rawDate = movie.release_date || movie.first_air_date;
    const releaseYear = rawDate ? new Date(rawDate).getFullYear() : 'S/A';
    
    // Rating formatado com uma casa decimal fixa
    const rating = movie.vote_average ? Number(movie.vote_average.toFixed(1)) : null;
    
    // Formatação de duração (Tratando caso o movie.runtime venha zerado)
    let formattedRuntime = 'N/A';
    if (movie.runtime && movie.runtime > 0) {
      const hours = Math.floor(movie.runtime / 60);
      const minutes = movie.runtime % 60;
      formattedRuntime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }

    return {
      title: movie.title || movie.name || 'Título Indisponível',
      imageUrl,
      releaseYear,
      rating,
      formattedRuntime,
      genresToDisplay: movie.genres?.slice(0, 2) || [],
      remainingGenresCount: movie.genres?.length > 2 ? movie.genres.length - 2 : 0,
    };
  }, [movie]);

  // UseCallback para evitar re-renders desnecessários nos componentes filhos
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);
  
  const handleImageError = useCallback(() => {
    setHasImageError(true);
    setIsImageLoaded(true); 
  }, []);

  return {
    ...cardData,
    isImageLoaded,
    hasImageError,
    handleImageLoad,
    handleImageError,
  };
};