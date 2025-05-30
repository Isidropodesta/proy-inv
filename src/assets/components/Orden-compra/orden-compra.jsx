import React, { useState } from "react";

const OrdenDeCompra = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [nuevaOrden, setNuevaOrden] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ordenEditada, setOrdenEditada] = useState("");
  const [indexEditando, setIndexEditando] = useState(null);

  const agregarOrden = () => {
    if (nuevaOrden.trim() === "") return;
    setOrdenes([...ordenes, nuevaOrden]);
    setNuevaOrden("");
  };

  const eliminarOrden = (index) => {
    const actualizadas = [...ordenes];
    actualizadas.splice(index, 1);
    setOrdenes(actualizadas);
  };

  const iniciarEdicion = (index) => {
    setModoEdicion(true);
    setOrdenEditada(ordenes[index]);
    setIndexEditando(index);
  };

  const confirmarEdicion = () => {
    if (ordenEditada.trim() === "") return;
    const actualizadas = [...ordenes];
    actualizadas[indexEditando] = ordenEditada;
    setOrdenes(actualizadas);
    setModoEdicion(false);
    setOrdenEditada("");
    setIndexEditando(null);
  };

  return (
    <section id="orden-compra" className="bg-white text-gray-900 py-16 px-6 md:px-20 flex flex-col gap-10 items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        Módulo de <span className="text-pink-600">Órdenes de Compra</span>
      </h1>

      {/* Formulario de creación */}
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-xl">
        <input
          type="text"
          placeholder="Nombre de la orden"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={nuevaOrden}
          onChange={(e) => setNuevaOrden(e.target.value)}
        />
        <button
          onClick={agregarOrden}
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Crear orden
        </button>
      </div>

      {/* Lista de órdenes */}
      {ordenes.length > 0 && (
        <div className="w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">Órdenes existentes:</h2>
          <ul className="space-y-2">
            {ordenes.map((orden, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md"
              >
                {modoEdicion && index === indexEditando ? (
                  <div className="flex w-full gap-2 items-center">
                    <input
                      type="text"
                      value={ordenEditada}
                      onChange={(e) => setOrdenEditada(e.target.value)}
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
                    <span>{orden}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => iniciarEdicion(index)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Modificar
                      </button>
                      <button
                        onClick={() => eliminarOrden(index)}
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

export default OrdenDeCompra;
