import React from 'react';

const Cabecera = () => (
    <header id="main-header">
        <div className="logo">
            <a href="index.html">Level-Up Gamer</a>
        </div>
        <nav>
            <ul>
                <li><a href="catalogo.html">Catálogo</a></li>
                <li><a href="login.html">Iniciar Sesión</a></li>
                <li><a href="carrito.html">Carrito</a></li>
            </ul>
        </nav>
    </header>
);

export default Cabecera;