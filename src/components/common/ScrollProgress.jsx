import { useState, useEffect } from 'react';
import { throttle } from '../../utils/throttle'; // Importamos a nossa função

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      
      // Evitar divisão por zero se o conteúdo for menor que a tela
      if (docHeight === windowHeight) {
          setScrollProgress(0);
          return;
      }

      const totalScrollableHeight = docHeight - windowHeight;
      const progress = (scrollTop / totalScrollableHeight) * 100;
      setScrollProgress(progress);
    };
    
    // Criamos uma versão "throttled" da nossa função de atualização.
    // Ela só será executada a cada 100ms, no máximo.
    const throttledUpdate = throttle(updateScrollProgress, 100);
    
    window.addEventListener('scroll', throttledUpdate);
    
    // Limpeza: removemos o listener ao desmontar o componente
    return () => window.removeEventListener('scroll', throttledUpdate);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-pr-border/20">
      <div 
        className="h-full bg-gradient-to-r from-pr-cyan to-pr-purple transition-all duration-100 ease-linear"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;