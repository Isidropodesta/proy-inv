import React from "react";
import Header from "./assets/components/Header/header.jsx";
import Hero from "./assets/components/Hero/hero.jsx";
import Footer from "./assets/components/Footer/footer.jsx";
import OrdenDeCompra from "./assets/components/Orden-compra/orden-compra.jsx";
import Ventas from "./assets/components/Ventas/ventas.jsx";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <OrdenDeCompra/>
      <Ventas/>
      <Footer />
    </div>
  );
}

export default App;
