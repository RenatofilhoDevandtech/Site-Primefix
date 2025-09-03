import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import MovieForm from '../components/features/MovieForm';
import Toast from '../components/ui/Toast';

const AddMoviePage = () => {
  const navigate = useNavigate();
  const { addMovie } = useMovies();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 4000);
  };

  const handleAddMovie = async (movieData) => {
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

      // Adicionar metadados adicionais
      const movieWithMetadata = {
        ...movieData,
        addedAt: new Date().toISOString(),
        isUserAdded: true,
        // Garantir que a avaliação seja um número
        vote_average: movieData.vote_average ? parseFloat(movieData.vote_average) : null,
        // Garantir que a duração seja um número
        runtime: movieData.runtime ? parseInt(movieData.runtime) : null
      };

      await addMovie(movieWithMetadata);
      
      // Feedback de sucesso
      showToast('Filme adicionado com sucesso!', 'success');
      
      // Redirecionar após um breve delay para mostrar o toast
      setTimeout(() => {
        navigate('/my-list');
      }, 1500);
      
    } catch (error) {
      console.error("Falha ao adicionar o filme:", error);
      showToast(error.message || 'Erro ao adicionar filme. Tente novamente.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Volta para a página anterior
  };

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
          <h1 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-pr-gray bg-clip-text text-transparent"
          >
            Adicionar Novo Título
          </h1>
        </div>
        
        {/* Descrição */}
        <p className="text-pr-gray mb-8 text-center max-w-md mx-auto">
          Adicione um novo título à sua coleção pessoal. Preencha todas as informações para uma melhor experiência.
        </p>
        
        {/* Formulário */}
        <MovieForm 
          onSubmit={handleAddMovie} 
          isSubmitting={isSubmitting}
          buttonText={isSubmitting ? 'Adicionando...' : 'Adicionar Filme'}
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

export default AddMoviePage;