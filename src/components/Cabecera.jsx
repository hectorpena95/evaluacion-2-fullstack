import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // IMPORTANTE

const Cabecera = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <header id="main-header">
            <div className="contenedor-interno">
                <div className="logo">
                    <Link to="/">Level-Up Gamer</Link>
                </div>

                <nav className="menu-nav">
                    <ul>
                        <li><Link to="/catalogo">Catálogo</Link></li>

                        {/* Si NO está logueado → mostrar "Iniciar Sesión" */}
                        {!isAuthenticated && (
                            <li><Link to="/login">Iniciar Sesión</Link></li>
                        )}

                        {/* Si está logueado → mostrar nombre + botón logout */}
                        {isAuthenticated && (
                            <>
                                <li className="nav-usuario">
                                    <span style={{ color: "#4caf50", fontWeight: "bold" }}>
                                        Hola, {user}
                                    </span>
                                </li>

                                <li>
                                    <button 
                                        onClick={logout} 
                                        className="btn btn-sm btn-danger"
                                    >
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        )}

                        <li>
                            <Link to="/carrito" className="boton-carrito">Carrito</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Cabecera;
