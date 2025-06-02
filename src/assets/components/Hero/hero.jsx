import React, { useState } from "react";
import axios from "axios";

const Hero = () => {
  const [descripcion, setDescripcion] = useState("");
  const [proveedorId, setProveedorId] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [articulos, setArticulos] = useState([]);

  const handleAgregar = async () => {
    if (descripcion.trim() === "" || proveedorId.trim() === "" || precioUnitario.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:3000/api/articulos", {
        descripcion,
        proveedor: {
          id_proveedor: parseInt(proveedorId),
          precio_unitario: parseFloat(precioUnitario)
        }
      });

      setArticulos([...articulos, response.data]);
      setDescripcion("");
      setProveedorId("");
      setPrecioUnitario("");
    } catch (error) {
      console.error("Error al agregar el artículo:", error);
    }
  };

  return (
    <section id="hero" className="bg-white text-gray-900 py-20 px-6 md:px-20 flex flex-col gap-10 items-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Sección de <span className="text-pink-600">Artículos</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Agrega artículos y asócialos a proveedores.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-xl">
        <input
          type="text"
          placeholder="Descripción del artículo"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID del proveedor"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={proveedorId}
          onChange={(e) => setProveedorId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Precio unitario"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={precioUnitario}
          onChange={(e) => setPrecioUnitario(e.target.value)}
        />
        <button
          onClick={handleAgregar}
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Agregar
        </button>
      </div>

      {articulos.length > 0 && (
        <div className="w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">Artículos actuales:</h2>
          <ul className="space-y-2">
            {articulos.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md"
              >
                <span>{item.descripcion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10">
        <img
          src="/images/logo-limpio.png"
          alt="Control de stock"
          className="w-[50px] max-w-md drop-shadow-lg mx-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
