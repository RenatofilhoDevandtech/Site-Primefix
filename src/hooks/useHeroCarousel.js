import { useState, useEffect, useCallback, useRef } from 'react';

const AUTO_ADVANCE_DELAY = 10000; // 10 segundos

export const useHeroCarousel = (itemCount) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1));
  }, [itemCount]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
  }, [itemCount]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (itemCount > 1 && !isHovering) {
      timerRef.current = setTimeout(goToNext, AUTO_ADVANCE_DELAY);
    }
    return () => clearTimeout(timerRef.current);
  }, [currentIndex, goToNext, itemCount, isHovering]);

  return {
    currentIndex,
    isHovering,
    goToNext,
    goToPrevious,
    setIsHovering,
  };
};