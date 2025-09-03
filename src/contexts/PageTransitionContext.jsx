/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

// 1. Cria o Contexto
const PageTransitionContext = createContext();

// 2. Cria um hook customizado para facilitar o uso do contexto
export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition deve ser usado dentro de um PageTransitionProvider');
  }
  return context;
};

// 3. Cria o Provedor que irá "abraçar" a aplicação
export const PageTransitionProvider = ({ children }) => {
  // O estado que será compartilhado: se a transição está completa ou não.
  const [isTransitionComplete, setIsTransitionComplete] = useState(true);
  
  return (
    <PageTransitionContext.Provider value={{ isTransitionComplete, setIsTransitionComplete }}>
      {children}
    </PageTransitionContext.Provider>
  );
};

// A exportação padrão não é estritamente necessária, mas mantida por consistência.
export default PageTransitionContext;
