import React, { useState } from "react";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState("");

  const agregarVenta = () => {
    if (nuevaVenta.trim() === "") return;
    setVentas([...ventas, nuevaVenta]);
    setNuevaVenta("");
  };

  return (
    <section id="ventas" className="bg-white text-gray-900 py-16 px-6 md:px-20 flex flex-col gap-10 items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        Módulo de <span className="text-pink-600">Ventas</span>
      </h1>

      {/* Alta de ventas */}
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-xl">
        <input
          type="text"
          placeholder="Descripción de la venta"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={nuevaVenta}
          onChange={(e) => setNuevaVenta(e.target.value)}
        />
        <button
          onClick={agregarVenta}
          className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
        >
          Registrar venta
        </button>
      </div>

      {/* Listado de ventas */}
      {ventas.length > 0 && (
        <div className="w-full max-w-xl">
          <h2 className="text-2xl font-semibold mb-4">Ventas registradas:</h2>
          <ul className="space-y-2">
            {ventas.map((venta, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md"
              >
                <span>{venta}</span>
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

export default Ventas;
