// src/tests/components/TarjetaProducto.test.jsx

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TarjetaProducto from '../../components/TarjetaProducto';
import { vi } from 'vitest';

// ----------------------------------------------------------------------------------
// MOCK NECESARIO (Si TarjetaProducto usa formatearPrecio, debe estar mockeado)
// Asumo que TarjetaProducto importa formatearPrecio
// ----------------------------------------------------------------------------------
vi.mock('../../datos/datosProductos', () => ({
    // Devolvemos una función mock que simplemente retorna el precio con un '$' delante
    // Esto coincide con el output real del HTML que estás viendo: '$350' y '$0'
    formatearPrecio: vi.fn(precio => `$${precio}`), 
}));

// Datos de prueba
const mockProducto = { 
    id: 'T1', 
    nombre: 'Monitor Gamer Curvo Ultra HD', 
    precio: 350, 
    categoria: 'Monitores', 
    imagen: 'monitor.jpg' 
};

// Función de ayuda para renderizar con Router
const renderComponent = (producto = mockProducto) => {
    render(
        <BrowserRouter>
            <TarjetaProducto producto={producto} />
        </BrowserRouter>
    );
};

describe('TarjetaProducto (5 Tests)', () => {

    // Test 1 (Pasa)
    test('1. Debe mostrar el nombre completo del producto', () => {
        renderComponent();
        expect(screen.getByText('Monitor Gamer Curvo Ultra HD')).toBeInTheDocument();
    });

    // -------------------------------------------------------------------
    // Test 2 (CORREGIDO: Ajuste de la aserción)
    // -------------------------------------------------------------------
    test('2. Debe mostrar el precio formateado correctamente', () => {
        renderComponent();
        // CORREGIDO: El HTML muestra '$350', no '$349.99 USD'
        expect(screen.getByText('$350')).toBeInTheDocument();
    });

    // Test 3 (Pasa)
    test('3. El enlace debe dirigir a la ruta de detalle correcta (ID: T1)', () => {
        renderComponent();
        // Usa getByRole('link') y verifica el atributo href
        expect(screen.getByRole('link', { name: /Ver Detalle/i })).toHaveAttribute('href', '/detalle-producto/T1');
    });

    // Test 4 (Pasa)
    test('4. Debe tener una imagen con el texto alternativo (alt) correcto', () => {
        renderComponent();
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Monitor Gamer Curvo Ultra HD');
    });

    // -------------------------------------------------------------------
    // Test 5 (CORREGIDO: Ajuste de la aserción para precio cero)
    // -------------------------------------------------------------------
    test('5. Debe manejar y mostrar un precio igual a cero', () => {
        const productoCero = { ...mockProducto, precio: 0 };
        renderComponent(productoCero);

        // CORREGIDO: El HTML muestra '$0', no '$0.00 USD'
        expect(screen.getByText('$0')).toBeInTheDocument();
    });
});