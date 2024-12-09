import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const login = (userEmail) => {
        localStorage.setItem('userEmail', userEmail);
        setEmail(userEmail);
    };

    const logout = () => {
        setEmail(null);
        localStorage.removeItem('userEmail');
    };

    return (
        <AuthContext.Provider value={{ email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
