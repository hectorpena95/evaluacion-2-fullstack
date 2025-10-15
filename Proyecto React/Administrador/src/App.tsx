// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 

import Cabecera from './components/Cabecera';
import PieDePagina from './components/PieDePagina';

import PaginaCatalogo from './paginas/PaginaCatalogo'; 
import PaginaDetalleProducto from './paginas/PaginaDetalleProducto.jsx'; 
import PaginaInicio from './paginas/PaginaInicio'; 


function App() {
    return (
        // 1. Envolver toda la aplicación en el Router
        <Router>
            <Cabecera />
            
            {/* 2. Definir las rutas (Routes) */}
            <Routes>
                
                {/* ******************************************************* */}
                {/* RUTA PRINCIPAL: Muestra la Página de Inicio */}
                <Route path="/" element={<PaginaInicio />} />
                {/* ******************************************************* */}
                
                {/* Ruta del catálogo (ahora separada de la ruta principal) */}
                <Route path="/catalogo" element={<PaginaCatalogo />} />
                
                {/* Ruta del Detalle del Producto */}
                <Route path="/detalle-producto/:id" element={<PaginaDetalleProducto />} />
                
                {/* Rutas adicionales de tu app */}
                <Route path="/login" element={<div>Página de Login</div>} />
                <Route path="/carrito" element={<div>Página del Carrito</div>} />
                <Route path="/blog" element={<div>Página de Blog/Comunidad</div>} />
                
                {/* Ruta para manejar URLs no encontradas (404) */}
                <Route path="*" element={<div>404: Página No Encontrada</div>} />

            </Routes>

            <PieDePagina />
        </Router>
    );
}

export default App;