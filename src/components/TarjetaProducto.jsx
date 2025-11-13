import React from 'react';
import { formatearPrecio } from '../datos/datosProductos';

const TarjetaProducto = ({ producto }) => {
    const { id, nombre, categoria, precio, imagen } = producto;

    const getImageUrl = (name) => {
        return new URL(`../assets/img/${name}`, import.meta.url).href;
    }

    const urlDetalle = `/detalle-producto/${id}`; 

    return (
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
            
            {/* El evento de clic de tu botón 'Ver Detalle' ahora usa la ruta de React Router */}
            <a href={urlDetalle} className="boton-cta">Ver Detalle</a>
        </div>
    );
};

export default TarjetaProducto;