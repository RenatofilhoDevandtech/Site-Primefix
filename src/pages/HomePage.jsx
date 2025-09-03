import HeroCarousel from '../components/features/HeroCarousel';
import MovieCarousel from '../components/features/MovieCarousel';
import Toast from '../components/ui/Toast';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import ErrorDisplay from '../components/ui/ErrorDisplay';
import { useMovies } from '../contexts/MovieContext';
import { usePageData } from '../hooks/usePageData';
import { useToast } from '../hooks/useToast';

const carouselSections = [
  { title: 'Populares', dataKey: 'popular' },
  { title: 'Mais Votados', dataKey: 'topRated' },
  { title: 'Tendências da Semana', dataKey: 'trending' },
  { title: 'Em Breve', dataKey: 'upcoming' },
];

const HomePage = () => {
  const { data: movies, isLoading, error, retry } = usePageData();
  const { addMovie, isMovieInList } = useMovies();
  const { toastInfo, showToast } = useToast();

  const handleAddToList = (movie) => {
    if (isMovieInList(movie.id)) {
      showToast(`"${movie.title}" já está na sua lista.`, 'info');
    } else {
      addMovie(movie);
      showToast(`"${movie.title}" foi adicionado à sua lista!`, 'success');
    }
  };
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={retry} />;
  }

  return (
    <>
      <Toast {...toastInfo} />
      
      <HeroCarousel movies={movies.trending.slice(0, 5)} onAddToList={handleAddToList} />

      {/* Este container agora controla o espaçamento dos carrosséis */}
      <div className="py-12 space-y-12 mt-[-10vh] relative z-10">
        {carouselSections.map(section => (
          movies[section.dataKey]?.length > 0 && (
            <MovieCarousel 
              key={section.title}
              title={section.title}
              movies={movies[section.dataKey]}
              onAddToList={handleAddToList}
            />
          )
        ))}
      </div>
    </>
  );
};

export default HomePage;