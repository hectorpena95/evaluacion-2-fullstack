// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 

// Importaciones de componentes de layout
// Nota: En TypeScript/Vite, las extensiones .jsx no siempre son necesarias, 
// pero las mantenemos si tu sistema lo requiere.
import Cabecera from './components/Cabecera';
import PieDePagina from './components/PieDePagina';

// Importación de las páginas
import PaginaCatalogo from './paginas/PaginaCatalogo'; 
import PaginaDetalleProducto from './paginas/PaginaDetalleProducto.jsx'; 


function App() {
  return (
    // 1. Envolver toda la aplicación en el Router
    <Router>
      <Cabecera />
      
      {/* 2. Definir las rutas (Routes) */}
      <Routes>
        
        {/* Ruta principal y ruta del catálogo (muestran el mismo componente) */}
        <Route path="/" element={<PaginaCatalogo />} />
        <Route path="/catalogo" element={<PaginaCatalogo />} />
        
        {/* Ruta del Detalle del Producto */}
        {/* Usa :id para capturar el ID del producto de la URL */}
        <Route path="/detalle-producto/:id" element={<PaginaDetalleProducto />} />
        
        {/* Rutas adicionales de tu app (ejemplos) */}
        <Route path="/login" element={<div>Página de Login</div>} />
        <Route path="/carrito" element={<div>Página del Carrito</div>} />
        
        {/* Ruta para manejar URLs no encontradas (404) */}
        <Route path="*" element={<div>404: Página No Encontrada</div>} />

      </Routes>

      <PieDePagina />
    </Router>
  );
}

export default App;