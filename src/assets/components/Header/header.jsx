import React from "react";

const Header = () => {
  return (
    <header className="bg-black text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo y nombre */}
        <div className="flex items-center gap-3">
          <img
            src="/images/Logo.jpeg"
            alt="iManaging Logo"
            className="h-20 w-30 object-cover rounded-full"
          />
          <h1 className="text-2xl font-bold text-pink-500">iManaging</h1>
        </div>

        {/* Navegación */}
        <nav className="hidden md:flex gap-6 text-lg">
          <a href="#" className="hover:text-pink-400 transition-colors">
            Inicio
          </a>
          <a href="#" className="hover:text-pink-400 transition-colors">
            Productos
          </a>
          <a href="#" className="hover:text-pink-400 transition-colors">
            Reportes
          </a>
          <a href="#" className="hover:text-pink-400 transition-colors">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
