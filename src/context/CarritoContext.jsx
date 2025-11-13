import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; 

export const CarritoContext = createContext();

// Función auxiliar para obtener el carrito inicial desde localStorage
const obtenerCarritoInicial = () => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
};

// URL para el endpoint de Pedidos/Checkout en el Backend
const API_CHECKOUT_URL = 'http://localhost:8080/api/pedidos'; 

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(obtenerCarritoInicial);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [errorCheckout, setErrorCheckout] = useState(null);

    // Persistencia: useEffect para guardar el carrito cada vez que cambie
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);


    const agregarItem = (producto, cantidad) => {
        // ... (Lógica de agregarItem sin cambios)
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

    // ⬅️ Nuevo: Función para vaciar completamente el carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // ⬅️ Nuevo: Función para enviar el pedido final al Backend (Punto 5)
    const finalizarCompra = async () => {
        setErrorCheckout(null);
        setLoadingCheckout(true);

        // 1. Obtener el token del usuario (necesario para la autorización JWT - Punto 4)
        const token = localStorage.getItem('userToken');

        if (!token) {
            setErrorCheckout("Debe iniciar sesión para finalizar la compra.");
            setLoadingCheckout(false);
            return;
        }

        try {
            // 2. Preparar los datos del pedido que el Backend esperaría:
            const pedidoData = {
                items: carrito.map(item => ({
                    productoId: item.id,
                    cantidad: item.cantidad,
                    precioUnitario: item.precio // Usar el precio para evitar fraudes
                })),
                // Aquí podrías añadir el ID del usuario, dirección de envío, etc.
            };

            // 3. Petición POST con Axios a /api/pedidos
            const response = await axios.post(API_CHECKOUT_URL, pedidoData, {
                headers: {
                    // 4. Incluir el Token JWT para la autorización (Punto 4)
                    'Authorization': `Bearer ${token}`
                }
            });

            // 5. Si es exitoso, vaciar el carrito local
            vaciarCarrito(); 

            // Devolver la respuesta del backend (ej: el ID del pedido)
            return response.data; 

        } catch (err) {
            console.error('Error al finalizar la compra:', err);
            let message = "Fallo al procesar el pedido.";
            
            if (err.response && err.response.data && err.response.data.message) {
                message = err.response.data.message;
            } else if (err.response && err.response.status === 401) {
                message = "Sesión expirada. Por favor, vuelva a iniciar sesión.";
            }
            
            setErrorCheckout(message);
            throw new Error(message); // Propagar el error al componente que llama
        } finally {
            setLoadingCheckout(false);
        }
    };

    const value = {
        carrito,
        loadingCheckout, // ⬅️ Nuevo: Estado de carga del checkout
        errorCheckout,   // ⬅️ Nuevo: Estado de error del checkout
        agregarItem,
        eliminarItem,
        vaciarCarrito,   // ⬅️ Nuevo
        finalizarCompra, // ⬅️ Nuevo
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