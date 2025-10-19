
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

        const API_URL = 'http://localhost:3000/api/auth/login'; 

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Credenciales inválidas. Intente de nuevo.');
            }

            console.log('Login exitoso. Token:', data.token);
            
            localStorage.setItem('userToken', data.token); 
            
            alert('¡Inicio de sesión exitoso!');
            navigate('/'); 
            
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setError(err.message || 'Ocurrió un error inesperado al iniciar sesión.');
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