import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('matchme-user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing matchme-user from localStorage:", error);
      return null;
    }
  });

  const login = (data) => {
    setUser(data);
    localStorage.setItem('matchme-user', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('matchme-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};
