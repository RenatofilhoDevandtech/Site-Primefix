import { createContext, useState, useEffect, useMemo, useCallback } from 'react';

// 🚀 ESSENCIAL: Exportar o Contexto para que o hook em outro arquivo o encontre
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('@PrimeFlix:user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar usuário do localStorage:', error);
      localStorage.removeItem('@PrimeFlix:user'); // Limpa dados corrompidos
    }
    setIsLoading(false);
  }, []);

  const login = async (email) => {
    // Simulação de delay cinematográfico
    await new Promise(resolve => setTimeout(resolve, 800));
    const userData = { id: Date.now(), name: 'Cineasta Premium', email };
    setUser(userData);
    localStorage.setItem('@PrimeFlix:user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@PrimeFlix:user');
  };

  const updateUser = useCallback((updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem('@PrimeFlix:user', JSON.stringify(newUser));
  }, [user]);

  const value = useMemo(() => ({
    user,
    isLoading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  }), [user, isLoading, updateUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};