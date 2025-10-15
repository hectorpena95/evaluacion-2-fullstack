
import React from 'react';
import { Link } from 'react-router-dom'; 

const Cabecera = () => (
    <header id="main-header"> 
        <div className="logo">
            {/* Usar Link */}
            <Link to="/">Level-Up Gamer</Link>
        </div>
        <nav className="menu-nav">
            <ul>
                <li>
                    {/* Usar Link para Catálogo */}
                    <Link to="/catalogo">Catálogo</Link>
                </li>
                <li>
                    {/* Usar Link para Iniciar Sesión */}
                    <Link to="/login">Iniciar Sesión</Link>
                </li>
                <li>
                    {/* Usar Link para Carrito */}
                    <Link to="/carrito" className="boton-carrito">Carrito</Link>
                </li>
            </ul>
        </nav>
    </header>
);

export default Cabecera;