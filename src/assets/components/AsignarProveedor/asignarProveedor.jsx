import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AsignarProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
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

  // Traer proveedores
  const fetchProveedores = async () => {
    try {
      const res = await axios.get(`${API_URL}/proveedores`);
      setProveedores(res.data);
    } catch (error) {
      console.error("Error al traer proveedores:", error);
      setMensaje("Error al cargar proveedores");
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

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
      setMensaje("Debe ingresar el ID del artículo y seleccionar un proveedor.");
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
      setMensaje("Los campos numéricos deben ser válidos y no negativos.");
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

      setMensaje("Proveedor asignado al artículo correctamente.");
      setRelacionForm({
        id_articulo: "",
        id_proveedor: "",
        costo_pedido: "",
        modelo_inventario: "FIFO",
        proveedor_predeterminado: false,
        demora_entrega: "",
        precio_unitario: "",
      });
    } catch (error) {
      console.error(error);
      setMensaje("Error al asignar proveedor al artículo.");
    }
  };

  return (
    <section className="bg-white text-gray-900 py-16 px-6 md:px-20 flex flex-col gap-1 items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-1">
        Asignar <span className="text-pink-600">Proveedor</span> a Artículo
      </h1>

      <form
        onSubmit={handleAsignarRelacion}
        className="flex flex-col gap-1 w-full max-w-xl"
      >
        {/* Input manual para ID del artículo */}
        <input
          type="number"
          name="id_articulo"
          placeholder="ID del artículo"
          value={relacionForm.id_articulo}
          onChange={handleChangeRelacion}
          min="1"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        {/* Select para proveedor con nombre, razón social y CUIT */}
        <select
          name="id_proveedor"
          value={relacionForm.id_proveedor}
          onChange={handleChangeRelacion}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        >
          <option value="">-- Seleccionar proveedor --</option>
          {proveedores.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.nombre} - {prov.razon_social} - CUIT: {prov.cuit}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="costo_pedido"
          placeholder="Costo de pedido"
          value={relacionForm.costo_pedido}
          onChange={handleChangeRelacion}
          min="0"
          step="0.01"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
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
          placeholder="Demora en entrega (días)"
          value={relacionForm.demora_entrega}
          onChange={handleChangeRelacion}
          min="0"
          step="1"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <input
          type="number"
          name="precio_unitario"
          placeholder="Precio unitario"
          value={relacionForm.precio_unitario}
          onChange={handleChangeRelacion}
          min="0"
          step="0.01"
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />

        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Asignar proveedor
        </button>
      </form>

      {mensaje && (
        <div className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-md mt-4 max-w-xl text-center">
          {mensaje}
        </div>
      )}
    </section>
  );
};

export default AsignarProveedor;
