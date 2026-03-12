import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedAdmin = localStorage.getItem('isPortfolioAdmin') === 'true';
    setIsAdmin(savedAdmin);
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
