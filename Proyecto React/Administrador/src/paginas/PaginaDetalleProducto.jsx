// src/paginas/PaginaDetalleProducto.jsx
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom'; // Importamos useParams y Link
import { productos, formatearPrecio } from '../datos/datosProductos'; 

// Función para obtener la URL de la imagen, basada en la implementación de TarjetaProducto
const getImageUrl = (name) => {
    // La ruta es relativa a este componente (src/paginas/).
    // Sube a 'src/' (../) y entra a 'assets/img/'
    return new URL(`../assets/img/${name}`, import.meta.url).href;
}

const PaginaDetalleProducto = () => {
    // 1. Obtener el ID del producto de la URL
    const { id } = useParams();

    // 2. Buscar el producto en la lista usando useMemo para optimización
    const producto = useMemo(() => {
        return productos.find(p => p.id === id);
    }, [id]);

    // 3. Manejar el caso de producto no encontrado (Simulación de un 404)
    if (!producto) {
        return (
            <main className="pagina-detalle-producto">
                <section className="detalles-producto">
                    <h1>Producto no encontrado</h1>
                    <p>Lo sentimos, el producto con ID "{id}" no existe en nuestro catálogo.</p>
                    {/* Botón para volver al catálogo */}
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
            {/* Sección de los detalles principales */}
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

                    {/* Acciones */}
                    <div className="acciones-producto">
                        <button className="boton-cta boton-agregar-carrito">Agregar al Carrito</button>
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
                    {/* Aquí iría la lógica para mostrar productos relacionados */}
                    <p>Explora otros artículos de la categoría {categoria}...</p>
                </div>
            </section>
        </main>
    );
};

export default PaginaDetalleProducto;