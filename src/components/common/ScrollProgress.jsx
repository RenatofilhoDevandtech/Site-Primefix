import { useState, useEffect } from 'react';
import { throttle } from '../../utils/throttle';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Mostrar a barra apenas se o usuário começou o scroll
      setIsVisible(scrollTop > 20);

      if (docHeight === windowHeight) {
          setScrollProgress(0);
          return;
      }

      const totalScrollableHeight = docHeight - windowHeight;
      const progress = (scrollTop / totalScrollableHeight) * 100;
      setScrollProgress(progress);
    };
    
    const throttledUpdate = throttle(updateScrollProgress, 50); // Reduzi para 50ms para maior fluidez
    
    window.addEventListener('scroll', throttledUpdate);
    return () => window.removeEventListener('scroll', throttledUpdate);
  }, []);
  
  return (
    <div className={`fixed top-0 left-0 right-0 h-[2px] md:h-[3px] z-[110] transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Fundo sutil para a trilha */}
      <div className="absolute inset-0 bg-white/5" />
      
      {/* A Barra de Progresso com Efeito Laser */}
      <div 
        className="h-full bg-gradient-to-r from-transparent via-pr-cyan to-white transition-all duration-150 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Efeito de Brilho na Ponta (Glow) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-full bg-pr-cyan blur-md opacity-50" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#00f2fe]" />
      </div>
    </div>
  );
};

export default ScrollProgress;