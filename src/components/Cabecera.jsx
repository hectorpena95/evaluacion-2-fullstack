import React from 'react';
import { Link } from 'react-router-dom'; 

const Cabecera = () => (
    <header id="main-header"> 
        <div className="contenedor-interno"> 
            <div className="logo">
                <Link to="/">Level-Up Gamer</Link>
            </div>

            <nav className="menu-nav">
                <ul>
                    <li><Link to="/catalogo">Catálogo</Link></li>
                    <li><Link to="/login">Iniciar Sesión</Link></li>
                    <li><Link to="/carrito" className="boton-carrito">Carrito</Link></li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Cabecera;
