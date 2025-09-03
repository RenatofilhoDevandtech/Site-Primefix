import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackgroundGlow from '../common/BackgroundGlow';
import ScrollProgress from '../common/ScrollProgress';

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-pr-black text-pr-gray-light font-sans relative">
      <BackgroundGlow />
      <Header />
      <ScrollProgress />
      
      {/* GARANTA QUE NÃO HÁ PADDING (pt-xx) AQUI */}
      <main className="flex-grow">
        <div key={pathname} className="w-full"> {/* Removido max-w-7xl e espaçamentos laterais */}
            <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RootLayout;