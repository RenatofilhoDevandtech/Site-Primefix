import { useState, useCallback, useRef, useEffect } from 'react'; // Adicionado useEffect aqui

export const useToast = (duration = 3000) => {
  const [toastInfo, setToastInfo] = useState({ isVisible: false, message: '', type: 'info' });
  const timerRef = useRef(null);

  const hideToast = useCallback(() => {
    setToastInfo(prev => ({ ...prev, isVisible: false }));
  }, []);

  const showToast = useCallback((message, type = 'info') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setToastInfo({ isVisible: true, message, type });
    timerRef.current = setTimeout(() => {
      hideToast();
    }, duration);
  }, [duration, hideToast]);

  // Limpeza: garante que o timer seja removido se o componente que usa o hook for desmontado.
  useEffect(() => {
    // A função de limpeza retornada pelo useEffect é executada quando o componente desmonta.
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []); // O array vazio [] significa que este efeito só roda uma vez (montagem/desmontagem).

  return { toastInfo, showToast };
};