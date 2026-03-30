import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider'; 

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider. Verifique se o App.jsx envolve a árvore com <AuthProvider>');
  }
  
  return context;
};