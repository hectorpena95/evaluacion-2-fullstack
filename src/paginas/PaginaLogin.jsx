import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // FIX: Se eliminó la extensión explícita (.jsx) para permitir la correcta resolución del módulo

const PaginaLogin = () => {
    // Obtener la función de login del contexto
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

        // Endpoint del backend
        const API_URL = 'http://localhost:8080/api/v1/auth/autenticar'; 

        // =================================================================
        // 🔑 DEPURA: Muestra los datos que se están enviando al servidor
        // (La contraseña no se muestra por seguridad, solo el email)
        console.log('Enviando datos al backend:', { email: formData.email, password: '***' });
        // =================================================================

        try {
            // Se envía el email y password, tal como espera el backend corregido
            const response = await axios.post(API_URL, formData);
            
            // 1. Obtener el token y otros datos de la respuesta
            const { token, username, rol } = response.data; 

            if (!token) {
                throw new Error("Respuesta de login inválida: Token no recibido.");
            }

            console.log('Login exitoso. Token:', token);
            
            // 2. Usar la función login del AuthContext para guardar el token y actualizar el estado
            login(token, { username, rol }); 
            
            console.log('¡Inicio de sesión exitoso!');
            
            // 3. Redirigir a la página principal
            navigate('/'); 
            
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            
            let errorMessage = 'Ocurrió un error inesperado.';

            if (err.response) {
                if (err.response.status === 401 || err.response.status === 403) {
                    errorMessage = 'Credenciales inválidas. Verifique su email y contraseña.';
                } else if (err.response.data && err.response.data.message) {
                    // Usar el mensaje específico del backend si está disponible
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
                    <div className="card bg-dark text-white shadow-lg border-0 rounded-xl">
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
                                        autoComplete="email"
                                    />
                                </div>

                                {/* Campo Contraseña */}
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-success w-100 mt-3 font-semibold transition duration-300 transform hover:scale-[1.02]" 
                                    disabled={loading}
                                >
                                    {loading ? 'Iniciando...' : 'Entrar'}
                                </button>
                            </form>
                            
                            <p className="text-center mt-4 text-secondary text-sm">
                                ¿No tienes cuenta? <Link to="/registro" className="text-info font-medium hover:text-cyan-400 transition-colors">Regístrate aquí</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PaginaLogin;