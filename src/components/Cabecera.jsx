import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Cabecera = () => {
    const { isAuthenticated, user, roles, logout } = useAuth();

    console.log("ROLES EN EL HEADER:", roles); // 🔍 Para verificar

    return (
        <header id="main-header">
            <div className="contenedor-interno">

                <div className="logo">
                    <Link to="/">Level-Up Gamer</Link>
                </div>

                <nav className="menu-nav">
                    <ul>
                        {/* Siempre visible */}
                        <li><Link to="/catalogo">Catálogo</Link></li>

                        {/* Cliente → mostrar carrito */}
                        {roles?.includes("ROLE_CLIENT") && (
                            <li><Link to="/carrito">Carrito</Link></li>
                        )}

                        {/* Admin → mostrar menú admin */}
                        {roles?.includes("ROLE_ADMIN") && (
                            <>
                                <li><Link to="/admin">Panel Admin</Link></li>
                                <li><Link to="/gestion-productos">Productos</Link></li>
                                <li><Link to="/gestion-usuarios">Usuarios</Link></li>
                            </>
                        )}

                        {/* Login / Logout */}
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
