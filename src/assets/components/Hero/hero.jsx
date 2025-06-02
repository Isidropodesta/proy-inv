
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Hero = () => {
  const [articulos, setArticulos] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const [formArticulo, setFormArticulo] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    proveedorId: "",
  });

  const [relacionForm, setRelacionForm] = useState({
    id_articulo: "",
    id_proveedor: "",
    costo_pedido: "",
    modelo_inventario: "FIFO",
    proveedor_predeterminado: false,
    demora_entrega: "",
    precio_unitario: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  // Traer artículos y proveedores
  const fetchDatos = async () => {
    try {
      const [artRes, provRes] = await Promise.all([
        axios.get(`${API_URL}/articulos`),
        axios.get(`${API_URL}/proveedores`),
      ]);
      setArticulos(artRes.data);
      setProveedores(provRes.data);
    } catch (error) {
      console.error("Error al traer datos:", error);
      setMensaje("Error al cargar artículos o proveedores");
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  // Manejo formulario artículo
  const handleChangeArticulo = (e) => {
    const { name, value } = e.target;
    setFormArticulo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCrearArticulo = async (e) => {
    e.preventDefault();

    if (!formArticulo.nombre.trim()) {
      setMensaje("El nombre del artículo es obligatorio");
      return;
    }

    if (
      !formArticulo.precio ||
      isNaN(formArticulo.precio) ||
      Number(formArticulo.precio) < 0
    ) {
      setMensaje("El precio debe ser un número válido mayor o igual a 0");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/articulos`, {
        nombre: formArticulo.nombre.trim(),
        descripcion: formArticulo.descripcion.trim() || null,
        precio: parseFloat(formArticulo.precio),
      });

      const nuevoArticulo = res.data;

      // Si se seleccionó proveedor, crear la relación
      if (formArticulo.proveedorId) {
        await axios.post(`${API_URL}/articulo-proveedores`, {
          id_articulo: nuevoArticulo.id_articulo,
          id_proveedor: Number(formArticulo.proveedorId),
          costo_pedido: 0,
          modelo_inventario: "FIFO",
          proveedor_predeterminado: false,
          demora_entrega: 0,
          precio_unitario: 0,
        });
      }

      setMensaje("Artículo creado correctamente");
      setFormArticulo({
        nombre: "",
        descripcion: "",
        precio: "",
        proveedorId: "",
      });
      fetchDatos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear artículo");
    }
  };

  // Manejo formulario relación artículo-proveedor
  const handleChangeRelacion = (e) => {
    const { name, value, type, checked } = e.target;
    setRelacionForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAsignarRelacion = async (e) => {
    e.preventDefault();

    const {
      id_articulo,
      id_proveedor,
      costo_pedido,
      modelo_inventario,
      proveedor_predeterminado,
      demora_entrega,
      precio_unitario,
    } = relacionForm;

    if (!id_articulo || !id_proveedor) {
      setMensaje("Debe seleccionar artículo y proveedor para asignar");
      return;
    }

    if (
      isNaN(costo_pedido) ||
      isNaN(demora_entrega) ||
      isNaN(precio_unitario) ||
      Number(costo_pedido) < 0 ||
      Number(demora_entrega) < 0 ||
      Number(precio_unitario) < 0
    ) {
      setMensaje(
        "Los campos numéricos deben ser números válidos y no negativos"
      );
      return;
    }

    try {
      await axios.post(`${API_URL}/articulo-proveedores`, {
        id_articulo: Number(id_articulo),
        id_proveedor: Number(id_proveedor),
        costo_pedido: Number(costo_pedido),
        modelo_inventario,
        proveedor_predeterminado,
        demora_entrega: Number(demora_entrega),
        precio_unitario: Number(precio_unitario),
      });

      setMensaje("Proveedor asignado al artículo correctamente");
      setRelacionForm({
        id_articulo: "",
        id_proveedor: "",
        costo_pedido: "",
        modelo_inventario: "FIFO",
        proveedor_predeterminado: false,
        demora_entrega: "",
        precio_unitario: "",
      });
      fetchDatos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al asignar proveedor al artículo");
    }
  };

  return (
    <section
      id="hero"
      className="bg-white text-gray-900 py-16 px-6 md:px-20 flex flex-col gap-10 items-center"
    >
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        Módulo de <span className="text-pink-600">Artículos</span>
      </h1>

      {/* Formulario crear artículo */}
      <form
        onSubmit={handleCrearArticulo}
        className="flex flex-col gap-4 w-full max-w-xl"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del artículo"
          value={formArticulo.nombre}
          onChange={handleChangeArticulo}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción (opcional)"
          value={formArticulo.descripcion}
          onChange={handleChangeArticulo}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={formArticulo.precio}
          onChange={handleChangeArticulo}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          min="0"
          step="0.01"
          required
        />
        <select
          name="proveedorId"
          value={formArticulo.proveedorId}
          onChange={handleChangeArticulo}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">-- Seleccionar proveedor (opcional) --</option>
          {proveedores.map((prov) => (
            <option key={prov.id_proveedor} value={prov.id_proveedor}>
              {prov.razon_social}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Confirmar creación
        </button>
      </form>

      {/* Formulario asignar relación artículo-proveedor */}
      <form
        onSubmit={handleAsignarRelacion}
        className="flex flex-col gap-4 w-full max-w-xl"
      >
        <h2 className="text-2xl font-semibold">
          Asignar proveedor a artículo existente
        </h2>
<select
  name="id_articulo"
  value={relacionForm.id_articulo}
  onChange={handleChangeRelacion}
  className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
  style={{ color: "#1a202c", backgroundColor: "#fff" }} // colores explícitos para asegurar visibilidad
  required
>
  <option value="" style={{ color: "#a0aec0" }}>
    -- Seleccionar artículo --
  </option>
  {articulos.map((art) => (
    <option key={art.id_articulo} value={art.id_articulo}>
      {art.nombre}
    </option>
  ))}
</select>



        <select
          name="id_proveedor"
          value={relacionForm.id_proveedor}
          onChange={handleChangeRelacion}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        >
          <option value="">-- Seleccionar proveedor --</option>
          {proveedores.map((prov) => (
            <option key={prov.id_proveedor} value={prov.id_proveedor}>
              {prov.razon_social}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="costo_pedido"
          placeholder="Costo de pedido"
          value={relacionForm.costo_pedido}
          onChange={handleChangeRelacion}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          min="0"
          step="0.01"
          required
        />

        <select
          name="modelo_inventario"
          value={relacionForm.modelo_inventario}
          onChange={handleChangeRelacion}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        >
          <option value="FIFO">FIFO</option>
          <option value="LIFO">LIFO</option>
          <option value="PEPS">PEPS</option>
          <option value="UEPS">UEPS</option>
        </select>

        <input
          type="number"
          name="demora_entrega"
          placeholder="Demora entrega (días)"
          value={relacionForm.demora_entrega}
          onChange={handleChangeRelacion}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          min="0"
          step="1"
          required
        />

        <input
          type="number"
          name="precio_unitario"
          placeholder="Precio unitario"
          value={relacionForm.precio_unitario}
          onChange={handleChangeRelacion}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          min="0"
          step="0.01"
          required
        />

      

        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Asignar Proveedor
        </button>
      </form>

      {mensaje && (
        <div className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-md mt-4 max-w-xl text-center">
          {mensaje}
        </div>
      )}

      <button
        onClick={() => setModalAbierto(true)}
        className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition mt-6"
      >
        Ver lista de artículos
      </button>

      {modalAbierto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={() => setModalAbierto(false)}
        >
          <div
            className="bg-white p-6 rounded-md shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto text-black"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-4">Lista de Artículos</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-3 py-1">ID</th>
                  <th className="border border-gray-300 px-3 py-1">Nombre</th>
                  <th className="border border-gray-300 px-3 py-1">
                    Descripción
                  </th>
                  <th className="border border-gray-300 px-3 py-1">Precio</th>
                </tr>
              </thead>
              <tbody>
                {articulos.map((art) => (
                  <tr key={art.id_articulo}>
                    <td className="border border-gray-300 px-3 py-1 text-center">
                      {art.id_articulo}
                    </td>
                    <td className="border border-gray-300 px-3 py-1">
                      {art.nombre}
                    </td>
                    <td className="border border-gray-300 px-3 py-1">
                      {art.descripcion || "-"}
                    </td>
                    <td className="border border-gray-300 px-3 py-1 text-right">
                      ${art.precio.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setModalAbierto(false)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
