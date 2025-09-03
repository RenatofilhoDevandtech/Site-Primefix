import { useState } from 'react';
import PropTypes from 'prop-types';
// Importa o contexto do ficheiro ao lado
import { AuthContext } from './auth-context'; 

const mockUser = { name: 'Renato Filho', email: 'renato@email.com' };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUser);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  const value = { user, isAuthenticated: !!user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};