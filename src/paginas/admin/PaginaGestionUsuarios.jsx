import React, { useEffect, useState } from "react";
import axios from "axios";

const PaginaGestionUsuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("userToken");

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/v1/admin/usuarios",
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                setUsuarios(response.data);
            } catch (err) {
                setError("No se pudieron cargar los usuarios.");
                console.error("Error cargando usuarios:", err);
            } finally {
                setCargando(false);
            }
        };

        fetchUsuarios();
    }, [token]);

    return (
        <main className="pagina-admin">
            <h1>Gestión de Usuarios</h1>

            {cargando && <p>Cargando usuarios...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {!cargando && !error && (
                <div className="admin-seccion">
                    <h2>Listado de Usuarios</h2>

                    <table className="tabla-admin">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Roles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>{u.roles?.map(r => r.name).join(", ")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
};

export default PaginaGestionUsuarios;
