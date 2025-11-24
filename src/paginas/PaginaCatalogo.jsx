import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import TarjetaProducto from '../components/TarjetaProducto';
import FiltrosLateral from '../components/FiltrosLateral';

const PRECIO_MAXIMO_INICIAL = 1500000;
const API_PRODUCTOS_URL = 'http://localhost:8080/api/v1/productos'; // ✔ URL correcta del backend

const PaginaCatalogo = () => {
    const [productosAPI, setProductosAPI] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filtros, setFiltros] = useState({
        categoria: 'all',
        precioMaximo: PRECIO_MAXIMO_INICIAL,
    });

    // ✔ Cargar productos al montar el componente
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get(API_PRODUCTOS_URL);
                console.log("📦 Productos recibidos:", response.data); // 👈 Debug útil
                setProductosAPI(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError("Hubo un error al cargar el catálogo desde el servidor.");
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    // ✔ Filtrado de productos
    const productosFiltrados = useMemo(() => {
        if (!productosAPI) return [];

        return productosAPI.filter(producto => {
            const coincideCategoria =
                filtros.categoria === 'all' ||
                producto.categoria === filtros.categoria;

            const coincidePrecio =
                producto.precio <= filtros.precioMaximo;

            return coincideCategoria && coincidePrecio;
        });
    }, [filtros, productosAPI]);

    // ✔ Estado de carga
    if (loading) {
        return (
            <main className="pagina-catalogo">
                <p>Cargando productos...</p>
            </main>
        );
    }

    // ✔ Error de servidor
    if (error) {
        return (
            <main className="pagina-catalogo">
                <p className="text-danger">{error}</p>
            </main>
        );
    }

    return (
        <main className="pagina-catalogo">

            {/* Panel de filtros */}
            <FiltrosLateral filtros={filtros} alCambiarFiltros={setFiltros} />

            <section className="contenedor-productos">
                <h1>Catálogo de Productos</h1>

                <div className="cuadricula-productos" id="cuadricula-productos">
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map(producto => (
                            <TarjetaProducto 
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    ) : (
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
