import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('isPortfolioAdmin') === 'true';
  });

  useEffect(() => {
    // Sync logic can go here if needed, but initialization is handled above
  }, []);

  const login = (password) => {
    // Hidden password for Vaibhav - in a real app this would be server-side
    if (password === 'Jaan@9140301058') {
      setIsAdmin(true);
      localStorage.setItem('isPortfolioAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isPortfolioAdmin');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
