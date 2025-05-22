import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold cursor-pointer">StockPro</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="hover:text-gray-300">
                Inicio
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-gray-300">
                Funcionalidades
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-gray-300">
                Precios
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
