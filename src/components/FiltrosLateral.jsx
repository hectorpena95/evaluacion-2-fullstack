import React from 'react';
import { formatearPrecio, categorias } from '../datos/datosProductos';

const FiltrosLateral = ({ filtros, alCambiarFiltros }) => {
    
    const manejarCambioCategoria = (e, nuevaCategoria) => {
        e.preventDefault();
        alCambiarFiltros({ ...filtros, categoria: nuevaCategoria });
    };

    const manejarCambioPrecio = (e) => {
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
                    value={filtros.precioMaximo} 
                    onChange={manejarCambioPrecio} 
                />
                {/* Mostramos el valor del estado formateado */}
                <span id="valor-precio">{formatearPrecio(filtros.precioMaximo)}</span>
            </div>
        </aside>
    );
};

export default FiltrosLateral;