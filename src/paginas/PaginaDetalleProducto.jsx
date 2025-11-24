import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { formatearPrecio } from '../datos/datosProductos';
import { useCarrito } from '../context/CarritoContext.jsx';

const API_BASE_URL = 'http://localhost:8080/api/v1/productos';

// Función para resolver imagen local o URL externa
const getImageUrl = (urlImagen) => {
    if (!urlImagen) return "";
    if (urlImagen.startsWith("http")) return urlImagen;

    try {
        return new URL(`../assets/img/${urlImagen}`, import.meta.url).href;
    } catch (err) {
        console.error("❌ Error cargando imagen:", urlImagen);
        return "";
    }
};

const PaginaDetalleProducto = () => {
    const { agregarItem } = useCarrito();
    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔥 Cargar producto desde el backend
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/${id}`);
                setProducto(response.data);
            } catch (err) {
                console.error("Error al cargar producto:", err);
                if (err.response?.status === 404) {
                    setError("Producto no encontrado.");
                } else {
                    setError("Error al conectar con el servidor.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [id]);

    // ⏳ Cargando
    if (loading) {
        return (
            <main className="pagina-detalle-producto">
                <p>Cargando detalles del producto...</p>
            </main>
        );
    }

    // ❌ Error 404
    if (error === "Producto no encontrado" || !producto) {
        return (
            <main className="pagina-detalle-producto">
                <h1>Producto no encontrado</h1>
                <Link to="/catalogo" className="boton-cta">Volver al catálogo</Link>
            </main>
        );
    }

    // ❌ Error servidor
    if (error) {
        return (
            <main className="pagina-detalle-producto">
                <p className="text-danger">{error}</p>
            </main>
        );
    }

    // 🔥 Datos del producto
    const { nombre, categoria, precio, descripcion, urlImagen } = producto;

    const handleAgregarCarrito = () => {
        agregarItem(producto, cantidad);
        alert(`${cantidad} x ${nombre} agregado al carrito`);
        setCantidad(1);
    };

    return (
        <main className="pagina-detalle-producto">
            <section className="detalles-producto">
                
                {/* Imagen */}
                <div className="imagen-producto">
                    <img src={getImageUrl(urlImagen)} alt={nombre} />
                </div>

                {/* Información */}
                <div className="info-producto">
                    <h1>{nombre}</h1>

                    <p className="precio">{formatearPrecio(precio)}</p>

                    <p><strong>Categoría:</strong> {categoria}</p>

                    <p className="descripcion-producto">{descripcion}</p>

                    <div className="acciones-producto">
                        <label>Cantidad:</label>
                        <input
                            type="number"
                            min="1"
                            value={cantidad}
                            onChange={(e) => setCantidad(Number(e.target.value))}
                        />

                        <button className="boton-cta" onClick={handleAgregarCarrito}>
                            Agregar al carrito
                        </button>
                    </div>

                    <Link to="/catalogo" className="boton-volver">← Volver al Catálogo</Link>
                </div>

            </section>
        </main>
    );
};

export default PaginaDetalleProducto;
