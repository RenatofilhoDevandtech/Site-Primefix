import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackgroundGlow from '../common/BackgroundGlow';
import ScrollProgress from '../common/ScrollProgress';
import CookieConsentBanner from '../common/CookieConsentBanner'; // 🚀 Importação do Banner

const RootLayout = () => {
  const { pathname } = useLocation();

  // Reset de scroll ao trocar de rota - Garantindo foco no topo
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-pr-black text-pr-gray-light font-sans relative overflow-x-hidden selection:bg-pr-cyan/30">
      
      {/* 1. Camada Atmosférica (Z-0) */}
      <BackgroundGlow />
      
      {/* 2. Feedback de Leitura (Z-[110]) - Sempre visível no topo */}
      <ScrollProgress />
      
      {/* 3. Navegação (Z-[100]) */}
      <Header />
      
      {/* 4. Conteúdo Dinâmico (Z-10) */}
      <main className="flex-grow flex flex-col relative z-10">
        {/* Usamos o pathname como key para disparar animações de entrada se necessário */}
        <div key={pathname} className="w-full flex-grow flex flex-col animate-in fade-in duration-500">
          <Outlet />
        </div>
      </main>
      
      {/* 5. Rodapé Institucional (Z-10) */}
      <Footer />

      {/* 6. Camada de Consentimento e Diálogos (Z-[100])
          O Banner entra aqui no final para sobrepor o conteúdo e o Footer, 
          mas respeitar o Header se necessário.
      */}
      <CookieConsentBanner />

    </div>
  );
};

export default RootLayout;