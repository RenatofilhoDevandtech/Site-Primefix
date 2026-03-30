import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, faPlus, faStar, faClock, faCalendar, 
  faArrowLeft, faCheck, faShareNodes, faTimes 
} from '@fortawesome/free-solid-svg-icons';

import { tmdbService } from '../services/tmdbService';
import { useMovies } from '../contexts/MovieContext';
import LoadingSpinner from '../components/ui/Spinner';

const ErrorDisplay = ({ message }) => (
  <div className="text-pr-cyan font-bold p-10 text-center">{message}</div>
);

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleMovie, isMovieInList } = useMovies();
  
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const [movieData, videoData] = await Promise.all([
          tmdbService.getMovieDetails(id),
          tmdbService.getVideos('movie', id)
        ]);
        setMovie(movieData);
        setVideos(videoData);
      } catch (err) {
        setError('Não conseguimos recuperar os detalhes deste título.');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchMovieDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const trailer = useMemo(() => 
    videos.find(v => v.type === 'Trailer' && v.site === 'YouTube'), 
  [videos]);

  const inList = isMovieInList(movie?.id);

  if (isLoading) return (
    <div className="min-h-screen bg-pr-black flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );

  if (error || !movie) return (
    <div className="min-h-screen bg-pr-black flex items-center justify-center text-center p-6">
      <ErrorDisplay message={error || 'Filme não encontrado'} />
    </div>
  );

  return (
    <div className="min-h-screen bg-pr-black text-white selection:bg-pr-cyan selection:text-pr-black animate-fade-in overflow-x-hidden">
      
      {/* NAVEGAÇÃO: Fixada no topo com Z-index máximo para não sumir atrás do Hero */}
      <nav className="fixed top-10 md:top-4 left-0 right-0 z-[150] p-6 md:p-12 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 px-4 py-2 bg-black/40 md:bg-white/10 hover:bg-pr-cyan hover:text-pr-black rounded-full backdrop-blur-md transition-all duration-300 border border-white/5 md:border-none"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xs md:text-base group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-[10px] md:text-sm uppercase tracking-wider">Voltar</span>
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center bg-black/40 md:bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all text-sm border border-white/5 md:border-none">
          <FontAwesomeIcon icon={faShareNodes} />
        </button>
      </nav>

      {/* HERO: Padding superior (pt-24) evita que o título suba demais no mobile */}
      <header className="relative min-h-[75vh] md:h-[85vh] w-full overflow-hidden flex flex-col justify-end">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom opacity-50 md:opacity-60"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-pr-black via-pr-black/20 to-transparent z-10" />

        <div className="relative w-full p-6 pt-24 md:p-12 lg:p-20 z-20">
          <div className="max-w-4xl space-y-4 md:space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-pr-cyan text-pr-black text-[9px] md:text-[10px] font-black rounded-sm uppercase tracking-tighter">
                Original Primeflix
              </span>
              <span className="text-pr-gray-light flex items-center gap-2 text-xs md:text-sm font-bold">
                <FontAwesomeIcon icon={faStar} className="text-pr-cyan" />
                {movie.vote_average?.toFixed(1)} Match
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] md:leading-[0.85] uppercase break-words">
              {movie.title}
            </h1>

            <p className="block md:hidden text-sm text-pr-gray-light max-w-2xl line-clamp-3 leading-relaxed">
              {movie.overview}
            </p>

            {/* BOTÕES: Coluna no mobile, Linha no desktop */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              {trailer && (
                <button 
                  onClick={() => setShowTrailer(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-pr-black font-black rounded-xl hover:bg-pr-cyan transition-all duration-300 shadow-xl text-sm md:text-base"
                >
                  <FontAwesomeIcon icon={faPlay} />
                  ASSISTIR TRAILER
                </button>
              )}
              
              <button
                onClick={() => toggleMovie(movie)}
                className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-black border-2 transition-all duration-300 text-sm md:text-base ${
                  inList 
                  ? 'bg-pr-cyan border-pr-cyan text-pr-black shadow-cyan-glow' 
                  : 'bg-transparent border-white/20 hover:border-white text-white'
                }`}
              >
                <FontAwesomeIcon icon={inList ? faCheck : faPlus} />
                {inList ? 'NA MINHA LISTA' : 'MINHA LISTA'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* DETALHES TÉCNICOS */}
      <section className="relative z-30 -mt-4 md:-mt-20 px-4 md:px-12 lg:px-20 pb-10 md:pb-20">
        <div className="max-w-7xl mx-auto bg-pr-gray-dark/80 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border border-white/5 p-6 md:p-16 shadow-2xl">
          
          {/* POSTER MOBILE */}
          <div className="block lg:hidden mb-8">
            <div className="flex justify-center">
              <img
                src={movie.coverUrl}
                alt={movie.title}
                className="w-48 h-auto rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-16">
            
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <img
                  src={movie.coverUrl}
                  alt={movie.title}
                  className="w-full rounded-2xl shadow-2xl border border-white/10 transform -rotate-2 hover:rotate-0 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-10 md:space-y-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 py-6 md:py-8 border-y border-white/10">
                <div className="space-y-1">
                  <p className="text-[9px] md:text-[10px] text-pr-cyan font-black uppercase tracking-[0.2em]">Duração</p>
                  <p className="text-lg md:text-xl font-bold flex items-center gap-2 tracking-tight">
                    <FontAwesomeIcon icon={faClock} className="opacity-50 text-xs md:text-sm" />
                    {movie.runtime}m
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] md:text-[10px] text-pr-cyan font-black uppercase tracking-[0.2em]">Ano</p>
                  <p className="text-lg md:text-xl font-bold flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendar} className="opacity-50 text-xs md:text-sm" />
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] md:text-[10px] text-pr-cyan font-black uppercase tracking-[0.2em]">Idioma</p>
                  <p className="text-lg md:text-xl font-bold uppercase">{movie.original_language}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] md:text-[10px] text-pr-cyan font-black uppercase tracking-[0.2em]">Match</p>
                  <p className="text-lg md:text-xl font-bold text-green-400">
                    {Math.round(movie.vote_average * 10)}%
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Categorias</h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {movie.genres?.map(genre => (
                    <span key={genre.id} className="px-4 py-1.5 md:px-6 md:py-2 bg-white/5 rounded-full text-[10px] md:text-xs font-bold border border-white/10">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tighter">Sinopse</h3>
                <p className="text-pr-gray-light leading-relaxed text-sm md:text-base lg:text-xl font-medium">
                  {movie.overview}
                </p>
              </div>

              <div className="pt-6 md:pt-8 lg:pt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-12 border-t border-white/10">
                 <div>
                    <h4 className="text-pr-cyan font-black mb-1 uppercase text-[9px] md:text-[10px] tracking-[0.2em]">Direção</h4>
                    <p className="text-base md:text-lg lg:text-2xl font-light italic">{movie.director || 'N/A'}</p>
                 </div>
                 <div>
                    <h4 className="text-pr-cyan font-black mb-1 uppercase text-[9px] md:text-[10px] tracking-[0.2em]">Elenco</h4>
                    <p className="text-xs md:text-sm lg:text-lg text-pr-gray-light leading-relaxed">
                      {movie.cast?.slice(0, 5).join(' • ') || 'N/A'}
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL TRAILER */}
      {showTrailer && trailer && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-0 md:p-4 animate-fade-in">
          <div className="relative w-full h-full md:max-w-5xl md:h-auto bg-black md:rounded-2xl overflow-hidden shadow-2xl border-y md:border border-white/10">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 left-4 md:right-4 z-50 w-16 h-16 md:w-10 md:h-10 bg-black/60 hover:bg-pr-cyan rounded-full flex items-center justify-center transition-colors border border-white/10 shadow-lg"
            >
              <FontAwesomeIcon icon={faTimes} className="text-white" />
            </button>
            <div className="relative w-full h-full md:pt-[56.25%] bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0&modestbranding=1`}
                title="Trailer"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;