import React, { createContext, useState, useContext, useEffect } from 'react';

export const CarritoContext = createContext();

// Función auxiliar para obtener el carrito inicial desde localStorage
const obtenerCarritoInicial = () => {
    // 1. Intenta obtener el valor guardado con la clave 'carrito'
    const carritoGuardado = localStorage.getItem('carrito');
    
    // 2. Si hay datos, los parsea de JSON a JavaScript. Si no, retorna un array vacío.
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};

export const CarritoProvider = ({ children }) => {
    // CAMBIO 1: El estado inicial ahora se carga desde la función obtenerCarritoInicial
    const [carrito, setCarrito] = useState(obtenerCarritoInicial);

    // CAMBIO 2: useEffect para guardar el carrito cada vez que cambie
    useEffect(() => {
        // Este código se ejecuta después de la primera renderización y después de cada cambio en 'carrito'.
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log("Carrito guardado en localStorage.");
    }, [carrito]); // La dependencia [carrito] asegura que se ejecute en cada cambio.


    const agregarItem = (producto, cantidad) => {
        const existeItem = carrito.find(item => item.id === producto.id);

        if (existeItem) {
            setCarrito(
                carrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                )
            );
        } else {
            setCarrito([...carrito, { ...producto, cantidad }]);
        }
        console.log(`Producto agregado al carrito: ${producto.nombre}`);
    };
    
    const eliminarItem = (id) => {
        setCarrito(carrito.filter(item => item.id !== id));
    };

    const value = {
        carrito,
        agregarItem,
        eliminarItem,
    };

    return (
        <CarritoContext.Provider value={value}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    return useContext(CarritoContext);
};