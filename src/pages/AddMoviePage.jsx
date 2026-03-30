import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import MovieForm from '../components/features/MovieForm';
import Toast from '../components/ui/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const AddMoviePage = () => {
  const navigate = useNavigate();
  const { addMovie } = useMovies();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    // Reset automático do toast
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const handleAddMovie = async (movieData) => {
    setIsSubmitting(true);
    try {
      // 1. Validação Básica
      if (!movieData.title || !movieData.poster_path) {
        throw new Error('Título e Imagem (URL) são obrigatórios');
      }

      // 2. Preparação do Objeto (Normalização)
      const movieWithMetadata = {
        ...movieData,
        // Geramos um ID numérico para manter compatibilidade com a lógica de API
        id: Date.now(), 
        addedAt: new Date().toISOString(),
        isUserAdded: true, // Tag para identificar filmes manuais
        vote_average: movieData.vote_average ? parseFloat(movieData.vote_average) : 0,
        runtime: movieData.runtime ? parseInt(movieData.runtime) : 0,
        // Garantimos que campos de texto não venham nulos
        overview: movieData.overview || 'Sem descrição informada.',
        genres: movieData.genre ? [{ name: movieData.genre }] : []
      };

      // 3. Persistência via Contexto
      await addMovie(movieWithMetadata);
      
      showToast('Título adicionado à sua coleção!', 'success');
      
      // Delay estratégico para o usuário ver o feedback antes de mudar de tela
      setTimeout(() => navigate('/my-list'), 1500);
      
    } catch (error) {
      console.error("Falha ao adicionar:", error);
      showToast(error.message || 'Erro ao processar dados.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-16 bg-pr-black selection:bg-pr-cyan">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Header - Identidade Visual Siteprime */}
        <header className="flex flex-col items-center text-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="self-start mb-6 flex items-center gap-2 text-pr-gray hover:text-white transition-colors group"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
          
          <div className="bg-pr-cyan/10 p-4 rounded-full mb-4">
            <FontAwesomeIcon icon={faPlusCircle} className="text-3xl text-pr-cyan" />
          </div>
          
          <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
            Novo <span className="text-pr-cyan">Título</span>
          </h1>
          <p className="text-pr-gray-light max-w-xs">
            Personalize sua lista adicionando filmes que não encontrou no catálogo oficial.
          </p>
        </header>
        
        {/* Card do Formulário */}
        <div className="bg-pr-gray-dark/20 border border-white/5 p-8 rounded-3xl backdrop-blur-sm shadow-2xl">
          <MovieForm 
            onSubmit={handleAddMovie} 
            isSubmitting={isSubmitting}
            buttonText={isSubmitting ? 'Salvando...' : 'Adicionar à Minha Lista'}
            onCancel={() => navigate(-1)}
          />
        </div>
      </div>

      {/* Notificação flutuante */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </main>
  );
};

export default AddMoviePage;