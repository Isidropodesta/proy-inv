import React, { useState, useEffect } from "react";
import axios from "axios";

const Proveedor = () => {
  const [formulario, setFormulario] = useState({
    cuit: "",
    razon_social: "",
    telefono: ""
  });
  const [mensaje, setMensaje] = useState("");
  const [proveedores, setProveedores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editandoId, setEditandoId] = useState(null); // id del proveedor que se está editando

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formulario.cuit.trim() || !formulario.razon_social.trim()) {
      setMensaje("CUIT y Razón Social son obligatorios.");
      return;
    }

    try {
      const dataToSend = {
        ...formulario,
        cuit: formulario.cuit.trim(),
        telefono: formulario.telefono ? formulario.telefono.trim() : null,
      };

      if (editandoId) {
        // Modo edición -> PUT para actualizar
        await axios.put(
          `${import.meta.env.VITE_API_URL}/proveedores/${editandoId}`,
          dataToSend,
          { headers: { "Content-Type": "application/json" } }
        );
        setMensaje("Proveedor actualizado con éxito");
      } else {
        // Modo creación -> POST para crear
        await axios.post(
          `${import.meta.env.VITE_API_URL}/proveedores`,
          dataToSend,
          { headers: { "Content-Type": "application/json" } }
        );
        setMensaje("Proveedor creado con éxito");
      }

      resetFormulario();
      fetchProveedores();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setMensaje(`Error: ${error.response.data.error || error.response.statusText}`);
      } else {
        setMensaje(editandoId ? "Error al actualizar proveedor" : "Error al crear proveedor");
      }
    }
  };

  // Traer proveedores del backend
  const fetchProveedores = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/proveedores`);
      setProveedores(res.data);
    } catch (error) {
      console.error("Error al traer proveedores", error);
    }
  };

  // Traer proveedores cuando se abre el modal
  useEffect(() => {
    if (modalOpen) {
      fetchProveedores();
    }
  }, [modalOpen]);

  // Cargar proveedor en el formulario para editar
  const handleEditar = (proveedor) => {
    setFormulario({
      cuit: proveedor.cuit || "",
      razon_social: proveedor.razon_social || "",
      telefono: proveedor.telefono || "",
    });
    setEditandoId(proveedor.id_proveedor);
    setMensaje("");
    setModalOpen(false); // cerramos modal para editar
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
          value={formulario.cuit}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="razon_social"
          placeholder="Razón Social"
          value={formulario.razon_social}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
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

      {/* Botón para abrir modal */}
      <div className="text-center mt-6">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ver Proveedores
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)} // cerrar modal si clickeas fuera
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full"
            onClick={e => e.stopPropagation()} // evitar cerrar modal al click adentro
          >
            <h3 className="text-xl font-semibold mb-4">Lista de Proveedores</h3>
            {proveedores.length === 0 ? (
              <p>No hay proveedores para mostrar.</p>
            ) : (
              <ul className="max-h-64 overflow-auto">
                {proveedores.map((prov) => (
                  <li
                    key={prov.id_proveedor}
                    className="border-b py-2 flex justify-between items-center"
                  >
                    <div>
                      <p><strong>CUIT:</strong> {prov.cuit}</p>
                      <p><strong>Razón Social:</strong> {prov.razon_social}</p>
                      <p><strong>Teléfono:</strong> {prov.telefono || '-'}</p>
                      <p><strong>Vigente:</strong> {prov.proveedor_vigente ? 'Sí' : 'No'}</p>
                    </div>
                    <button
                      onClick={() => handleEditar(prov)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Editar
                    </button>
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
