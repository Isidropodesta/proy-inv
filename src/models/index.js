const sequelize = require("../config/db");

// Importar modelos
const Articulo = require("./articulo");
const Venta = require("./venta");
const VentaDetalle = require("./VentaDetalle");
// ... los demás

// Definir relaciones aquí
Articulo.hasMany(VentaDetalle, { foreignKey: "codigoArticulo" });
VentaDetalle.belongsTo(Articulo, { foreignKey: "codigoArticulo" });

// Exportar
module.exports = {
  sequelize,
  Articulo,
  Venta,
  VentaDetalle,
  // ...
};
