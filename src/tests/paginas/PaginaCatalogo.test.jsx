
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PaginaCatalogo from '../../paginas/PaginaCatalogo';
import { vi } from 'vitest';

vi.mock('../../datos/datosProductos', () => {
    const mockProductos = [
        { id: 'JM001', nombre: 'Catan', categoria: 'juegos-de-mesa', precio: 29990, imagen: 'catan.png' },
        { id: 'JM002', nombre: 'Carcassonne', categoria: 'juegos-de-mesa', precio: 24990, imagen: 'carcassonne.jpg' },
        { id: 'AC001', nombre: 'Controlador Inalámbrico Xbox Series X', categoria: 'accesorios', precio: 59990, imagen: 'xbox-controller.jpg' },
        { id: 'CO001', nombre: 'PlayStation 5', categoria: 'consolas', precio: 549990, imagen: 'ps5.jpg' },
    ];
    
    const mockCategorias = [
        { etiqueta: 'Todas las Categorías', valor: 'all' },
        { etiqueta: 'Juegos de Mesa', valor: 'juegos-de-mesa' },
        { etiqueta: 'Consolas', valor: 'consolas' },
        { etiqueta: 'Accesorios', valor: 'accesorios' },
        { etiqueta: 'Inexistente', valor: 'inexistente' },
    ];

    return {
        productos: mockProductos,
        categorias: mockCategorias,
        formatearPrecio: vi.fn(precio => `$${precio.toLocaleString('es-CL')}`),
    };
});

const renderPagina = () => {
    render(
        <BrowserRouter>
            <PaginaCatalogo />
        </BrowserRouter>
    );
};

describe('PaginaCatalogo (5 Tests)', () => {

    test('6. Debe renderizar el título de la página y los productos de la fuente de datos local', () => {
        renderPagina();
        expect(screen.getByText(/Catálogo de Productos/i)).toBeInTheDocument();
        expect(screen.getByText('Catan')).toBeInTheDocument();
    });

    test('7. Debe filtrar los productos por categoría al hacer clic en un enlace', async () => {
        renderPagina();
        expect(screen.getByText('Catan')).toBeInTheDocument(); 

        const linkConsolas = screen.getByRole('link', { name: /Consolas/i });
        fireEvent.click(linkConsolas);

        await waitFor(() => {
            expect(screen.getByText('PlayStation 5')).toBeInTheDocument();
        });

        expect(screen.queryByText('Catan')).not.toBeInTheDocument();
    });
    
    test('8. Debe filtrar los productos por rango de precio', async () => {
        renderPagina();
        
        const rangeInput = screen.getByRole('slider', { name: '' });
        
        expect(screen.getByText('PlayStation 5')).toBeInTheDocument();
        
        fireEvent.change(rangeInput, { target: { value: '100000' } });

        await waitFor(() => {
            expect(screen.queryByText('PlayStation 5')).not.toBeInTheDocument();
        });

        expect(screen.getByText('Catan')).toBeInTheDocument();
    });

    test('9. Debe mostrar el mensaje de "No se encontraron productos" si el filtro no coincide', async () => {
        renderPagina();
        expect(screen.getByText('Catan')).toBeInTheDocument(); 

        const linkInexistente = screen.getByRole('link', { name: /Inexistente/i }); 
        fireEvent.click(linkInexistente);

        await waitFor(() => {
            expect(screen.getByText(/No se encontraron productos que coincidan con los filtros\./i)).toBeInTheDocument();
        });

        expect(screen.queryByText('Catan')).not.toBeInTheDocument();
    });

    test('10. Debe actualizar el texto del precio al mover el slider', async () => {
        renderPagina();
        
        const rangeInput = screen.getByRole('slider', { name: '' }); 
        
        const valorInicial = '$1.500.000';
        const precioDisplay = screen.getByText(valorInicial); 

        expect(precioDisplay).toBeInTheDocument();
        expect(rangeInput).toHaveValue('1500000'); 

        const nuevoValorNumerico = '750000';
        const nuevoValorFormateado = '$750.000';

        fireEvent.change(rangeInput, { target: { value: nuevoValorNumerico } });
        
        await waitFor(() => {
            expect(screen.getByText(nuevoValorFormateado)).toBeInTheDocument();
        });

        expect(rangeInput).toHaveValue(nuevoValorNumerico);
        
        expect(screen.queryByText(valorInicial)).not.toBeInTheDocument();
    });
});