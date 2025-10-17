// src/paginas/PaginaRegistro.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Asegúrate de que los estilos de Bootstrap estén activos para las clases 'container', 'row', etc.

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
        setError(null); // Limpiar errores al escribir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Validación simple de Frontend
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        // 2. Lógica de registro (conexión con el Backend)
        setLoading(true);
        setError(null);

        // NOTA: Debes reemplazar esta URL con la URL REAL de tu API REST
        const API_URL = 'http://localhost:3000/api/auth/register'; 

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Si el backend devuelve un error 400, 500, etc.
                throw new Error(data.message || 'Error en el registro. Intente de nuevo.');
            }

            // Registro exitoso
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            navigate('/login'); // Redirigir al login
            
        } catch (err) {
            console.error('Error al registrar:', err);
            setError(err.message || 'Ocurrió un error inesperado.');
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