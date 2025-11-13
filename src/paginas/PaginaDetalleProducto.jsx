import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productos, formatearPrecio } from '../datos/datosProductos'; 
import { useCarrito } from '../context/CarritoContext.jsx'; 

const getImageUrl = (name) => {
  
    return new URL(`../assets/img/${name}`, import.meta.url).href;
}

const PaginaDetalleProducto = () => {
    const { agregarItem } = useCarrito(); 
    
    const [cantidad, setCantidad] = useState(1);
    
    const { id } = useParams();

    const producto = useMemo(() => {
        return productos.find(p => p.id === id); 
    }, [id]);

    const handleAgregarCarrito = () => {
        if (producto && cantidad > 0) {
            agregarItem(producto, cantidad); 
            alert(`¡${cantidad} x ${producto.nombre} agregado al carrito!`);
            setCantidad(1); 
        } else {
            console.warn("No se puede agregar al carrito: producto nulo o cantidad inválida.");
        }
    };


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