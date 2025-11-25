import React, { useEffect, useState } from "react";
import axios from "axios";

const PaginaGestionProductos = () => {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        categoria: "",
        urlImagen: ""
    });

    const token = localStorage.getItem("userToken");

    // ================================
    // Cargar productos del backend
    // ================================
    const fetchProductos = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/productos");
            setProductos(res.data);
        } catch (err) {
            console.error(err);
            setError("Error al cargar productos.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    // ================================
    // Crear producto
    // ================================
    const crearProducto = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:8080/api/v1/productos",
                nuevoProducto,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // 🔥 CORRECTO
                    }
                }
            );

            fetchProductos();
            alert("Producto creado con éxito");

            setNuevoProducto({
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "",
                categoria: "",
                urlImagen: ""
            });

        } catch (err) {
            console.error(err);
            alert("Error al crear producto");
        }
    };

    // ================================
    // Eliminar producto
    // ================================
    const eliminarProducto = async (id) => {
        if (!confirm("¿Eliminar este producto?")) return;

        try {
            await axios.delete(
                `http://localhost:8080/api/v1/productos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // 🔥 CORRECTO
                    }
                }
            );

            fetchProductos();
            alert("Producto eliminado");

        } catch (err) {
            console.error(err);
            alert("Error al eliminar producto");
        }
    };

    return (
        <main className="pagina-admin">
            <h1>Gestión de Productos</h1>

            {cargando && <p>Cargando productos...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* =======================================
               FORMULARIO CREAR PRODUCTO
               ======================================= */}
            <section className="admin-seccion">
                <h2>Crear Nuevo Producto</h2>

                <form className="form-admin" onSubmit={crearProducto}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        required
                        value={nuevoProducto.nombre}
                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Descripción"
                        required
                        value={nuevoProducto.descripcion}
                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                    />

                    <input
                        type="number"
                        placeholder="Precio"
                        required
                        value={nuevoProducto.precio}
                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                    />

                    <input
                        type="number"
                        placeholder="Stock"
                        required
                        value={nuevoProducto.stock}
                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="Categoría"
                        required
                        value={nuevoProducto.categoria}
                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
                    />

                    <input
                        type="text"
                        placeholder="URL Imagen"
                        required
                        value={nuevoProducto.urlImagen}
                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, urlImagen: e.target.value })}
                    />

                    <button type="submit">Crear Producto</button>
                </form>
            </section>

            {/* =======================================
               TABLA DE PRODUCTOS
               ======================================= */}
            <section className="admin-seccion">
                <h2>Lista de Productos</h2>

                <table className="tabla-admin">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombre}</td>
                                <td>${p.precio}</td>
                                <td>{p.stock}</td>
                                <td>{p.categoria}</td>
                                <td>
                                    <img src={p.urlImagen} width="50" alt={p.nombre} />
                                </td>

                                <td>
                                    <button
                                        onClick={() => eliminarProducto(p.id)}
                                        className="btn-eliminar"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </section>
        </main>
    );
};

export default PaginaGestionProductos;
