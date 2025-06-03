import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Hero = () => {
  const [articulos, setArticulos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [formArticulo, setFormArticulo] = useState({
    descripcion: "",
    costo_compra: "",
    proveedor: {
      id_proveedor: null,
      costo_pedido: 0,
      modelo_inventario: "FIFO",
      proveedor_predeterminado: false,
      demora_entrega: 0,
      precio_unitario: 0,
    },
  });
  const [mensaje, setMensaje] = useState("");

  // Modal y edición
  const [modalOpen, setModalOpen] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdicion, setFormEdicion] = useState({
    descripcion: "",
    costo_compra: "",
  });

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

  // Manejo formulario artículo nuevo
  const handleChangeArticulo = (e) => {
    const { name, value, checked } = e.target;

    if (name === "proveedorId") {
      setFormArticulo((prev) => ({
        ...prev,
        proveedor: {
          ...prev.proveedor,
          id_proveedor: value ? Number(value) : null,
        },
      }));
    } else if (name.startsWith("proveedor.")) {
      const key = name.split(".")[1];
      let val = value;
      if (key === "proveedor_predeterminado") val = checked;
      else if (
        key === "costo_pedido" ||
        key === "demora_entrega" ||
        key === "precio_unitario"
      )
        val = Number(value) || 0;

      setFormArticulo((prev) => ({
        ...prev,
        proveedor: {
          ...prev.proveedor,
          [key]: val,
        },
      }));
    } else {
      setFormArticulo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Crear artículo
  const handleCrearArticulo = async (e) => {
    e.preventDefault();

    if (!formArticulo.descripcion.trim()) {
      setMensaje("La descripción del artículo es obligatoria");
      return;
    }

    if (
      !formArticulo.costo_compra ||
      isNaN(formArticulo.costo_compra) ||
      Number(formArticulo.costo_compra) < 0
    ) {
      setMensaje("El costo de compra debe ser un número válido mayor o igual a 0");
      return;
    }

    try {
      await axios.post(`${API_URL}/articulos`, {
        descripcion: formArticulo.descripcion.trim(),
        costo_compra: parseFloat(formArticulo.costo_compra),
        proveedor: formArticulo.proveedor.id_proveedor
          ? {
              id_proveedor: formArticulo.proveedor.id_proveedor,
              costo_pedido: Number(formArticulo.proveedor.costo_pedido) || 0,
              modelo_inventario: formArticulo.proveedor.modelo_inventario || "FIFO",
              proveedor_predeterminado: formArticulo.proveedor.proveedor_predeterminado,
              demora_entrega: Number(formArticulo.proveedor.demora_entrega) || 0,
              precio_unitario: Number(formArticulo.proveedor.precio_unitario) || 0,
            }
          : null,
      });

      setMensaje("Artículo creado correctamente");
      setFormArticulo({
        descripcion: "",
        costo_compra: "",
        proveedor: {
          id_proveedor: null,
          costo_pedido: 0,
          modelo_inventario: "FIFO",
          proveedor_predeterminado: false,
          demora_entrega: 0,
          precio_unitario: 0,
        },
      });
      fetchDatos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear artículo");
    }
  };

  // Abrir modal
  const abrirModal = () => {
    setModalOpen(true);
    setEditandoId(null);
    setMensaje("");
  };

  // Cerrar modal al hacer clic en fondo
  const onClickFondo = () => {
    setModalOpen(false);
    setEditandoId(null);
    setMensaje("");
  };

  // Manejo formulario edición
  const iniciarEdicion = (art) => {
    setEditandoId(art.id_articulo);
    setFormEdicion({
      descripcion: art.descripcion || "",
      costo_compra: art.costo_compra?.toString() || "",
    });
    setMensaje("");
  };

  const handleChangeEdicion = (e) => {
    const { name, value } = e.target;
    setFormEdicion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const guardarEdicion = async (id_articulo) => {
    if (!formEdicion.descripcion.trim()) {
      setMensaje("La descripción del artículo es obligatoria");
      return;
    }
    if (
      !formEdicion.costo_compra ||
      isNaN(formEdicion.costo_compra) ||
      Number(formEdicion.costo_compra) < 0
    ) {
      setMensaje("El costo de compra debe ser un número válido mayor o igual a 0");
      return;
    }

    try {
      await axios.put(`${API_URL}/articulos/${id_articulo}`, {
        descripcion: formEdicion.descripcion.trim(),
        costo_compra: parseFloat(formEdicion.costo_compra),
      });

      setMensaje("Artículo editado correctamente");
      setEditandoId(null);
      fetchDatos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al editar artículo");
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setMensaje("");
  };

  // Eliminar artículo
  const eliminarArticulo = async (id_articulo) => {
    if (!window.confirm("¿Estás seguro de eliminar este artículo?")) return;

    try {
      await axios.delete(`${API_URL}/articulos/${id_articulo}`);
      setMensaje("Artículo eliminado correctamente");
      fetchDatos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al eliminar artículo");
    }
  };

  return (
    <section className="bg-white text-gray-900 py-6 px-4 md:px-12 flex flex-col gap-8 items-center  max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        Módulo de <span className="text-pink-600">Artículos</span>
      </h1>

      {/* Formulario crear artículo */}
      <form
        onSubmit={handleCrearArticulo}
        className="flex flex-col gap-3 w-full max-w-xl"
      >
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción del artículo"
          value={formArticulo.descripcion}
          onChange={handleChangeArticulo}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
        <input
          type="number"
          name="costo_compra"
          placeholder="Costo de compra"
          value={formArticulo.costo_compra}
          onChange={handleChangeArticulo}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          min="0"
          step="0.01"
          required
        />

        {/* Selector de proveedor */}
        <select
          name="proveedorId"
          value={formArticulo.proveedor.id_proveedor || ""}
          onChange={handleChangeArticulo}
          className="border border-gray-300 px-3 py-2 rounded-md"
        >
          <option value="">Selecciona un proveedor (opcional)</option>
          {proveedores.map((prov) => (
            <option key={prov.id_proveedor} value={prov.id_proveedor}>
              {prov.nombre}
            </option>
          ))}
        </select>

        {/* Campos adicionales para relación proveedor */}
        {formArticulo.proveedor.id_proveedor && (
          <div className="flex flex-col gap-3 border border-gray-200 p-4 rounded-md bg-gray-50">
            <label className="flex flex-col text-sm">
              Costo pedido:
              <input
                type="number"
                name="proveedor.costo_pedido"
                value={formArticulo.proveedor.costo_pedido}
                onChange={handleChangeArticulo}
                min="0"
                step="0.01"
                className="mt-1 border border-gray-300 rounded-md px-2 py-1"
              />
            </label>
            <label className="flex flex-col text-sm">
              Modelo inventario:
              <select
                name="proveedor.modelo_inventario"
                value={formArticulo.proveedor.modelo_inventario}
                onChange={handleChangeArticulo}
                className="mt-1 border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="FIFO">FIFO</option>
                <option value="LIFO">LIFO</option>
                <option value="PROMEDIO">Promedio</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="proveedor.proveedor_predeterminado"
                checked={formArticulo.proveedor.proveedor_predeterminado}
                onChange={handleChangeArticulo}
              />
              Proveedor predeterminado
            </label>
            <label className="flex flex-col text-sm">
              Demora entrega (días):
              <input
                type="number"
                name="proveedor.demora_entrega"
                value={formArticulo.proveedor.demora_entrega}
                onChange={handleChangeArticulo}
                min="0"
                className="mt-1 border border-gray-300 rounded-md px-2 py-1"
              />
            </label>
            <label className="flex flex-col text-sm">
              Precio unitario:
              <input
                type="number"
                name="proveedor.precio_unitario"
                value={formArticulo.proveedor.precio_unitario}
                onChange={handleChangeArticulo}
                min="0"
                step="0.01"
                className="mt-1 border border-gray-300 rounded-md px-2 py-1"
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          className="bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
        >
          Agregar Artículo
        </button>
      </form>

      {/* Mensaje */}
      {mensaje && (
        <div className="text-center text-sm text-red-600 font-semibold">{mensaje}</div>
      )}

      {/* Botón para abrir modal */}
      <button
        className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition"
        onClick={abrirModal}
      >
        Gestionar Artículos
      </button>

      {/* Modal para edición/eliminación */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={onClickFondo}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[75vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Editar / Eliminar Artículos</h2>
            <table className="w-full text-left border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3 border-b">Descripción</th>
                  <th className="py-2 px-3 border-b">Costo Compra</th>
                  <th className="py-2 px-3 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {articulos.map((art) => (
                  <tr
                    key={art.id_articulo}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="py-2 px-3">
                      {editandoId === art.id_articulo ? (
                        <input
                          type="text"
                          name="descripcion"
                          value={formEdicion.descripcion}
                          onChange={handleChangeEdicion}
                          className="border border-gray-300 rounded-md px-2 py-1 w-full"
                        />
                      ) : (
                        art.descripcion
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {editandoId === art.id_articulo ? (
                        <input
                          type="number"
                          name="costo_compra"
                          value={formEdicion.costo_compra}
                          onChange={handleChangeEdicion}
                          min="0"
                          step="0.01"
                          className="border border-gray-300 rounded-md px-2 py-1 w-full"
                        />
                      ) : (
                        art.costo_compra
                      )}
                    </td>
                    <td className="py-2 px-3 space-x-2">
                      {editandoId === art.id_articulo ? (
                        <>
                          <button
                            onClick={() => guardarEdicion(art.id_articulo)}
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={cancelarEdicion}
                            className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => iniciarEdicion(art)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarArticulo(art.id_articulo)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
