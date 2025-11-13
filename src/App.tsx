import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';

// Importaciones de Layout y Componentes Estructurales
import Cabecera from './components/Cabecera';
import PieDePagina from './components/PieDePagina';

// Importaciones de Páginas Existentes
import PaginaInicio from './paginas/PaginaInicio';
import PaginaCatalogo from './paginas/PaginaCatalogo';
import PaginaDetalleProducto from './paginas/PaginaDetalleProducto';
import PaginaCarrito from './paginas/PaginaCarrito';

// NUEVAS IMPORTACIONES DE PÁGINAS DE AUTENTICACIÓN
import PaginaLogin from './paginas/PaginaLogin'; 
import PaginaRegistro from './paginas/PaginaRegistro'; 
// ----------------------------------------------------

function App() {
    return (
        <CarritoProvider> 
            <Router>
                <Cabecera />
                
                <Routes>
                    {/* Rutas Principales */}
                    <Route path="/" element={<PaginaInicio />} />
                    <Route path="/catalogo" element={<PaginaCatalogo />} />
                    <Route path="/detalle-producto/:id" element={<PaginaDetalleProducto />} />
                    <Route path="/carrito" element={<PaginaCarrito />} /> 
                    
                    {/* RUTAS DE AUTENTICACIÓN (NUEVAS) */}
                    <Route path="/login" element={<PaginaLogin />} />
                    <Route path="/registro" element={<PaginaRegistro />} />
                    
                    {/* Rutas Adicionales y 404 */}
                    <Route path="/blog" element={<div>Página de Blog/Comunidad</div>} />
                    <Route path="*" element={<div>404: Página No Encontrada</div>} />
                </Routes>

                <PieDePagina />
            </Router>
        </CarritoProvider> 
    );
}

export default App;