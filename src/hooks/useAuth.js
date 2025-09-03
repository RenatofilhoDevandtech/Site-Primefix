import { useContext } from 'react';
// A LINHA MAIS IMPORTANTE:
// Deve vir de '../contexts/auth-context.js' (sem .jsx!)
import { AuthContext } from '../contexts/auth-context'; 

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};