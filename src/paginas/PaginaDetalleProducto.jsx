import React, { useMemo, useState, useEffect } from 'react'; // ⬅️ Agregar useEffect
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // ⬅️ Nuevo: Importar Axios
import { formatearPrecio } from '../datos/datosProductos'; // Mantener utilidades
import { useCarrito } from '../context/CarritoContext.jsx'; 

const API_BASE_URL = 'http://localhost:8080/api/productos'; // URL base del CRUD

const getImageUrl = (name) => {
    // Esta función asume que el backend NO sirve la imagen, sino que el frontend la gestiona.
    // Si el backend sirve la imagen, usarías: `${API_BASE_URL}/imagenes/${name}`
    return new URL(`../assets/img/${name}`, import.meta.url).href;
}

const PaginaDetalleProducto = () => {
    const { agregarItem } = useCarrito(); 
    
    const [cantidad, setCantidad] = useState(1);
    const [producto, setProducto] = useState(null); // ⬅️ Nuevo: Estado para el producto
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { id } = useParams(); // ID de la URL

    // ⬅️ Nueva Lógica: useEffect para cargar el producto por ID
    useEffect(() => {
        if (!id) return; // Si no hay ID, no hacer nada

        const fetchProducto = async () => {
            try {
                // Endpoint para obtener un producto por ID (Ej: /api/productos/123)
                const response = await axios.get(`${API_BASE_URL}/${id}`);
                setProducto(response.data);
                setLoading(false);
            } catch (err) {
                console.error(`Error al cargar producto ${id}:`, err);
                // Si el error es un 404, indicamos que no se encontró
                if (err.response && err.response.status === 404) {
                    setError("Producto no encontrado.");
                } else {
                    setError("Error al conectar con el servidor.");
                }
                setLoading(false);
            }
        };

        setLoading(true);
        fetchProducto();
    }, [id]); // Dependencia: Se recarga si cambia el ID en la URL


    const handleAgregarCarrito = () => {
        // ... (La lógica de agregar al carrito permanece igual)
        if (producto && cantidad > 0) {
            agregarItem(producto, cantidad); 
            alert(`¡${cantidad} x ${producto.nombre} agregado al carrito!`);
            setCantidad(1); 
        } else {
            console.warn("No se puede agregar al carrito: producto nulo o cantidad inválida.");
        }
    };

    // ⬅️ Nuevo: Manejo de estados de carga y error en el JSX
    if (loading) {
        return <main className="pagina-detalle-producto"><p>Cargando detalles del producto...</p></main>;
    }
    
    // Si error es "Producto no encontrado" (404), mostramos la vista de error
    if (error === "Producto no encontrado." || !producto) {
        return (
            <main className="pagina-detalle-producto">
                <section className="detalles-producto">
                    <h1>Producto no encontrado</h1>
                    <p>Lo sentimos, el producto con ID "{id}" no existe en nuestro catálogo.</p>
                    <Link to="/catalogo" className="boton-cta" style={{ marginTop: '20px', display: 'inline-block' }}>
                        Volver al Catálogo
                    </Link>
                </section>
            </main>
        );
    }
    
    // Si hay otro tipo de error de servidor
    if (error) {
        return <main className="pagina-detalle-producto"><p className="text-danger">{error}</p></main>;
    }

    // Desestructuración, ahora después de las comprobaciones de estado
    const { nombre, categoria, precio, imagen, descripcion } = producto;

    return (
        // ... (El resto del JSX permanece igual, utilizando la variable 'producto')
        <main className="pagina-detalle-producto">
            {/* ... JSX sigue aquí ... */}
            <section className="detalles-producto">
                {/* Imagen del Producto */}
                <div className="imagen-producto">
                    <img 
                        src={getImageUrl(imagen)} 
                        alt={nombre} 
                    />
                </div>
                
                {/* Información del Producto */}
                <div className="info-producto">
                    <h1 id="nombre-producto">{nombre}</h1>
                    <p className="precio-producto" id="precio-producto">
                        {formatearPrecio(precio)}
                    </p>
                    {/* ... (El resto del contenido JSX) ... */}
                </div>
            </section>
        </main>
    );
};

export default PaginaDetalleProducto;