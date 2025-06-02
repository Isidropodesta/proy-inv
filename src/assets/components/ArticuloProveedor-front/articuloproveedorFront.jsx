import React, { useState } from "react";
import axios from "axios";

const ProveedorArticulos = () => {
  const [cuilProveedor, setCuilProveedor] = useState("");
  const [articulos, setArticulos] = useState([]);
  const [error, setError] = useState("");

  const fetchArticulos = async () => {
    if (!cuilProveedor.trim()) {
      setError("Por favor, ingresa un CUIL de proveedor.");
      setArticulos([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3001/api/articulos/proveedor/${cuilProveedor}`);
      setArticulos(res.data);
      setError("");
    } catch (err) {
      setError("Error al obtener artículos. Verifica que el CUIL sea correcto.");
      setArticulos([]);
    }
  };

  return (
    <section className="py-10 px-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Buscar Artículos por CUIL del Proveedor</h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="CUIL del proveedor"
          value={cuilProveedor}
          onChange={(e) => setCuilProveedor(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full focus:ring-2 focus:ring-pink-500 outline-none"
        />
        <button
          onClick={fetchArticulos}
          className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
        >
          Buscar
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
      )}

      {articulos.length > 0 ? (
        <ul className="space-y-4">
          {articulos.map((articulo, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded shadow">
              <p><strong>Descripción:</strong> {articulo.descripcion}</p>
              <p><strong>Precio unitario:</strong> ${articulo.precio_unitario}</p>
              <p><strong>Demanda:</strong> {articulo.demanda}</p>
              <p><strong>Lote óptimo:</strong> {articulo.lote_optimo}</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && (
          <p className="text-center text-gray-500">No se encontraron artículos para este proveedor.</p>
        )
      )}
    </section>
  );
};

export default ProveedorArticulos;
