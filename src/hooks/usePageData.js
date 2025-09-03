import { useState, useCallback, useEffect } from 'react';
import { tmdbService } from '../services/tmdbService';

const MOVIE_CATEGORIES = {
  trending: () => tmdbService.getTrendingMovies(),
  popular: () => tmdbService.getPopularMovies(),
  topRated: () => tmdbService.getTopRatedMovies(),
  upcoming: () => tmdbService.getUpcomingMovies(),
};

export const usePageData = () => {
  const [data, setData] = useState({ trending: [], popular: [], topRated: [], upcoming: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const categoryKeys = Object.keys(MOVIE_CATEGORIES);
      const promises = categoryKeys.map(key => MOVIE_CATEGORIES[key]());
      const results = await Promise.allSettled(promises);
      const newData = {};
      let hasAtLeastOneSuccess = false;

      results.forEach((result, index) => {
        const key = categoryKeys[index];
        if (result.status === 'fulfilled' && result.value) {
          newData[key] = result.value;
          hasAtLeastOneSuccess = true;
        } else {
          newData[key] = [];
          console.warn(`Falha ao carregar a categoria: ${key}`, result.reason);
        }
      });

      if (!hasAtLeastOneSuccess) throw new Error('Não foi possível conectar aos servidores.');
      setData(newData);
    } catch (err) {
      setError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, isLoading, error, retry: fetchData };
};