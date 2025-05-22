import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto text-center">
        <p>© 2025 StockPro. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-white">
            Twitter
          </a>
          <a href="#" className="hover:text-white">
            LinkedIn
          </a>
          <a href="#" className="hover:text-white">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
