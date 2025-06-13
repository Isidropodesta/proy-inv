import React, { useState, useEffect } from "react";
import axios from "axios";

const VentaForm = () => {
  const [articulos, setArticulos] = useState([]);
  const [detalles, setDetalles] = useState([{ id_articulo: "", cantidad: "" }]);
  const [mensaje, setMensaje] = useState("");

  // Traer artículos
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/articulos`)
      .then(res => setArticulos(res.data))
      .catch(() => setMensaje("Error al cargar artículos"));
  }, []);

  const handleDetalleChange = (i, field, value) => {
    const nuevos = [...detalles];
    nuevos[i][field] = value;
    setDetalles(nuevos);
  };

  const agregarLinea = () => setDetalles([...detalles, { id_articulo: "", cantidad: "" }]);
  const removerLinea = i => setDetalles(detalles.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los detalles tengan artículo y cantidad > 0
    if (detalles.some(d => !d.id_articulo || !d.cantidad || Number(d.cantidad) <= 0)) {
      return setMensaje("Completa todos los campos y cantidades > 0.");
    }

    try {
      setMensaje("Registrando venta...");

      // 1. Crear la venta primero (monto total 0 por ahora)
      const ventaRes = await axios.post(`${import.meta.env.VITE_API_URL}/ventas`, {
        monto_total_venta: 0
      });
      

     console.log("Respuesta venta creada:", JSON.stringify(ventaRes.data, null, 2));

      // Obtener id_venta de la respuesta
      const id_venta = ventaRes.data.id_venta || ventaRes.data.data?.id_venta;

      if (!id_venta) {
        throw new Error("No se pudo obtener el ID de la venta creada.");
      }

      // 2. Crear cada detalle con el id_venta recibido
      for (const d of detalles) {
        const detalleRes = await axios.post(`${import.meta.env.VITE_API_URL}/ventaDetalles`, {
          id_venta,
          id_articulo: Number(d.id_articulo),
          cantidad: Number(d.cantidad),
          monto_total_articulo: 0 // o calcula si tienes lógica
        });
        console.log("Detalle creado:", detalleRes.data);
      }

      setMensaje("✅ Venta registrada con éxito.");
      setDetalles([{ id_articulo: "", cantidad: "" }]);
    } catch (err) {
      console.error(err);
      setMensaje(err.response?.data?.error || "Error al registrar venta.");
    }
  };

  return (
    <section className="bg-white text-gray-900 py-16 px-6 md:px-20 flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-bold">Registrar <span className="text-pink-600">Venta</span></h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-4">
        {detalles.map((d, i) => (
          <div key={i} className="flex gap-2">
            <select
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-pink-500"
              value={d.id_articulo}
              onChange={e => handleDetalleChange(i, "id_articulo", e.target.value)}
              required
            >
              <option value="">-- Seleccionar artículo --</option>
              {articulos.map(a =>
                <option key={a.id_articulo} value={a.id_articulo}>
                  {a.descripcion} (Stock: {a.inventario_maximo})
                </option>
              )}
            </select>
            <input
              type="number"
              className="w-32 border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-pink-500"
              placeholder="Cantidad"
              min="1"
              value={d.cantidad}
              onChange={e => handleDetalleChange(i, "cantidad", e.target.value)}
              required
            />
            {detalles.length > 1 && (
              <button type="button" onClick={() => removerLinea(i)} className="text-red-500">✖️</button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={agregarLinea}
          className="self-start text-pink-600 hover:underline"
        >
          + Agregar línea
        </button>

        <button
          type="submit"
          className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Registrar Venta
        </button>

        {mensaje && <div className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded">{mensaje}</div>}
      </form>
    </section>
  );
};

export default VentaForm;
