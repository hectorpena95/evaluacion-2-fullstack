import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; 

export const CarritoContext = createContext();

// Obtener carrito inicial desde localStorage
const obtenerCarritoInicial = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};

const API_CHECKOUT_URL = 'http://localhost:8080/api/v1/pedidos';

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(obtenerCarritoInicial);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [errorCheckout, setErrorCheckout] = useState(null);

    // Guardar carrito en localStorage
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

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
    };
    
    const eliminarItem = (id) => {
        setCarrito(carrito.filter(item => item.id !== id));
    };

    const vaciarCarrito = () => setCarrito([]);

    // ✔ FINALIZAR COMPRA CORREGIDO
    const finalizarCompra = async () => {
        setErrorCheckout(null);
        setLoadingCheckout(true);

        const token = localStorage.getItem('userToken');

        if (!token) {
            setErrorCheckout("Debe iniciar sesión para finalizar la compra.");
            setLoadingCheckout(false);
            return;
        }

        try {
            // ✔ Lo que tu backend espera
            const pedidoData = {
                detalles: carrito.map(item => ({
                    idProducto: item.id,
                    cantidad: item.cantidad
                })),
                direccionEnvio: "No indicada",
                ciudadEnvio: "No indicada"
            };

            const response = await axios.post(API_CHECKOUT_URL, pedidoData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            vaciarCarrito();

            return response.data;

        } catch (err) {
            console.error('Error al finalizar la compra:', err);

            let message = "Fallo al procesar el pedido.";

            if (err.response?.data) message = err.response.data;
            if (err.response?.status === 401) message = "Sesión expirada. Vuelva a iniciar sesión.";

            setErrorCheckout(message);
            throw new Error(message);
        } finally {
            setLoadingCheckout(false);
        }
    };

    const value = {
        carrito,
        loadingCheckout,
        errorCheckout,
        agregarItem,
        eliminarItem,
        vaciarCarrito,
        finalizarCompra,
    };

    return (
        <CarritoContext.Provider value={value}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => useContext(CarritoContext);
