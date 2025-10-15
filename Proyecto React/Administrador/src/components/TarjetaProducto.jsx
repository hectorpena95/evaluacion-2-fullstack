// src/components/TarjetaProducto.jsx
import React from 'react';
import { formatearPrecio } from '../datos/datosProductos';

// ******************************************************
// ELIMINAMOS RUTA_BASE_IMAGENES
// La ruta es gestionada dinámicamente por la función getImageUrl
// ******************************************************

const TarjetaProducto = ({ producto }) => {
    const { id, nombre, categoria, precio, imagen } = producto;

    // Función CLAVE para que Vite pueda resolver la ruta dinámica de la imagen.
    // La ruta es relativa al componente TarjetaProducto.jsx.
    // Desde 'src/components/' subimos un nivel (../) y entramos a 'assets/img/'
    const getImageUrl = (name) => {
        return new URL(`../assets/img/${name}`, import.meta.url).href;
    }

    // Usamos el id del producto para el detalle (como en tu código original)
    const urlDetalle = `/detalle-producto.html?id=${id}`; 

    return (
        // Usamos className en lugar de class
        <div className="tarjeta-producto">
            {/* Llamamos a la función getImageUrl con el nombre de archivo del producto */}
            <img 
                src={getImageUrl(imagen)} 
                alt={nombre} 
            /> 
            
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