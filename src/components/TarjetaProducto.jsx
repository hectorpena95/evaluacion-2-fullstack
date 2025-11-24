import React from 'react';
import { Link } from 'react-router-dom';

// Detecta si la imagen viene como URL externa o archivo local
const getImageUrl = (urlImagen) => {
    if (!urlImagen) return "";

    if (urlImagen.startsWith("http")) {
        return urlImagen;
    }

    try {
        return new URL(`../assets/img/${urlImagen}`, import.meta.url).href;
    } catch (err) {
        console.error("❌ Error cargando imagen:", urlImagen);
        return "";
    }
};

const TarjetaProducto = ({ producto }) => {

    // 🛑 FIX DEFINITIVO
    if (!producto) {
        console.warn("TarjetaProducto recibió producto = null/undefined");
        return null;
    }

    const { id, nombre, categoria, precio, urlImagen } = producto;

    return (
        <div className="tarjeta-producto">
            <div className="imagen-container">
                <img
                    src={getImageUrl(urlImagen)}
                    alt={nombre}
                    className="imagen-producto"
                />
            </div>

            <h3>{nombre}</h3>
            <p className="categoria">{categoria}</p>

            <p className="precio">
                ${precio.toLocaleString("es-CL")}
            </p>

            <Link to={`/detalle-producto/${id}`} className="boton-detalle">
                Ver Detalle
            </Link>
        </div>
    );
};

export default TarjetaProducto;
