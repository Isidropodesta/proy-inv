const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ventaDetalle = sequelize.define(
  "ventaDetalle",
  {
    nroDetalle: { type: DataTypes.INTEGER, primaryKey: true },
    cantidad: DataTypes.INTEGER,
    montoTotalArticulo: DataTypes.FLOAT,
  },
  {
    tableName: "venta_detalles",
    timestamps: false,
  }
);

module.exports = ventaDetalle;
