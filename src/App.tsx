import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext'; // 🔑 Importación del contexto de autenticación

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
        // El AuthProvider debe ir lo más alto posible para que todos los componentes lo vean
        <AuthProvider> 
            <CarritoProvider> 
                <Router>
                    {/* La Cabecera ahora puede usar useAuth() para mostrar el estado de usuario */}
                    <Cabecera />
                    
                    <div className="min-h-[calc(100vh-10rem)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                        <Routes>
                            {/* Rutas Principales */}
                            <Route path="/" element={<PaginaInicio />} />
                            <Route path="/catalogo" element={<PaginaCatalogo />} />
                            <Route path="/detalle-producto/:id" element={<PaginaDetalleProducto />} />
                            <Route path="/carrito" element={<PaginaCarrito />} /> 
                            
                            {/* RUTAS DE AUTENTICACIÓN */}
                            <Route path="/login" element={<PaginaLogin />} />
                            <Route path="/registro" element={<PaginaRegistro />} />
                            
                            {/* Rutas Adicionales y 404 */}
                            <Route path="/blog" element={
                                <div className="p-8 text-center">
                                    <h1 className="text-3xl font-bold">Página de Blog/Comunidad</h1>
                                    <p className="mt-2">Contenido de la comunidad aquí.</p>
                                </div>
                            } />
                            <Route path="*" element={
                                <div className="p-8 text-center">
                                    <h1 className="text-4xl font-extrabold text-red-500">404</h1>
                                    <p className="mt-2 text-xl">Página No Encontrada</p>
                                </div>
                            } />
                        </Routes>
                    </div>

                    <PieDePagina />
                </Router>
            </CarritoProvider> 
        </AuthProvider>
    );
}

export default App;