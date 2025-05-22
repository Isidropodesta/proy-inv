import React from "react";
import Header from "./assets/components/Header/header";
import Footer from "./assets/components/Footer/footer";

export default function App() {
  return (
    <>
      <Header />
      {/* Aquí va tu contenido principal */}
      <main className="container mx-auto p-6">
        <h2 className="text-xl font-semibold">Bienvenido a StockPro</h2>
      </main>
      <Footer />
    </>
  );
}

