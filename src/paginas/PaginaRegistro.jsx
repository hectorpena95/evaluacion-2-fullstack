import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar la librería Axios

const PaginaRegistro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        
        // 1. Validación local de contraseñas
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);
        setError(null);

        // URL del Backend de Spring Boot (Puerto 8080)
        const API_URL = 'http://localhost:8080/api/auth/register'; 

        try {
            // 2. Petición POST con Axios
            // Axios envía el objeto como JSON y maneja el encabezado 'Content-Type' automáticamente.
            const response = await axios.post(API_URL, {
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
            });

            // Si Axios no lanza error, la respuesta es exitosa (2xx)
            
            // Opcional: Puedes revisar la respuesta del backend
            console.log('Respuesta del Backend:', response.data);

            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            navigate('/login'); 
            
        } catch (err) {
            // 3. Manejo de Errores con Axios
            console.error('Error al registrar:', err);
            
            let errorMessage = 'Ocurrió un error inesperado. Verifique la conexión con el Backend.';

            // Intenta extraer el mensaje de error de la respuesta del Backend (Spring Boot)
            if (err.response && err.response.data && err.response.data.message) {
                errorMessage = err.response.data.message;
            } else if (err.response) {
                // Captura errores HTTP genéricos (404, 500)
                errorMessage = `Error ${err.response.status}: ${err.response.statusText}.`;
            } else if (err.request) {
                // Captura errores de red (si el backend está apagado)
                errorMessage = 'No se pudo conectar al servidor. Asegúrese de que el Backend esté corriendo en el puerto 8080.';
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="pagina-registro container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card bg-dark text-white shadow-lg border-0">
                        <div className="card-body p-4 p-md-5">
                            <h2 className="card-title text-center mb-4 text-success">Crear Cuenta</h2>
                            
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Campo Nombre */}
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

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
                                
                                {/* Campo Confirmar Contraseña */}
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-success w-100 mt-3" disabled={loading}>
                                    {loading ? 'Registrando...' : 'Registrarme'}
                                </button>
                            </form>
                            
                            <p className="text-center mt-3 text-secondary">
                                ¿Ya tienes una cuenta? <Link to="/login" className="text-info">Iniciar Sesión</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PaginaRegistro;