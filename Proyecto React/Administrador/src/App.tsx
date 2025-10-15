// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 

// Importación del Contexto
import { CarritoProvider } from './context/CarritoContext.jsx'; // <-- ¡IMPORTACIÓN DEL PROVIDER!

// Importaciones de Componentes
import Cabecera from './components/Cabecera';
import PieDePagina from './components/PieDePagina';

// Importaciones de Páginas
import PaginaCatalogo from './paginas/PaginaCatalogo.jsx'; 
import PaginaDetalleProducto from './paginas/PaginaDetalleProducto.jsx'; 
import PaginaInicio from './paginas/PaginaInicio'; 
import PaginaCarrito from './paginas/PaginaCarrito.jsx'; 

function App() {
    return (
        // *******************************************************
        // 1. ENVOLVER TODA LA APLICACIÓN CON EL PROVIDER
        <CarritoProvider> 
            <Router>
                <Cabecera />
                
                <Routes>
                    
                    <Route path="/" element={<PaginaInicio />} />
                    <Route path="/catalogo" element={<PaginaCatalogo />} />
                    <Route path="/detalle-producto/:id" element={<PaginaDetalleProducto />} />
                    <Route path="/carrito" element={<PaginaCarrito />} /> 
                    
                    <Route path="/login" element={<div>Página de Login</div>} />
                    <Route path="/blog" element={<div>Página de Blog/Comunidad</div>} />
                    
                    <Route path="*" element={<div>404: Página No Encontrada</div>} />

                </Routes>

                <PieDePagina />
            </Router>
        </CarritoProvider> 
        // *******************************************************
    );
}

export default App;