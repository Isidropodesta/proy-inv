import React, { useState } from "react";

const Hero = () => {
  const [articulo, setArticulo] = useState("");
  const [articulos, setArticulos] = useState([]);

  const handleAgregar = () => {
    if (articulo.trim() === "") return;
    setArticulos([...articulos, articulo]);
    setArticulo("");
  };

  const handleEliminar = (nombre) => {
    const nuevosArticulos = articulos.filter((item) => item !== nombre);
    setArticulos(nuevosArticulos);
  };

  return (
    <section className="bg-white text-gray-900 py-20 px-6 md:px-20 flex flex-col gap-10 items-center">
      {/* Título y descripción */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Sección de <span className="text-pink-600">Artículos</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Agrega y elimina artículos de tu stock de manera eficiente.
        </p>
      </div>

      {/* Formulario para agregar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-xl">
        <input
          type="text"
          placeholder="Nombre del artículo"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={articulo}
          onChange={(e) => setArticulo(e.target.value)}
        />
        <button
          onClick={handleAgregar}
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Agregar
        </button>
      </div>

      {/* Lista de artículos */}
      {articulos.length > 0 && (
        <div className="w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">Artículos actuales:</h2>
          <ul className="space-y-2">
            {articulos.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md"
              >
                <span>{item}</span>
                <button
                  onClick={() => handleEliminar(item)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Imagen decorativa */}
      <div className="mt-10">
    
      </div>
    </section>
  );
};

export default Hero;
