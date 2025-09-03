import axios from 'axios';
import { buildImageUrl } from '../utils/imageUrlBuilder';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Cria uma instância do axios com configurações padrão
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR',
  },
});

// Interceptor para tratamento global de erros
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição à API TMDB:', error);
    
    if (error.response?.status === 401) {
      console.error('Chave de API inválida ou não fornecida');
    } else if (error.response?.status === 404) {
      console.error('Recurso não encontrado');
    } else if (error.response?.status === 429) {
      console.error('Limite de requisições excedido');
    }
    
    return Promise.reject(error);
  }
);

/**
 * Formata dados de filme da API TMDB para nosso formato
 * @param {object} movieData - Dados brutos do filme da API
 * @returns {object} - Filme formatado
 */
const formatMovieData = (movieData) => ({
  id: movieData.id,
  title: movieData.title,
  overview: movieData.overview,
  poster_path: movieData.poster_path,
  backdrop_path: movieData.backdrop_path,
  vote_average: movieData.vote_average,
  release_date: movieData.release_date,
  genre_ids: movieData.genre_ids,
  runtime: movieData.runtime,
  media_type: 'movie',
  // URLs completas das imagens
  coverUrl: buildImageUrl(movieData.poster_path, 'w500'),
  backdropUrl: buildImageUrl(movieData.backdrop_path, 'w1280')
});

/**
 * Formata dados de série da API TMDB para nosso formato
 * @param {object} tvData - Dados brutos da série da API
 * @returns {object} - Série formatada
 */
const formatTvData = (tvData) => ({
  id: tvData.id,
  title: tvData.name,
  name: tvData.name,
  overview: tvData.overview,
  poster_path: tvData.poster_path,
  backdrop_path: tvData.backdrop_path,
  vote_average: tvData.vote_average,
  release_date: tvData.first_air_date,
  first_air_date: tvData.first_air_date,
  genre_ids: tvData.genre_ids,
  media_type: 'tv',
  // URLs completas das imagens
  coverUrl: buildImageUrl(tvData.poster_path, 'w500'),
  backdropUrl: buildImageUrl(tvData.backdrop_path, 'w1280')
});

// Exporta um objeto com todos os métodos do nosso serviço
export const tmdbService = {
  /**
   * Busca os filmes em alta na semana.
   * @returns {Promise<Array>} - Lista de filmes formatados.
   */
  getTrendingMovies: async () => {
    try {
      const response = await apiClient.get('/trending/movie/week');
      return response.data.results.map(formatMovieData);
    } catch (error) {
      console.error('Erro ao buscar filmes em alta:', error);
      throw error;
    }
  },

  /**
   * Busca os filmes mais populares.
   * @returns {Promise<Array>} - Lista de filmes formatados.
   */
  getPopularMovies: async () => {
    try {
      const response = await apiClient.get('/movie/popular');
      return response.data.results.map(formatMovieData);
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      throw error;
    }
  },

  /**
   * Busca os filmes mais bem avaliados.
   * @returns {Promise<Array>} - Lista de filmes formatados.
   */
  getTopRatedMovies: async () => {
    try {
      const response = await apiClient.get('/movie/top_rated');
      return response.data.results.map(formatMovieData);
    } catch (error) {
      console.error('Erro ao buscar filmes mais votados:', error);
      throw error;
    }
  },

  /**
   * Busca filmes em cartaz nos cinemas.
   * @returns {Promise<Array>} - Lista de filmes formatados.
   */
  getNowPlayingMovies: async () => {
    try {
      const response = await apiClient.get('/movie/now_playing');
      return response.data.results.map(formatMovieData);
    } catch (error) {
      console.error('Erro ao buscar filmes em cartaz:', error);
      throw error;
    }
  },

  /**
   * Busca filmes que em breve estarão nos cinemas.
   * @returns {Promise<Array>} - Lista de filmes formatados.
   */
  getUpcomingMovies: async () => {
    try {
      const response = await apiClient.get('/movie/upcoming');
      return response.data.results.map(formatMovieData);
    } catch (error) {
      console.error('Erro ao buscar filmes em breve:', error);
      throw error;
    }
  },

  /**
   * Busca séries em alta na semana.
   * @returns {Promise<Array>} - Lista de séries formatadas.
   */
  getTrendingTv: async () => {
    try {
      const response = await apiClient.get('/trending/tv/week');
      return response.data.results.map(formatTvData);
    } catch (error) {
      console.error('Erro ao buscar séries em alta:', error);
      throw error;
    }
  },

  /**
   * Busca séries mais populares.
   * @returns {Promise<Array>} - Lista de séries formatadas.
   */
  getPopularTv: async () => {
    try {
      const response = await apiClient.get('/tv/popular');
      return response.data.results.map(formatTvData);
    } catch (error) {
      console.error('Erro ao buscar séries populares:', error);
      throw error;
    }
  },

  /**
   * Busca séries mais bem avaliadas.
   * @returns {Promise<Array>} - Lista de séries formatadas.
   */
  getTopRatedTv: async () => {
    try {
      const response = await apiClient.get('/tv/top_rated');
      return response.data.results.map(formatTvData);
    } catch (error) {
      console.error('Erro ao buscar séries mais votadas:', error);
      throw error;
    }
  },

  /**
   * Busca séries que estão no ar atualmente.
   * @returns {Promise<Array>} - Lista de séries formatadas.
   */
  getOnAirTv: async () => {
    try {
      const response = await apiClient.get('/tv/on_the_air');
      return response.data.results.map(formatTvData);
    } catch (error) {
      console.error('Erro ao buscar séries no ar:', error);
      throw error;
    }
  },

  /**
   * Busca séries que estão sendo transmitidas hoje.
   * @returns {Promise<Array>} - Lista de séries formatadas.
   */
  getAiringTodayTv: async () => {
    try {
      const response = await apiClient.get('/tv/airing_today');
      return response.data.results.map(formatTvData);
    } catch (error) {
      console.error('Erro ao buscar séries transmitindo hoje:', error);
      throw error;
    }
  },

  /**
   * Busca detalhes de um filme específico.
   * @param {number} id - ID do filme.
   * @returns {Promise<object>} - Detalhes do filme.
   */
  getMovieDetails: async (id) => {
    try {
      const response = await apiClient.get(`/movie/${id}`);
      return formatMovieData(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do filme:', error);
      throw error;
    }
  },

  /**
   * Busca detalhes de uma série específica.
   * @param {number} id - ID da série.
   * @returns {Promise<object>} - Detalhes da série.
   */
  getTvDetails: async (id) => {
    try {
      const response = await apiClient.get(`/tv/${id}`);
      return formatTvData(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da série:', error);
      throw error;
    }
  },

  /**
   * Busca vídeos (trailers) de um filme ou série.
   * @param {string} mediaType - Tipo de mídia ('movie' ou 'tv').
   * @param {number} id - ID do filme ou série.
   * @returns {Promise<Array>} - Lista de vídeos.
   */
  getVideos: async (mediaType, id) => {
    try {
      const response = await apiClient.get(`/${mediaType}/${id}/videos`);
      // Filtra apenas trailers e vídeos do YouTube
      return response.data.results.filter(
        video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
      );
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
      throw error;
    }
  },

  /**
   * Busca itens por termo de pesquisa.
   * @param {string} query - Termo de pesquisa.
   * @param {string} type - Tipo de mídia ('movie', 'tv' ou 'multi').
   * @returns {Promise<Array>} - Resultados da pesquisa.
   */
  search: async (query, type = 'multi') => {
    try {
      const response = await apiClient.get('/search/multi', {
        params: { query }
      });
      
      // Filtra e formata os resultados baseado no tipo
      return response.data.results
        .filter(item => {
          if (type === 'multi') return true;
          return item.media_type === type;
        })
        .map(item => {
          if (item.media_type === 'movie') return formatMovieData(item);
          if (item.media_type === 'tv') return formatTvData(item);
          return item;
        });
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      throw error;
    }
  },

  /**
   * Busca gêneros de filmes.
   * @returns {Promise<Array>} - Lista de gêneros.
   */
  getMovieGenres: async () => {
    try {
      const response = await apiClient.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      console.error('Erro ao buscar gêneros de filmes:', error);
      throw error;
    }
  },

  /**
   * Busca gêneros de séries.
   * @returns {Promise<Array>} - Lista de gêneros.
   */
  getTvGenres: async () => {
    try {
      const response = await apiClient.get('/genre/tv/list');
      return response.data.genres;
    } catch (error) {
      console.error('Erro ao buscar gêneros de séries:', error);
      throw error;
    }
  }
};