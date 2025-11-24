import React from 'react';
import { useCarrito } from '../context/CarritoContext.jsx'; 
import { Link } from 'react-router-dom'; 

const getAssetUrl = (fileName) => {
    return new URL(`../assets/img/${fileName}`, import.meta.url).href;
}

const ItemCarrito = ({ item, eliminarItem }) => { 
    const formatPrice = (price) => `$${price.toFixed(2)} CLP`;

    return (
        <div className="item-carrito">
            <div className="detalle-producto">

                <img 
                    src={getAssetUrl(item.urlImagen)}
                    alt={item.nombre} 
                    className="imagen-carrito" 
                />
                
                <div className="info-item">
                    <h3>{item.nombre}</h3>
                    <p>Precio: {formatPrice(item.precio)}</p>
                </div>
            </div>
            
            <div className="controles-cantidad">
                <button className="boton-cantidad">-</button>
                <span className="cantidad">{item.cantidad}</span>
                <button className="boton-cantidad">+</button>
            </div>
            
            <div className="subtotal">
                {formatPrice(item.precio * item.cantidad)}
            </div>
            
            <button 
                className="boton-eliminar"
                onClick={() => eliminarItem(item.id)} 
            >
                X
            </button>
        </div>
    );
};

const PaginaCarrito = () => {
    const { carrito, eliminarItem, finalizarCompra } = useCarrito();

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const totalFormateado = `$${total.toFixed(2)} CLP`;
    
    return (
        <main className="pagina-carrito-contenedor">
            <section className="seccion-carrito">
                <h1>Tu Carrito de Compras</h1>
                
                <div id="items-carrito" className="contenedor-items">
                    {carrito.length > 0 ? (
                        carrito.map(item => (
                            <ItemCarrito 
                                key={item.id} 
                                item={item} 
                                eliminarItem={eliminarItem} 
                            />
                        ))
                    ) : (
                        <div className="carrito-vacio">
                            <p>Tu carrito está vacío. ¡Explora nuestro 
                                <Link to="/catalogo">catálogo</Link>!
                            </p>
                        </div>
                    )}
                </div>

                {carrito.length > 0 && (
                    <div className="resumen-carrito">
                        <p>Total: <span id="total-carrito">{totalFormateado}</span></p>

                        {/* ✔ Botón funcional */}
                        <button
                            className="boton-cta boton-pagar"
                            onClick={async () => {
                                try {
                                    const r = await finalizarCompra();
                                    alert("✔ Compra realizada con éxito");
                                } catch (e) {
                                    console.error(e);
                                    alert("❌ Error al procesar la compra: " + e.message);
                                }
                            }}
                        >
                            Procesar Pago
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
};

export default PaginaCarrito;
