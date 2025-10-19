import React, { useState, useMemo } from 'react';
import { productos } from '../datos/datosProductos';
import TarjetaProducto from '../components/TarjetaProducto';
import FiltrosLateral from '../components/FiltrosLateral';

const PRECIO_MAXIMO_INICIAL = 1500000;

const PaginaCatalogo = () => {
    // 1. Estado para almacenar los filtros seleccionados
    const [filtros, setFiltros] = useState({
        categoria: 'all',
        precioMaximo: PRECIO_MAXIMO_INICIAL,
    });

    
    const productosFiltrados = useMemo(() => {
        return productos.filter(producto => {
            
            const coincideCategoria = 
                filtros.categoria === 'all' || 
                producto.categoria === filtros.categoria;
            
            const coincidePrecio = 
                producto.precio <= filtros.precioMaximo;
                
            return coincideCategoria && coincidePrecio;
        });
    }, [filtros]); // Dependencia: se ejecuta cuando 'filtros' cambia

    return (
        <main className="pagina-catalogo">
            {/* 3. Componente de Filtros */}
            <FiltrosLateral filtros={filtros} alCambiarFiltros={setFiltros} />

            <section className="contenedor-productos">
                <h1>Catálogo de Productos</h1>
                <div className="cuadricula-productos" id="cuadricula-productos">
                    
                    {/* 4. Renderizado Condicional y por Lista (map) */}
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map(producto => (
                            <TarjetaProducto 
                                key={producto.id} // Clave única para la eficiencia de React
                                producto={producto}
                            />
                        ))
                    ) : (
                        // Mensaje cuando no hay productos que coincidan
                        <p className="mensaje-vacio">
                            No se encontraron productos que coincidan con los filtros.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default PaginaCatalogo;