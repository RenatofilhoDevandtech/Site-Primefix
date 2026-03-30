import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Contextos
import { AuthProvider } from './contexts/AuthProvider'; 
import { useAuth } from './hooks/useAuth';
import { NotificationProvider } from './contexts/NotificationContext';
import { MovieProvider } from './contexts/MovieContext';

// UI Básico
import RootLayout from './components/layout/RootLayout';
import LoadingSkeleton from './components/ui/LoadingSkeleton';

// --- COMPONENTE DE PROTEÇÃO (UX & SEGURANÇA) ---
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <LoadingSkeleton />;
  return user ? children : <Navigate to="/login" replace />;
};

// --- CARREGAMENTO SOB DEMANDA (LAZY LOADING) ---
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
// Esta é a sua página principal de planos e cadastro (com o novo plano Free)
const SubscriptionPage = lazy(() => import('./pages/SubscriptionPage')); 
const MyListPage = lazy(() => import('./pages/MyListPage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const SeriesPage = lazy(() => import('./pages/SeriesPage'));
const AddMoviePage = lazy(() => import('./pages/AddMoviePage'));
const EditMoviePage = lazy(() => import('./pages/EditMoviePage'));
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const HelpPage = lazy(() => import('./pages/HelpPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const StatusPage = lazy(() => import('./pages/StatusPage'));
const DevicesPage = lazy(() => import('./pages/DevicesPage'));
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <MovieProvider>
          <Suspense fallback={<LoadingSkeleton />}>
            <Routes>
              
              {/* 🚪 ROTAS DE ENTRADA (Foco total em Conversão) */}
              <Route path="/login" element={<LoginPage />} />
              
              {/* Rota Unificada: Aqui o usuário escolhe o Free ou Premium */}
              <Route path="/subscribe" element={<SubscriptionPage />} /> 

              {/* 🏗️ LAYOUT PRINCIPAL (Com Header e Footer) */}
              <Route path="/" element={<RootLayout />}>
                
                {/* 1. FLUXO PÚBLICO */}
                <Route index element={<HomePage />} />
                <Route path="filmes" element={<MoviesPage />} />
                <Route path="series" element={<SeriesPage />} />
                <Route path="movie/:id" element={<MovieDetailPage />} />
                
                {/* 2. FLUXO DE USUÁRIO (Protegido - Exige conta Free ou Premium) */}
                <Route path="my-list" element={
                  <ProtectedRoute><MyListPage /></ProtectedRoute>
                } />
                <Route path="profile" element={
                  <ProtectedRoute><ProfilePage /></ProtectedRoute>
                } />
                
                {/* 3. GESTÃO DE CONTEÚDO (Admin) */}
                <Route path="add-movie" element={
                   <ProtectedRoute><AddMoviePage /></ProtectedRoute>
                } />
                <Route path="edit-movie/:localId" element={
                   <ProtectedRoute><EditMoviePage /></ProtectedRoute>
                } />
                
                {/* 4. INSTITUCIONAL */}
                <Route path="help" element={<HelpPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="status" element={<StatusPage />} />
                <Route path="devices" element={<DevicesPage />} />
                <Route path="accessibility" element={<AccessibilityPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="privacy" element={<PrivacyPage />} />

                {/* ERRO 404 */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </MovieProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;