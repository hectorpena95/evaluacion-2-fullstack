// ❗ Ya NO se usan productos locales porque ahora vienen desde la BD
export const productos = []; // mantenido solo para evitar errores si algún componente lo importa

// ✔ Formateo de precios
export const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP' 
    }).format(precio);
};

// ✔ Categorías usadas en el frontend
export const categorias = [
    { valor: 'all', etiqueta: 'Todas las Categorías' },
    { valor: 'juegos-de-mesa', etiqueta: 'Juegos de Mesa' },
    { valor: 'accesorios', etiqueta: 'Accesorios' },
    { valor: 'consolas', etiqueta: 'Consolas' },
    { valor: 'computadores-gamers', etiqueta: 'Computadores Gamers' },
    { valor: 'sillas-gamers', etiqueta: 'Sillas Gamers' },
    { valor: 'mouse', etiqueta: 'Mouse' },
    { valor: 'mousepad', etiqueta: 'Mousepad' },
    { valor: 'poleras-personalizadas', etiqueta: 'Poleras Personalizadas' },
    { valor: 'polerones-gamers-personalizados', etiqueta: 'Polerones Gamers Personalizados' },
];
