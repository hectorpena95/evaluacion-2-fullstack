import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // ⬅️ Nuevo: Importar useAuth

const PaginaLogin = () => {
    // ⬅️ Obtener la función de login del contexto
    const { login } = useAuth(); 

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        setError(null);

        const API_URL = 'http://localhost:8080/api/auth/login'; 

        try {
            const response = await axios.post(API_URL, formData);
            
            // 1. Obtener el token de la respuesta
            const { token } = response.data; 

            if (!token) {
                throw new Error("Respuesta de login inválida: Token no recibido.");
            }

            console.log('Login exitoso. Token:', token);
            
            // 2. Usar la función login del AuthContext
            // Esto guarda el token en localStorage, actualiza el estado global
            // y configura el header de Axios para futuras peticiones.
            login(token); 
            
            // 3. Opcional: Mostrar un mensaje temporal de éxito (reemplazando el alert)
            // Ya que no podemos usar alert(), usaremos la consola y una redirección
            console.log('¡Inicio de sesión exitoso!');
            
            // 4. Redirigir a la página principal (o al dashboard de admin si hasRole('ADMIN') es true)
            navigate('/'); 
            
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            
            let errorMessage = 'Ocurrió un error inesperado.';

            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    errorMessage = 'Credenciales inválidas. Verifique su email y contraseña.';
                } else if (err.response.data && err.response.data.message) {
                    errorMessage = err.response.data.message;
                } else {
                    errorMessage = `Error del servidor: ${err.response.status}`;
                }
            } else if (err.request) {
                errorMessage = 'No se pudo conectar al servidor. Asegúrese de que el Backend esté corriendo.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="pagina-login container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card bg-dark text-white shadow-lg border-0">
                        <div className="card-body p-4 p-md-5">
                            <h2 className="card-title text-center mb-4 text-success">Iniciar Sesión</h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Campo Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Campo Contraseña */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-success w-100 mt-3" disabled={loading}>
                                    {loading ? 'Iniciando...' : 'Entrar'}
                                </button>
                            </form>
                            
                            <p className="text-center mt-3 text-secondary">
                                ¿No tienes cuenta? <Link to="/registro" className="text-info">Regístrate aquí</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PaginaLogin;