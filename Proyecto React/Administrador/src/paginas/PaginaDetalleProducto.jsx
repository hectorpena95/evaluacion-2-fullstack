import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// Importamos los datos y la utilidad de formateo de precio
import { productos, formatearPrecio } from '../datos/datosProductos'; 
// Importamos el hook del Contexto del Carrito
import { useCarrito } from '../context/CarritoContext.jsx'; 

// Función para obtener la URL de la imagen, necesaria en proyectos Vite/React
const getImageUrl = (name) => {
    // La ruta es relativa a este componente (src/paginas/).
    // Sube a 'src/' (../) y entra a 'assets/img/'
    return new URL(`../assets/img/${name}`, import.meta.url).href;
}

const PaginaDetalleProducto = () => {
    // 1. Obtener la función para agregar items del contexto global
    const { agregarItem } = useCarrito(); 
    
    // 2. ESTADO LOCAL: Cantidad a agregar, por defecto 1
    const [cantidad, setCantidad] = useState(1);
    
    // Obtener el ID del producto de la URL
    const { id } = useParams();

    // 3. Buscar el producto en la lista usando useMemo
    const producto = useMemo(() => {
        // Asegúrate de que el tipo de ID coincida: si los IDs son números, usa parseInt(id)
        return productos.find(p => p.id === id); 
    }, [id]);

    // 4. HANDLER para agregar el producto al carrito
    const handleAgregarCarrito = () => {
        if (producto && cantidad > 0) {
            // Llama a la función global del contexto para actualizar el carrito
            agregarItem(producto, cantidad); 
            alert(`¡${cantidad} x ${producto.nombre} agregado al carrito!`);
            // Opcional: reiniciar la cantidad a 1 después de agregar
            setCantidad(1); 
        } else {
            console.warn("No se puede agregar al carrito: producto nulo o cantidad inválida.");
        }
    };


    // Manejar el caso de producto no encontrado (Simulación de un 404)
    if (!producto) {
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

    // Desestructurar los datos del producto encontrado
    const { nombre, categoria, precio, imagen, descripcion } = producto;

    return (
        <main className="pagina-detalle-producto">
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
                    
                    {/* Nombre y Precio */}
                    <h1 id="nombre-producto">{nombre}</h1>
                    <p className="precio-producto" id="precio-producto">
                        {formatearPrecio(precio)}
                    </p>
                    
                    {/* Descripción y Categoría */}
                    <p className="descripcion-producto" id="descripcion-producto">
                        {descripcion}
                    </p>
                    <p className="categoria-producto">Categoría: {categoria}</p>

                    {/* 5. ACCIONES CONECTADAS Y CONTROL DE CANTIDAD MODERNO */}
                    <div className="acciones-producto">
                        
                        {/* CONTROL DE CANTIDAD */}
                        <div className="control-cantidad">
                            <button
                                className="boton-cantidad boton-restar"
                                onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                                disabled={cantidad <= 1} // Deshabilita si es 1
                            >
                                -
                            </button>
                            <span className="cantidad-display">{cantidad}</span>
                            <button
                                className="boton-cantidad boton-sumar"
                                onClick={() => setCantidad(prev => prev + 1)}
                            >
                                +
                            </button>
                        </div>
                        
                        {/* BOTÓN AGREGAR AL CARRITO CONECTADO */}
                        <button 
                            className="boton-cta boton-agregar-carrito"
                            onClick={handleAgregarCarrito}
                        >
                            Agregar al Carrito
                        </button>
                        <button className="boton-cta boton-comprar">Comprar Ahora</button>
                    </div>
                
                    {/* Información Extra */}
                    <div className="info-extra-producto">
                        <h3>Información Adicional:</h3>
                        <p id="origen-producto">En stock / Envío rápido</p>
                        
                        <h3>Reseñas y Calificaciones:</h3>
                        <div className="reseñas">
                            <p className="sin-reseñas">Aún no hay reseñas para este producto.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Productos Relacionados */}
            <section className="productos-relacionados">
                <h2>Productos Relacionados</h2>
                <div className="cuadricula-productos">
                    <p>Explora otros artículos de la categoría {categoria}...</p>
                </div>
            </section>
        </main>
    );
};

export default PaginaDetalleProducto;