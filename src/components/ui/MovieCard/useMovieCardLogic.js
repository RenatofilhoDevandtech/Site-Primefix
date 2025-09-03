import { useState, useMemo } from 'react';

export const useMovieCardLogic = (movie) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  // Usamos useMemo para garantir que estes cálculos só são refeitos se 'movie' mudar.
  const cardData = useMemo(() => {
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://placehold.co/500x750/1a1a1a/FFFFFF?text=Primeflix';

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    
    const rating = movie.vote_average ? (movie.vote_average * 10) / 10 : null;
    
    let formattedRuntime = null;
    if (movie.runtime) {
      formattedRuntime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
    }

    const genresToDisplay = movie.genres?.slice(0, 2) || [];
    const remainingGenresCount = movie.genres?.length > 2 ? movie.genres.length - 2 : 0;

    return {
      title: movie.title || movie.name,
      imageUrl,
      releaseYear,
      rating,
      formattedRuntime,
      genresToDisplay,
      remainingGenresCount,
    };
  }, [movie]);

  const handleImageLoad = () => setIsImageLoaded(true);
  
  const handleImageError = () => {
    setHasImageError(true);
    setIsImageLoaded(true); // Consideramos carregada para remover o skeleton
  };

  return {
    ...cardData,
    isImageLoaded,
    hasImageError,
    handleImageLoad,
    handleImageError,
  };
};