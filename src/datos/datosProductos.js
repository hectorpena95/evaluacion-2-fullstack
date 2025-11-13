
export const productos = [
    {
        id: 'JM001',
        nombre: 'Catan',
        categoria: 'juegos-de-mesa',
        precio: 29990,
        imagen: 'catan.png',
        descripcion: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan.'
    },
    {
        id: 'JM002',
        nombre: 'Carcassonne',
        categoria: 'juegos-de-mesa',
        precio: 24990,
        imagen: 'carcassonne.jpg',
        descripcion: 'Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne.'
    },
    {
        id: 'AC001',
        nombre: 'Controlador Inalámbrico Xbox Series X',
        categoria: 'accesorios',
        precio: 59990,
        imagen: 'xbox-controller.jpg',
        descripcion: 'Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada.'
    },
    {
        id: 'CO001',
        nombre: 'PlayStation 5',
        categoria: 'consolas',
        precio: 549990,
        imagen: 'ps5.jpg',
        descripcion: 'La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos.'
    },
    {
        id: 'CG001',
        nombre: 'PC Gamer ASUS ROG Strix',
        categoria: 'computadores-gamers',
        precio: 1299990,
        imagen: 'asus-rog.jpg',
        descripcion: 'Un potente equipo diseñado para los gamers más exigentes.'
    },
    {
        id: 'SG001',
        nombre: 'Silla Gamer Secretlab Titan',
        categoria: 'sillas-gamers',
        precio: 349990,
        imagen: 'secretlab-titan.webp',
        descripcion: 'Diseñada para el máximo confort, con soporte ergonómico ajustable.'
    },
    {
        id: 'MS001',
        nombre: 'Mouse Gamer Logitech G502 HERO',
        categoria: 'mouse',
        precio: 49990,
        imagen: 'logitech-g502.jpg',
        descripcion: 'Con sensor de alta precisión y botones personalizables.'
    },
    {
        id: 'MP001',
        nombre: 'Mousepad Razer Goliathus Extended Chroma',
        categoria: 'mousepad',
        precio: 29990,
        imagen: 'razer-mousepad.jpg',
        descripcion: 'Ofrece un área de juego amplia con iluminación RGB personalizable.'
    },
    {
        id: 'PP001',
        nombre: 'Polera Gamer Personalizada "Level-Up"',
        categoria: 'poleras-personalizadas',
        precio: 14990,
        imagen: 'polera-levelup.jpg',
        descripcion: 'Una camiseta cómoda y estilizada, personalizable con tu gamer tag.'
    }
];

export const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(precio);
};

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