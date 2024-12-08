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

    const login = (email) => {
        localStorage.setItem('userEmail', email);
        setEmail(email);
    };

    const logout = () => {
        localStorage.removeItem('userEmail');
        setEmail(null);
    };

    return (
        <AuthContext.Provider value={{ email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
