import { useMemo } from 'react';
import { useMovies } from '../contexts/MovieContext';

/**
 * Hook inteligente para recomendações personalizadas
 * Aplica lógica de negócio baseada nos gostos do usuário
 */
export const useSmartRecommendations = () => {
  const { myList } = useMovies();

  // Análise de preferências do usuário
  const userPreferences = useMemo(() => {
    if (!myList.length) {
      return {
        favoriteGenres: [],
        favoriteDecades: [],
        avgRating: 0,
        preferredLanguages: [],
        totalWatchTime: 0
      };
    }

    // Análise de gêneros favoritos
    const genreCount = {};
    myList.forEach(movie => {
      movie.genres?.forEach(genre => {
        genreCount[genre.name] = (genreCount[genre.name] || 0) + 1;
      });
    });

    const favoriteGenres = Object.entries(genreCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);

    // Análise de décadas preferidas
    const decadeCount = {};
    myList.forEach(movie => {
      const year = new Date(movie.release_date).getFullYear();
      const decade = Math.floor(year / 10) * 10;
      decadeCount[decade] = (decadeCount[decade] || 0) + 1;
    });

    const favoriteDecades = Object.entries(decadeCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([decade]) => parseInt(decade));

    // Avaliação média dos filmes da lista
    const avgRating = myList.reduce((sum, movie) => sum + (movie.vote_average || 0), 0) / myList.length;

    // Idiomas preferidos
    const languageCount = {};
    myList.forEach(movie => {
      const lang = movie.original_language || 'en';
      languageCount[lang] = (languageCount[lang] || 0) + 1;
    });

    const preferredLanguages = Object.entries(languageCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([lang]) => lang);

    // Tempo total de exibição
    const totalWatchTime = myList.reduce((sum, movie) => sum + (movie.runtime || 0), 0);

    return {
      favoriteGenres,
      favoriteDecades,
      avgRating,
      preferredLanguages,
      totalWatchTime
    };
  }, [myList]);

  // Sistema de pontuação para recomendações
  const calculateRecommendationScore = (movie, preferences) => {
    let score = 0;

    // Pontuação por gênero (peso alto)
    const genreMatch = movie.genres?.some(genre =>
      preferences.favoriteGenres.includes(genre.name)
    );
    if (genreMatch) score += 30;

    // Pontuação por década (peso médio)
    const movieYear = new Date(movie.release_date).getFullYear();
    const movieDecade = Math.floor(movieYear / 10) * 10;
    const decadeMatch = preferences.favoriteDecades.includes(movieDecade);
    if (decadeMatch) score += 20;

    // Pontuação por avaliação (se o usuário gosta de filmes bem avaliados)
    if (preferences.avgRating > 7.0 && movie.vote_average >= 7.0) {
      score += 15;
    } else if (preferences.avgRating <= 7.0 && movie.vote_average >= 6.0) {
      score += 10;
    }

    // Pontuação por idioma
    const languageMatch = preferences.preferredLanguages.includes(movie.original_language);
    if (languageMatch) score += 10;

    // Bônus para filmes recentes se o usuário assiste filmes atuais
    const currentYear = new Date().getFullYear();
    if (preferences.favoriteDecades.includes(2020) && movieYear >= currentYear - 2) {
      score += 5;
    }

    // Penalização para filmes já na lista
    const alreadyInList = myList.some(listMovie => listMovie.id === movie.id);
    if (alreadyInList) score = 0;

    return score;
  };

  // Filtrar recomendações baseadas na pontuação
  const getRecommendations = (availableMovies) => {
    if (!myList.length || !availableMovies.length) return [];

    const scoredMovies = availableMovies.map(movie => ({
      ...movie,
      recommendationScore: calculateRecommendationScore(movie, userPreferences)
    }));

    return scoredMovies
      .filter(movie => movie.recommendationScore > 0)
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 20); // Top 20 recomendações
  };

  // Sugestões baseadas no contexto atual
  const getContextualSuggestions = (currentCategory, availableMovies) => {
    const suggestions = [];

    // Se estiver vendo filmes antigos, sugerir clássicos similares
    if (currentCategory === 'classics') {
      suggestions.push({
        type: 'contextual',
        title: 'Clássicos do Cinema',
        description: 'Filmes icônicos que marcaram época',
        movies: availableMovies
          .filter(movie => {
            const year = new Date(movie.release_date).getFullYear();
            return year < 1990 && movie.vote_average >= 7.5;
          })
          .slice(0, 10)
      });
    }

    // Se estiver vendo filmes de ação, sugerir similares de alta octanagem
    if (currentCategory === 'action') {
      suggestions.push({
        type: 'contextual',
        title: 'Ação Intensa',
        description: 'Para quem gosta de adrenalina',
        movies: availableMovies
          .filter(movie =>
            movie.genres?.some(genre =>
              ['Action', 'Adventure', 'Thriller'].includes(genre.name)
            ) && movie.vote_average >= 6.5
          )
          .slice(0, 10)
      });
    }

    return suggestions;
  };

  // Análise de descoberta - o que o usuário ainda não explorou
  const getDiscoverySuggestions = (allMovies) => {
    const discoveries = [];

    // Gêneros não explorados
    const userGenres = new Set(myList.flatMap(movie => movie.genres?.map(g => g.name) || []));
    const allGenres = new Set(allMovies.flatMap(movie => movie.genres?.map(g => g.name) || []));

    const unexploredGenres = [...allGenres].filter(genre => !userGenres.has(genre));

    if (unexploredGenres.length > 0) {
      discoveries.push({
        type: 'discovery',
        title: 'Novos Gêneros',
        description: `Explore ${unexploredGenres.slice(0, 3).join(', ')}`,
        movies: allMovies
          .filter(movie =>
            movie.genres?.some(genre => unexploredGenres.includes(genre.name))
          )
          .slice(0, 15)
      });
    }

    // Décadas não exploradas
    const userDecades = new Set(myList.map(movie => {
      const year = new Date(movie.release_date).getFullYear();
      return Math.floor(year / 10) * 10;
    }));

    const allDecades = new Set(allMovies.map(movie => {
      const year = new Date(movie.release_date).getFullYear();
      return Math.floor(year / 10) * 10;
    }));

    const unexploredDecades = [...allDecades]
      .filter(decade => !userDecades.has(decade))
      .sort((a, b) => b - a); // Décadas mais recentes primeiro

    if (unexploredDecades.length > 0) {
      discoveries.push({
        type: 'discovery',
        title: 'Épocas Diferentes',
        description: `Descubra o cinema dos anos ${unexploredDecades.slice(0, 2).join(' e ')}`,
        movies: allMovies
          .filter(movie => {
            const year = new Date(movie.release_date).getFullYear();
            const decade = Math.floor(year / 10) * 10;
            return unexploredDecades.includes(decade);
          })
          .slice(0, 15)
      });
    }

    return discoveries;
  };

  // Análise de tendências - o que está bombando
  const getTrendingInsights = (trendingMovies) => {
    const insights = [];

    // Gêneros em alta
    const trendingGenres = {};
    trendingMovies.slice(0, 20).forEach(movie => {
      movie.genres?.forEach(genre => {
        trendingGenres[genre.name] = (trendingGenres[genre.name] || 0) + 1;
      });
    });

    const topTrendingGenres = Object.entries(trendingGenres)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    if (topTrendingGenres.length > 0) {
      insights.push({
        type: 'trend',
        title: 'Gêneros em Alta',
        description: `${topTrendingGenres.map(([genre]) => genre).join(', ')} estão bombando`,
        data: topTrendingGenres
      });
    }

    // Comparação com preferências do usuário
    const userFavoriteGenre = userPreferences.favoriteGenres[0];
    const isUserGenreTrending = topTrendingGenres.some(([genre]) => genre === userFavoriteGenre);

    if (userFavoriteGenre && isUserGenreTrending) {
      insights.push({
        type: 'personal',
        title: 'Seu Gênero Favorito Está em Alta!',
        description: `${userFavoriteGenre} está entre os mais assistidos da semana`,
        highlight: true
      });
    }

    return insights;
  };

  return {
    userPreferences,
    getRecommendations,
    getContextualSuggestions,
    getDiscoverySuggestions,
    getTrendingInsights,
    calculateRecommendationScore
  };
};