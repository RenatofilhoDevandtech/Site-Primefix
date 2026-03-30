import { useRef, useState, useEffect, useCallback } from 'react';
import { throttle } from '../utils/throttle';

export const useCarouselScroll = (movies, infinite = true) => {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const checkScrollPosition = useCallback(() => {
    const element = scrollRef.current;
    if (element) {
      const { scrollWidth, clientWidth } = element;

      if (infinite && movies?.length > 0) {
        // Para scroll infinito, sempre mostrar botões se houver mais de 3 itens
        setShowLeftButton(movies.length > 3);
        setShowRightButton(movies.length > 3);
      } else {
        // Melhorar usabilidade: sempre mostrar botões se houver conteúdo para rolar
        setShowLeftButton(scrollWidth > clientWidth);
        setShowRightButton(scrollWidth > clientWidth);
      }
    }
  }, [movies, infinite]);

  useEffect(() => {
    const throttledCheck = throttle(checkScrollPosition, 150);
    const element = scrollRef.current;
    if (element) {
      checkScrollPosition();
      element.addEventListener('scroll', throttledCheck);
      window.addEventListener('resize', throttledCheck);
      return () => {
        element.removeEventListener('scroll', throttledCheck);
        window.removeEventListener('resize', throttledCheck);
      };
    }
  }, [checkScrollPosition]);

  const scroll = useCallback((direction) => {
    const element = scrollRef.current;
    if (element && !isScrolling) {
      setIsScrolling(true);

      const cardWidth = element.querySelector('.movie-card')?.offsetWidth || 200;
      const gap = 16; // gap-4 = 1rem = 16px
      const scrollAmount = cardWidth + gap;

      element.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });

      // Reset scrolling flag after animation
      setTimeout(() => setIsScrolling(false), 300);
    }
  }, [isScrolling]);

  // Navegação por teclado
  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          scroll('left');
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          scroll('right');
        }
      };
      element.addEventListener('keydown', handleKeyDown);
      return () => element.removeEventListener('keydown', handleKeyDown);
    }
  }, [scroll]);

  // Scroll infinito - quando chegar no final, volta ao início (mais suave)
  const handleInfiniteScroll = useCallback(() => {
    if (!infinite) return;

    const element = scrollRef.current;
    if (element) {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      const threshold = 100; // Aumentado de 50 para 100 para menos sensibilidade

      // Se chegou no final
      if (scrollWidth - scrollLeft - clientWidth < threshold) {
        // Delay maior para transição mais suave
        setTimeout(() => {
          element.scrollTo({ left: 0, behavior: 'smooth' });
        }, 500); // Aumentado de 100 para 500ms
      }
      // Se chegou no início (rolando para esquerda)
      else if (scrollLeft < threshold) {
        // Delay maior para transição mais suave
        setTimeout(() => {
          element.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
        }, 500); // Aumentado de 100 para 500ms
      }
    }
  }, [infinite]);

  useEffect(() => {
    const element = scrollRef.current;
    if (element && infinite) {
      const throttledInfinite = throttle(handleInfiniteScroll, 500); // Aumentado de 200 para 500ms
      element.addEventListener('scroll', throttledInfinite);
      return () => element.removeEventListener('scroll', throttledInfinite);
    }
  }, [handleInfiniteScroll, infinite]);

  return {
    scrollRef,
    scroll,
    showLeftButton,
    showRightButton,
    isScrolling
  };
};