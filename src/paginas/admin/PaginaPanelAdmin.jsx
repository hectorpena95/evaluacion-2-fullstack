import React from "react";

const PaginaPanelAdmin = () => {
    return (
        <main className="pagina-admin">
            <h1>Panel de Administración</h1>
            <p>Bienvenido al panel principal del administrador.</p>

            <div className="admin-grid">
                <a href="/gestion-productos" className="admin-card">Gestionar Productos</a>
                <a href="/gestion-usuarios" className="admin-card">Gestionar Usuarios</a>
                <a href="/pedidos" className="admin-card">Ver Pedidos</a>
            </div>
        </main>
    );
};

export default PaginaPanelAdmin;
