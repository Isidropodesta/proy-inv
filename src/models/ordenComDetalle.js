const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ordenComDetalle = sequelize.define(
  "ordenComDetalle",
  {
    nroDetalle: { type: DataTypes.INTEGER, primaryKey: true },
    cantidad: DataTypes.INTEGER,
    montoTotalArticulo: DataTypes.FLOAT,
  },
  {
    tableName: "orden_compra_detalles",
    timestamps: false,
  }
);

module.exports = ordenComDetalle;
