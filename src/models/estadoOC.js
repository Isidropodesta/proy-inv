const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const estadoOC = sequelize.define(
  "estadoOC",
  {
    codigoEstado: { type: DataTypes.INTEGER, primaryKey: true },
    nombreEstado: DataTypes.STRING,
  },
  {
    tableName: "estado_orden_compras",
    timestamps: false,
  }
);

module.exports = estadoOC;
