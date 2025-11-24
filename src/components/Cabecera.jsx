import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Cabecera = () => {
    const { isAuthenticated, user, roles, logout } = useAuth();

    const esCliente = roles?.some(r => r === "CLIENT" || r === "ROLE_CLIENT");
    const esAdmin = roles?.some(r => r === "ADMIN" || r === "ROLE_ADMIN");

    return (
        <header id="main-header">
            <div className="contenedor-interno">

                <div className="logo">
                    <Link to="/">Level-Up Gamer</Link>
                </div>

                <nav className="menu-nav">
                    <ul>
                        <li><Link to="/catalogo">Catálogo</Link></li>

                        {/* 🔥 Carrito SOLO para CLIENTE */}
                        {esCliente && (
                            <li>
                                <Link to="/carrito">Carrito</Link>
                            </li>
                        )}

                        {/* 🔥 Admin → menú admin */}
                        {esAdmin && (
                            <>
                                <li><Link to="/admin">Panel Admin</Link></li>
                                <li><Link to="/gestion-productos">Productos</Link></li>
                                <li><Link to="/gestion-usuarios">Usuarios</Link></li>
                            </>
                        )}

                        {!isAuthenticated ? (
                            <li><Link to="/login">Iniciar Sesión</Link></li>
                        ) : (
                            <>
                                <li className="usuario-nav">
                                    Hola, <strong>{user}</strong>
                                </li>
                                <li>
                                    <button className="btn-logout" onClick={logout}>
                                        Cerrar sesión
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

            </div>
        </header>
    );
};

export default Cabecera;
