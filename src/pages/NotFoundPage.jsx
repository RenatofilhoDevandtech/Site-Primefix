import { Link } from 'react-router-dom'; // Usar o Link do React Router para navegação SPA

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Oops! Página não encontrada.</h2>
        <p className="text-lg text-gray-400 mb-8">
          Parece que você se perdeu nos arquivos. O conteúdo que procura não está aqui.
        </p>
        {/* Usamos <Link> em vez de <a> para evitar um refresh completo da página, 
          mantendo a experiência de uma Single Page Application (SPA).
        */}
        <Link 
          to="/" 
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 inline-block"
        >
          Voltar para a Segurança da Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;