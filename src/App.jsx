import React, { useEffect } from "react";
import Header from "./assets/components/Header/header.jsx";
import Hero from "./assets/components/Hero/hero.jsx";
import Footer from "./assets/components/Footer/footer.jsx";
import OrdenDeCompra from "./assets/components/Orden-compra/orden-compra.jsx";
import Ventas from "./assets/components/Ventas/ventas.jsx";
import Proveedor from "./assets/components/Proveedores/proveedores.jsx";

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/saludo`)
      .then((res) => res.json())
      .then((data) => console.log("Respuesta del backend:", data))
      .catch((err) => console.error("Error al conectar con el backend:", err));
  }, []);

  return (
    <div>
      <Header />
      <Proveedor />
      <Hero />
      <OrdenDeCompra />
      <Ventas />
      <Footer />
    </div>
  );
}

export default App;
