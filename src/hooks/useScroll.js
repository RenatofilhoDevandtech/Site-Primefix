import { useState, useEffect, useCallback, useRef } from 'react';

export const useScroll = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);
  const throttleTimeout = useRef(null);
  const lastScrollY = useRef(0);

  // Função de throttling manual para evitar dependências externas
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Só processa se passou pelo menos 100ms desde a última execução
    if (!throttleTimeout.current) {
      throttleTimeout.current = setTimeout(() => {
        setScrolled(currentScrollY > threshold);
        lastScrollY.current = currentScrollY;
        throttleTimeout.current = null;
      }, 100);
    }
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verifica a posição inicial

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
    };
  }, [handleScroll]);

  return scrolled;
};