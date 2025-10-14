// src/componentes/FiltrosLateral.jsx
import React from 'react';
import { formatearPrecio, categorias } from '../datos/datosProductos';

const FiltrosLateral = ({ filtros, alCambiarFiltros }) => {
    
    // Función para manejar el cambio de categoría
    const manejarCambioCategoria = (e, nuevaCategoria) => {
        e.preventDefault();
        // Llama a la función que actualiza el estado en el componente padre
        alCambiarFiltros({ ...filtros, categoria: nuevaCategoria });
    };

    // Función para manejar el cambio en el rango de precio
    const manejarCambioPrecio = (e) => {
        // Llama a la función que actualiza el estado en el componente padre
        alCambiarFiltros({ ...filtros, precioMaximo: parseInt(e.target.value) });
    };

    return (
        <aside className="barra-lateral"> 
            <h2>Filtros</h2>
            
            {/* FILTRO DE CATEGORÍAS */}
            <div className="grupo-filtro">
                <h3>Categorías</h3>
                <ul id="lista-categorias">
                    {categorias.map(cat => (
                        <li key={cat.valor}>
                            <a 
                                href="#" 
                                data-categoria={cat.valor}
                                // Asignamos la clase 'activo' si el valor coincide con el estado actual
                                className={filtros.categoria === cat.valor ? 'activo' : ''} 
                                onClick={(e) => manejarCambioCategoria(e, cat.valor)}
                            >
                                {cat.etiqueta}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* FILTRO DE PRECIO */}
            <div className="grupo-filtro">
                <h3>Precio</h3>
                <input 
                    type="range" 
                    id="rango-precio" 
                    min="0" 
                    max="1500000" 
                    // El valor del input está controlado por el estado
                    value={filtros.precioMaximo} 
                    // El evento onChange actualiza el estado
                    onChange={manejarCambioPrecio} 
                />
                {/* Mostramos el valor del estado formateado */}
                <span id="valor-precio">{formatearPrecio(filtros.precioMaximo)}</span>
            </div>
        </aside>
    );
};

export default FiltrosLateral;