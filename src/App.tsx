import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";

import Cabecera from "./components/Cabecera";
import PieDePagina from "./components/PieDePagina";

// Páginas principales
import PaginaInicio from "./paginas/PaginaInicio";
import PaginaCatalogo from "./paginas/PaginaCatalogo";
import PaginaDetalleProducto from "./paginas/PaginaDetalleProducto";
import PaginaCarrito from "./paginas/PaginaCarrito";

import PaginaLogin from "./paginas/PaginaLogin";
import PaginaRegistro from "./paginas/PaginaRegistro";

// Páginas admin
import PaginaPanelAdmin from "./paginas/admin/PaginaPanelAdmin";
import PaginaGestionUsuarios from "./paginas/admin/PaginaGestionUsuarios";
import PaginaGestionProductos from "./paginas/admin/PaginaGestionProductos";

function App() {
    return (
        <AuthProvider>
            <CarritoProvider>
                <Router>
                    <Cabecera />

                    <Routes>
                        {/* Rutas públicas */}
                        <Route path="/" element={<PaginaInicio />} />
                        <Route path="/catalogo" element={<PaginaCatalogo />} />
                        <Route path="/detalle-producto/:id" element={<PaginaDetalleProducto />} />
                        <Route path="/carrito" element={<PaginaCarrito />} />

                        <Route path="/login" element={<PaginaLogin />} />
                        <Route path="/registro" element={<PaginaRegistro />} />

                        {/* Rutas Admin */}
                        <Route path="/panel-admin" element={<PaginaPanelAdmin />} />
                        <Route path="/gestion-usuarios" element={<PaginaGestionUsuarios />} />
                        <Route path="/gestion-productos" element={<PaginaGestionProductos />} />

                        {/* 404 */}
                        <Route
                            path="*"
                            element={
                                <div className="p-8 text-center">
                                    <h1 className="text-4xl font-extrabold text-red-500">404</h1>
                                    <p className="mt-2 text-xl">Página No Encontrada</p>
                                </div>
                            }
                        />
                    </Routes>

                    <PieDePagina />
                </Router>
            </CarritoProvider>
        </AuthProvider>
    );
}

export default App;
