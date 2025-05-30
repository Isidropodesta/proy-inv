import React, { useState } from "react";

const Hero = () => {
  const [articulo, setArticulo] = useState("");
  const [articulos, setArticulos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [articuloEditado, setArticuloEditado] = useState("");
  const [indexEditando, setIndexEditando] = useState(null);

  const handleAgregar = () => {
    if (articulo.trim() === "") return;
    setArticulos([...articulos, articulo]);
    setArticulo("");
    // Aquí podrías hacer POST al backend
  };

  const handleEliminar = (index) => {
    const nuevosArticulos = [...articulos];
    nuevosArticulos.splice(index, 1);
    setArticulos(nuevosArticulos);
    // Aquí podrías hacer DELETE al backend
  };

  const iniciarEdicion = (index) => {
    setModoEdicion(true);
    setArticuloEditado(articulos[index]);
    setIndexEditando(index);
  };

  const confirmarEdicion = () => {
    if (articuloEditado.trim() === "") return;
    const nuevosArticulos = [...articulos];
    nuevosArticulos[indexEditando] = articuloEditado;
    setArticulos(nuevosArticulos);
    setModoEdicion(false);
    setArticuloEditado("");
    setIndexEditando(null);
    // Aquí podrías hacer PUT/PATCH al backend
  };

  return (
    <section id="hero" className="bg-white text-gray-900 py-20 px-6 md:px-20 flex flex-col gap-10 items-center">
      {/* Título y descripción */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Sección de <span className="text-pink-600">Artículos</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Agrega, edita o elimina artículos de tu stock.
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
                {modoEdicion && index === indexEditando ? (
                  <div className="flex w-full gap-2 items-center">
                    <input
                      type="text"
                      value={articuloEditado}
                      onChange={(e) => setArticuloEditado(e.target.value)}
                      className="flex-grow border border-gray-300 px-2 py-1 rounded"
                    />
                    <button
                      onClick={confirmarEdicion}
                      className="text-green-600 hover:text-green-800 text-sm font-semibold"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <span>{item}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => iniciarEdicion(index)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Imagen decorativa */}
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
