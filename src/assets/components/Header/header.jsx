import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-100 text-black shadow-md w-full py-4">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo y nombre */}
        <div className="flex items-center gap-3">
      
          <h1 className="text-2xl font-bold text-pink-500">iManaging</h1>
        </div>

        {/* Navegación */}
        <nav className="hidden md:flex gap-6 text-lg">
          <a href="#hero" className="hover:text-pink-400 transition-colors">
            Articulos
          </a>
          <a href="#orden-compra" className="hover:text-pink-400 transition-colors">
            Orden de Compra
          </a>
          <a href="#ventas" className="hover:text-pink-400 transition-colors">
            Ventas
          </a>
          <a href="#footer" className="hover:text-pink-400 transition-colors">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;