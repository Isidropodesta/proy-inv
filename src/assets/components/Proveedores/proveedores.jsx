import React, { useState, useEffect } from "react";
import axios from "axios";

const Proveedor = () => {
  const [formulario, setFormulario] = useState({
    cuit: "",
    razon_social: "",
    telefono: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const resetFormulario = () => {
    setFormulario({ cuit: "", razon_social: "", telefono: "" });
    setEditandoId(null);
    setMensaje("");
  };

  const fetchProveedores = async () => {
    try {
      const res = await axios.get(`${API_URL}/proveedores`);
      setProveedores(res.data);
    } catch (error) {
      console.error("Error al traer proveedores", error);
      setMensaje("Error al cargar la lista de proveedores.");
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formulario.cuit.trim() || !formulario.razon_social.trim()) {
      setMensaje("CUIT y Razón Social son obligatorios.");
      return;
    }

    const dataToSend = {
      cuit: formulario.cuit.trim(),
      razon_social: formulario.razon_social.trim(),
      telefono: formulario.telefono.trim() || null,
    };

    try {
      if (editandoId) {
        await axios.put(`${API_URL}/proveedores/${editandoId}`, dataToSend, {
          headers: { "Content-Type": "application/json" },
        });
        setMensaje("Proveedor actualizado con éxito");
      } else {
        await axios.post(`${API_URL}/proveedores`, dataToSend, {
          headers: { "Content-Type": "application/json" },
        });
        setMensaje("Proveedor creado con éxito");
      }

      resetFormulario();
      fetchProveedores();
    } catch (error) {
      console.error("Error al guardar proveedor:", error);
      setMensaje(
        error.response?.data?.error ||
          (editandoId
            ? "Error al actualizar proveedor"
            : "Error al crear proveedor")
      );
    }
  };

  const handleEditar = (proveedor) => {
    setFormulario({
      cuit: proveedor.cuit || "",
      razon_social: proveedor.razon_social || "",
      telefono: proveedor.telefono || "",
    });
    setEditandoId(proveedor.id_proveedor);
    setMensaje("");
    setModalOpen(false); // Cerramos modal para editar en el formulario principal
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`${API_URL}/proveedores/${id}`);
      setMensaje("Proveedor eliminado con éxito");
      fetchProveedores();
    } catch (error) {
      console.error("Error al eliminar proveedor:", error);
      setMensaje("Error al eliminar proveedor");
    }
  };

  return (
    <section className="py-10 px-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
        {editandoId ? "Editar Proveedor" : "Crear Proveedor"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="cuit"
          placeholder="CUIT"
          autoComplete="off"
          value={formulario.cuit}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="razon_social"
          placeholder="Razón Social"
          autoComplete="off"
          value={formulario.razon_social}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          autoComplete="off"
          value={formulario.telefono}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700 flex-1"
          >
            {editandoId ? "Actualizar Proveedor" : "Crear Proveedor"}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={resetFormulario}
              className="bg-gray-400 text-white py-2 rounded hover:bg-gray-500 flex-1"
            >
              Cancelar
            </button>
          )}
        </div>

        {mensaje && (
          <p className="text-center mt-2 text-sm text-gray-700">{mensaje}</p>
        )}
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ver Proveedores
        </button>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Lista de Proveedores</h3>
            {proveedores.length === 0 ? (
              <p>No hay proveedores para mostrar.</p>
            ) : (
              <ul className="max-h-64 overflow-auto space-y-4">
                {proveedores.map((prov) => (
                  <li
                    key={prov.id_proveedor}
                    className="border-b pb-2 flex justify-between items-start gap-4"
                  >
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>CUIT:</strong> {prov.cuit}
                      </p>
                      <p>
                        <strong>Razón Social:</strong> {prov.razon_social}
                      </p>
                      <p>
                        <strong>Teléfono:</strong> {prov.telefono || "-"}
                      </p>
                      <p>
                        <strong>Vigente:</strong> {prov.proveedor_vigente ? "Sí" : "No"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEditar(prov)}
                        className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "¿Estás seguro de eliminar este proveedor?"
                            )
                          ) {
                            handleEliminar(prov.id_proveedor);
                          }
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Proveedor;
