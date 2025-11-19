import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
// Puedes necesitar una librería para decodificar el token JWT si quieres leer los roles o la expiración:
// npm install jwt-decode
import { jwtDecode } from 'jwt-decode'; 

export const AuthContext = createContext();

// URL para verificar la validez del token o obtener el perfil (si fuera necesario)
const API_PERFIL_URL = 'http://localhost:8080/api/users/profile'; 

const obtenerEstadoInicial = () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
        return { isAuthenticated: false, user: null, token: null, roles: [] };
    }
    
    try {
        const decoded = jwtDecode(token);
        // Verificar si el token no ha expirado
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('userToken');
            return { isAuthenticated: false, user: null, token: null, roles: [] };
        }
        
        // Asumimos que el payload del JWT tiene 'sub' (username/email) y 'roles'
        return {
            isAuthenticated: true,
            user: decoded.sub, // Generalmente el email o username
            token: token,
            roles: decoded.roles || [], // El backend debe incluir un array de roles aquí
        };

    } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem('userToken');
        return { isAuthenticated: false, user: null, token: null, roles: [] };
    }
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(obtenerEstadoInicial);
    
    // Función centralizada para manejar el login
    const login = (token) => {
        localStorage.setItem('userToken', token);
        
        try {
            const decoded = jwtDecode(token);
            setAuthState({
                isAuthenticated: true,
                user: decoded.sub, 
                token: token,
                roles: decoded.roles || [],
            });
            // Opcional: Redirigir o recargar si es necesario
        } catch (error) {
            console.error("Login fallido al decodificar token:", error);
            logout();
        }
    };
    
    // Función centralizada para manejar el logout
    const logout = () => {
        localStorage.removeItem('userToken');
        setAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
            roles: [],
        });
    };
    
    // Función auxiliar para verificar roles (útil para el componente RutaProtegida)
    const hasRole = (role) => {
        return authState.roles.includes(role);
    };

    // Opcional: Configurar la instancia base de Axios para incluir el token
    useEffect(() => {
        if (authState.token) {
            // Configura Axios para que todas las peticiones futuras incluyan el token
            axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
        } else {
            // Si no hay token, elimina el header de autorización
            delete axios.defaults.headers.common['Authorization'];
        }
        // Este efecto se ejecutará cada vez que el token cambie (login/logout)
    }, [authState.token]);


    const value = {
        ...authState, // Provee isAuthenticated, user, token, roles
        login,
        logout,
        hasRole,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};