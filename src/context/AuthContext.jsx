import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const obtenerEstadoInicial = () => {
    const token = localStorage.getItem('userToken');
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!token) {
        return { isAuthenticated: false, user: null, token: null, roles: [] };
    }

    try {
        const decoded = jwtDecode(token);

        // Si expiró, lo limpiamos
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userData');
            return { isAuthenticated: false, user: null, token: null, roles: [] };
        }

        return {
            isAuthenticated: true,
            user: userData?.username || decoded.sub,   // <--- Nombre de usuario REAL
            token,
            roles: decoded.roles || []
        };

    } catch (error) {
        console.error("Error al decodificar token:", error);
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        return { isAuthenticated: false, user: null, token: null, roles: [] };
    }
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(obtenerEstadoInicial);

    // =============================
    // 🔥 LOGIN CORREGIDO
    // =============================
    const login = (token, userData) => {
        // Guardar token y datos del usuario
        localStorage.setItem('userToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));

        try {
            const decoded = jwtDecode(token);

            setAuthState({
                isAuthenticated: true,
                user: userData.username,   // <--- AQUÍ SE GUARDA EL NOMBRE REAL
                token,
                roles: decoded.roles || []
            });

        } catch (error) {
            console.error("Login fallido al decodificar token:", error);
            logout();
        }
    };

    // =============================
    // LOGOUT
    // =============================
    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');

        setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            roles: []
        });
    };

    const hasRole = (role) => {
        return authState.roles.includes(role);
    };

    // Configurar token global en Axios
    useEffect(() => {
        if (authState.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [authState.token]);

    return (
        <AuthContext.Provider value={{ ...authState, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
