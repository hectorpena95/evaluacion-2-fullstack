// src/context/CarritoContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
export const CarritoContext = createContext();

// 2. Crear el Proveedor (Provider) que mantendrá el estado
export const CarritoProvider = ({ children }) => {
    // Estado inicial del carrito: un array de items
    const [carrito, setCarrito] = useState([]);

    // Función para agregar o actualizar un item
    const agregarItem = (producto, cantidad) => {
        // Buscar si el producto ya existe en el carrito
        const existeItem = carrito.find(item => item.id === producto.id);

        if (existeItem) {
            // Si existe, actualizar solo la cantidad
            setCarrito(
                carrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                )
            );
        } else {
            // Si no existe, agregar el nuevo item
            setCarrito([...carrito, { ...producto, cantidad }]);
        }
        console.log(`Producto agregado al carrito: ${producto.nombre}`);
    };
    
    // Función para eliminar un item (necesaria para el IE2.1.2 completo)
    const eliminarItem = (id) => {
        setCarrito(carrito.filter(item => item.id !== id));
    };

    // Objeto de valor a exportar
    const value = {
        carrito,
        agregarItem,
        eliminarItem,
        // Otras funciones como calcularTotal, etc.
    };

    return (
        <CarritoContext.Provider value={value}>
            {children}
        </CarritoContext.Provider>
    );
};

// Hook personalizado para usar el carrito fácilmente
export const useCarrito = () => {
    return useContext(CarritoContext);
};