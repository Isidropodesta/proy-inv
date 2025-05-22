const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const venta = sequelize.define(
  "venta",
  {
    nroVenta: { type: DataTypes.INTEGER, primaryKey: true },
    fechaVenta: DataTypes.DATE,
    montoTotalVenta: DataTypes.FLOAT,
  },
  {
    tableName: "ventas",
    timestamps: false,
  }
);

module.exports = venta;
