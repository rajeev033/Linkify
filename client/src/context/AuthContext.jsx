// AuthContext.js
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function checkLoggedIn() {
      try {
        const res = await axios.get('http://localhost:8080/api/v1/user/isLoggedIn', { withCredentials: true });
        setIsLoggedIn(true);
        const userDataJSON = localStorage.getItem('userData');
        const userData = JSON.parse(userDataJSON)
        setUser(userData);
        setIsLoggedIn(true);
      } catch (e) {
        setUser(null);
        setIsLoggedIn(false);
       
      }
    }
    checkLoggedIn();
  },[]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};