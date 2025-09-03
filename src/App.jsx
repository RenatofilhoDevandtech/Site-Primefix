import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// CORREÇÃO PRINCIPAL AQUI:
// Garante que a importação vem do ficheiro 'AuthProvider.jsx'
import { AuthProvider } from './contexts/AuthProvider'; 

import { MovieProvider } from './contexts/MovieContext';
import RootLayout from './components/layout/RootLayout';
import LoadingSkeleton from './components/ui/LoadingSkeleton';
import PlaceholderPage from './pages/PlaceholderPage';

// Páginas com Lazy Loading
const HomePage = lazy(() => import('./pages/HomePage'));
const MyListPage = lazy(() => import('./pages/MyListPage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const SeriesPage = lazy(() => import('./pages/SeriesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              {/* Rotas */}
              <Route index element={<HomePage />} />
              <Route path="my-list" element={<MyListPage />} />
              <Route path="filmes" element={<MoviesPage />} />
              <Route path="series" element={<SeriesPage />} />
              
              {/* Rotas Institucionais */}
              <Route path="help" element={<PlaceholderPage title="Central de Ajuda" />} />
              <Route path="contact" element={<PlaceholderPage title="Fale Conosco" />} />
              <Route path="status" element={<PlaceholderPage title="Status do Serviço" />} />
              <Route path="devices" element={<PlaceholderPage title="Dispositivos Compatíveis" />} />
              <Route path="terms" element={<PlaceholderPage title="Termos de Uso" />} />
              <Route path="privacy" element={<PlaceholderPage title="Política de Privacidade" />} />
              <Route path="accessibility" element={<PlaceholderPage title="Acessibilidade" />} />

              {/* Rota 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </MovieProvider> {/* <-- CORREÇÃO: Removido o "_" daqui */}
    </AuthProvider>
  );
}
export default App;