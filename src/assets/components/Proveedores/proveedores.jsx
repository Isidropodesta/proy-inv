import React, { useState } from "react";
import axios from "axios";

const Proveedor = () => {
  const [formulario, setFormulario] = useState({
    cuit: "",
    razon_social: "",
    telefono: ""
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formulario.cuit || !formulario.razon_social) {
      setMensaje("CUIT y Razón Social son obligatorios.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/proveedores`, formulario);
      setMensaje("Proveedor creado con éxito");
      setFormulario({ cuit: "", razon_social: "", telefono: "" });
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear proveedor");
    }
  };

  return (
    <section className="py-10 px-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">Crear Proveedor</h2>
      
      <div className="flex flex-col gap-4">
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
        <button
          onClick={handleSubmit}
          className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
        >
          Crear Proveedor
        </button>
        {mensaje && <p className="text-center mt-2 text-sm text-gray-700">{mensaje}</p>}
      </div>
    </section>
  );
};

export default Proveedor;
