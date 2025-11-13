import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // ⬅️ Importar Axios

const PaginaLogin = () => {
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
            
            // La respuesta exitosa (2xx) llega aquí. El backend debe devolver el token en response.data.token
            const { token } = response.data; // Desestructuramos el token de la respuesta

            console.log('Login exitoso. Token:', token);
            
            // ⬅️ PUNTO 5: Persistencia del Token para Gestión de Sesiones
            localStorage.setItem('userToken', token); 
            
            // Aquí deberías también guardar los roles si el backend los envía (Punto 4)
            // localStorage.setItem('userRoles', JSON.stringify(response.data.roles)); 
            
            alert('¡Inicio de sesión exitoso!');
            
            // Normalmente, aquí llamarías al método de login de tu AuthContext
            // context.login(token, response.data.roles); 
            
            navigate('/'); // Redirigir a la página principal
            
        } catch (err) {
            // ⬅️ Manejo de Errores con Axios (captura errores de red y HTTP 4xx/5xx)
            console.error('Error al iniciar sesión:', err);
            
            let errorMessage = 'Ocurrió un error inesperado.';

            if (err.response) {
                // Errores HTTP del servidor (401 Unauthorized, 404 Not Found, etc.)
                if (err.response.status === 401) {
                    errorMessage = 'Credenciales inválidas. Verifique su email y contraseña.';
                } else if (err.response.data && err.response.data.message) {
                    errorMessage = err.response.data.message;
                } else {
                    errorMessage = `Error del servidor: ${err.response.status}`;
                }
            } else if (err.request) {
                // Error de red (Backend apagado o CORS no configurado)
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