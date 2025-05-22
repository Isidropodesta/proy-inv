const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ordenCompra = sequelize.define(
  "ordenCompra",
  {
    nroOrdenCompra: { type: DataTypes.INTEGER, primaryKey: true },
    fechaOrdenCompra: DataTypes.DATE,
    montoTotal: DataTypes.FLOAT,
  },
  {
    tableName: "orden_compras",
    timestamps: false,
  }
);

module.exports = ordenCompra;
