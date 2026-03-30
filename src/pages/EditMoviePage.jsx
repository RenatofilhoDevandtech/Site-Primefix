import { useNavigate, useParams } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import MovieForm from '../components/features/MovieForm';
import { useEffect, useState, useCallback } from 'react';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import Toast from '../components/ui/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

const EditMoviePage = () => {
  const navigate = useNavigate();
  const { localId } = useParams();
  const { myList, updateMovie } = useMovies();

  const [movieToEdit, setMovieToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  const showToast = useCallback((message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  }, []);

  useEffect(() => {
    // Garantimos a comparação correta entre tipos (String/Number)
    const foundMovie = myList.find(movie => String(movie.localId) === String(localId));
    
    if (foundMovie) {
      setMovieToEdit(foundMovie);
    }
    setIsLoading(false);
  }, [localId, myList]);

  const handleUpdateMovie = async (formData) => {
    setIsSubmitting(true);
    try {
      // 1. Validações de Segurança
      if (!formData.title?.trim() || !formData.poster_path?.trim()) {
        throw new Error('Título e URL da imagem são campos obrigatórios.');
      }

      // 2. Mesclagem Inteligente de Dados
      // Mantemos as propriedades originais (como id da API) e sobrescrevemos com o formulário
      const updatedMovie = {
        ...movieToEdit, // Preserva dados que o form não edita (ex: id, backdrop_path)
        ...formData,    // Aplica as mudanças do usuário
        localId: movieToEdit.localId, // Garante que o ID local nunca mude
        vote_average: formData.vote_average ? parseFloat(formData.vote_average) : 0,
        runtime: formData.runtime ? parseInt(formData.runtime) : 0,
        updatedAt: new Date().toISOString()
      };

      await updateMovie(updatedMovie);
      
      showToast('Alterações salvas com sucesso!', 'success');
      
      // Delay para o usuário processar o sucesso
      setTimeout(() => navigate('/my-list'), 1500);
      
    } catch (error) {
      console.error("Erro na atualização:", error);
      showToast(error.message || 'Falha ao salvar. Tente novamente.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-pr-black">
        <Spinner size="xl" color="text-pr-cyan" />
      </div>
    );
  }

  if (!movieToEdit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pr-black px-6">
        <div className="text-center p-10 bg-pr-gray-dark/20 rounded-3xl border border-white/5 max-w-sm">
          <div className="text-pr-red text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Título não encontrado</h1>
          <p className="text-pr-gray mb-8">Este item pode ter sido removido ou o link está incorreto.</p>
          <Button onClick={() => navigate('/my-list')} variant="primary" className="w-full">
            Voltar para Minha Lista
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-16 bg-pr-black">
      <div className="max-w-2xl mx-auto px-6">
        
        {/* Header de Edição */}
        <header className="mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-pr-gray hover:text-pr-cyan transition-colors mb-6 group"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="group-hover:-translate-x-1 transition-transform" />
            Cancelar e voltar
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-pr-cyan/20 p-3 rounded-2xl">
              <FontAwesomeIcon icon={faEdit} className="text-2xl text-pr-cyan" />
            </div>
            <div>
              <h1 className="text-3xl font-black italic uppercase text-white tracking-tighter">
                Editar <span className="text-pr-cyan">Info</span>
              </h1>
              <p className="text-pr-gray-light text-sm italic">{movieToEdit.title}</p>
            </div>
          </div>
        </header>

        {/* Container do Formulário */}
        <section className="bg-pr-gray-dark/10 border border-white/5 p-8 rounded-3xl backdrop-blur-md">
          <MovieForm 
            onSubmit={handleUpdateMovie}
            initialData={movieToEdit}
            isSubmitting={isSubmitting}
            buttonText={isSubmitting ? 'Atualizando...' : 'Confirmar Alterações'}
            onCancel={() => navigate(-1)}
          />
        </section>
      </div>

      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
    </main>
  );
};

export default EditMoviePage;