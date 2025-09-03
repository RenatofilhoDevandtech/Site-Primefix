import { useNavigate, useParams } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import MovieForm from '../components/features/MovieForm';
import { useEffect, useState } from 'react';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';

const EditMoviePage = () => {
  const navigate = useNavigate();
  const { localId } = useParams();
  const { myList, updateMovie } = useMovies();

  const [movieToEdit, setMovieToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 4000);
  };

  useEffect(() => {
    const foundMovie = myList.find(movie => String(movie.localId) === String(localId));
    setMovieToEdit(foundMovie);
    setIsLoading(false);
  }, [localId, myList]);

  const handleUpdateMovie = async (movieData) => {
    setIsSubmitting(true);
    try {
      // Validação adicional dos dados
      if (!movieData.title || !movieData.poster_path) {
        throw new Error('Título e URL da imagem são obrigatórios');
      }

      // Validar URL da imagem
      try {
        new URL(movieData.poster_path);
      } catch {
        throw new Error('URL da imagem é inválida');
      }

      // Garantir que os dados numéricos estejam no formato correto
      const updatedMovie = {
        ...movieData,
        localId: movieToEdit.localId,
        vote_average: movieData.vote_average ? parseFloat(movieData.vote_average) : null,
        runtime: movieData.runtime ? parseInt(movieData.runtime) : null
      };

      updateMovie(updatedMovie);
      
      // Feedback de sucesso
      showToast('Filme atualizado com sucesso!', 'success');
      
      // Redirecionar após um breve delay para mostrar o toast
      setTimeout(() => {
        navigate('/my-list');
      }, 1500);
      
    } catch (error) {
      console.error("Falha ao atualizar o filme:", error);
      showToast(error.message || 'Erro ao atualizar filme. Tente novamente.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Volta para a página anterior
  };

  // Estado de Carregamento aprimorado com Spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-pr-black to-pr-gray-dark/30">
        <Spinner size="lg" />
      </div>
    );
  }

  // Estado de Erro caso o filme não seja encontrado
  if (!movieToEdit) {
    return (
      <div className="min-h-screen py-12 md:py-16 text-center bg-gradient-to-b from-pr-black to-pr-gray-dark/30">
        <div className="max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-pr-red mb-4">Filme não encontrado</h1>
          <p className="text-pr-gray mb-8">O título que você está tentando editar não existe ou foi removido.</p>
          <Button onClick={() => navigate('/my-list')} variant="primary">
            Voltar para Minha Lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 md:py-16 bg-gradient-to-b from-pr-black to-pr-gray-dark/30 animate-fade-in">
      <div className="max-w-2xl mx-auto px-4">
        {/* Cabeçalho com botão de voltar */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center text-pr-gray hover:text-pr-cyan transition-colors mr-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-pr-gray bg-clip-text text-transparent">
            Editar Título
          </h1>
        </div>
        
        {/* Descrição */}
        <p className="text-pr-gray mb-8 text-center max-w-md mx-auto">
          Edite as informações do título selecionado. Todas as alterações serão salvas em sua lista pessoal.
        </p>
        
        <MovieForm 
          onSubmit={handleUpdateMovie}
          initialData={movieToEdit}
          isSubmitting={isSubmitting}
          buttonText={isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          onCancel={handleCancel}
        />
      </div>

      {/* Toast de notificação */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: 'info' })}
        />
      )}
    </div>
  );
};

export default EditMoviePage;