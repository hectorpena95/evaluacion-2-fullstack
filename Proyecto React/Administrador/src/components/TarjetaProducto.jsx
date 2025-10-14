// src/componentes/TarjetaProducto.jsx
import React from 'react';
import { formatearPrecio } from '../../datos/datosProductos';

// Asumimos que las imágenes están en la carpeta pública o en 'src/assets/img/'
const RUTA_BASE_IMAGENES = '/src/assets/img/'; 

const TarjetaProducto = ({ producto }) => {
    const { id, nombre, categoria, precio, imagen } = producto;

    const urlDetalle = `/detalle-producto.html?id=${id}`; 

    return (
        // Usamos className en lugar de class
        <div className="tarjeta-producto">
            <img src={`${RUTA_BASE_IMAGENES}${imagen}`} alt={nombre} /> 
            <h3>{nombre}</h3>
            <p className="categoria-producto">{categoria}</p> 
            {/* Formateamos el precio antes de mostrarlo */}
            <p className="precio-producto">{formatearPrecio(precio)}</p>
            
            {/* El evento de clic de tu botón 'Ver Detalle' */}
            <a href={urlDetalle} className="boton-cta">Ver Detalle</a>
        </div>
    );
};

export default TarjetaProducto;