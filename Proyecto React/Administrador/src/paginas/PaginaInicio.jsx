import React from 'react';
import { Link } from 'react-router-dom'; 


const PaginaInicio = () => {
    return (
        <main className="pagina-inicio">
            
            {/* Sección Principal (Hero) */}
            <section className="hero-section">
                <h2>Eleva tu juego al siguiente nivel</h2>
                <p>Descubre la mejor selección de productos para gamers en Chile.</p>
                {/* Usamos Link para navegar al Catálogo sin recargar la página */}
                <Link to="/catalogo" className="cta-button">Explora el Catálogo</Link>
            </section>

            {/* Sección de Comunidad/Noticias */}
            <section className="community-section">
                <h2>Únete a la Comunidad</h2>
                <p>Lee nuestros blogs, entérate de las últimas noticias y participa en eventos.</p>
                {/* Este enlace es solo un placeholder, podrías dirigirlo a una página de blog */}
                <Link to="/blog" className="cta-button">Ver Más</Link>
            </section>

        </main>
    );
};

export default PaginaInicio;