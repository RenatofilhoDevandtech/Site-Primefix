import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { throttle } from '../../../utils/throttle';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    const throttledToggleVisibility = throttle(toggleVisibility, 200);
    window.addEventListener('scroll', throttledToggleVisibility);
    return () => window.removeEventListener('scroll', throttledToggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-pr-cyan text-pr-black rounded-full flex items-center justify-center shadow-lg hover:bg-pr-cyan/90 transition-all duration-300 z-50 animate-fade-in"
        aria-label="Voltar ao topo"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    )
  );
};

export default BackToTopButton;