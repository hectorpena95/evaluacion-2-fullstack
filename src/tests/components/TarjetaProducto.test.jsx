
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TarjetaProducto from '../../components/TarjetaProducto';
import { vi } from 'vitest';


vi.mock('../../datos/datosProductos', () => ({

    formatearPrecio: vi.fn(precio => `$${precio}`), 
}));

const mockProducto = { 
    id: 'T1', 
    nombre: 'Monitor Gamer Curvo Ultra HD', 
    precio: 350, 
    categoria: 'Monitores', 
    imagen: 'monitor.jpg' 
};

const renderComponent = (producto = mockProducto) => {
    render(
        <BrowserRouter>
            <TarjetaProducto producto={producto} />
        </BrowserRouter>
    );
};

describe('TarjetaProducto (5 Tests)', () => {

    test('1. Debe mostrar el nombre completo del producto', () => {
        renderComponent();
        expect(screen.getByText('Monitor Gamer Curvo Ultra HD')).toBeInTheDocument();
    });


    test('2. Debe mostrar el precio formateado correctamente', () => {
        renderComponent();
        expect(screen.getByText('$350')).toBeInTheDocument();
    });

    test('3. El enlace debe dirigir a la ruta de detalle correcta (ID: T1)', () => {
        renderComponent();
        expect(screen.getByRole('link', { name: /Ver Detalle/i })).toHaveAttribute('href', '/detalle-producto/T1');
    });

    test('4. Debe tener una imagen con el texto alternativo (alt) correcto', () => {
        renderComponent();
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Monitor Gamer Curvo Ultra HD');
    });

    
    test('5. Debe manejar y mostrar un precio igual a cero', () => {
        const productoCero = { ...mockProducto, precio: 0 };
        renderComponent(productoCero);

        expect(screen.getByText('$0')).toBeInTheDocument();
    });
});