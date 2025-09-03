import { useRef, useState, useEffect, useCallback } from 'react';
import { throttle } from '../utils/throttle';

export const useCarouselScroll = (dependency) => {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScrollPosition = useCallback(() => {
    const element = scrollRef.current;
    if (element) {
      const { scrollLeft, scrollWidth, clientWidth } = element;
      const isAtEnd = scrollWidth - scrollLeft - clientWidth < 1;
      setShowLeftButton(scrollLeft > 1);
      setShowRightButton(!isAtEnd && scrollWidth > clientWidth);
    }
  }, []);

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
  }, [checkScrollPosition, dependency]);

  const scroll = (direction) => {
    const element = scrollRef.current;
    if (element) {
      const scrollAmount = element.clientWidth;
      element.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return { scrollRef, scroll, showLeftButton, showRightButton };
};