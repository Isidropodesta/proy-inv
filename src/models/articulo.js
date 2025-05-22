const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const articulo = sequelize.define(
  "articulo",
  {
    codigo: { type: DataTypes.INTEGER, primaryKey: true },
    descripcion: DataTypes.STRING,
    demanda: DataTypes.INTEGER,
    costoAlmacenamiento: DataTypes.FLOAT,
    loteOptimo: DataTypes.INTEGER,
    puntoPedido: DataTypes.INTEGER,
    stockSeguridad: DataTypes.INTEGER,
    inventarioMaximo: DataTypes.INTEGER,
    costoCompra: DataTypes.FLOAT,
    articuloVigente: DataTypes.BOOLEAN,
    fechaBaja: DataTypes.DATE,
  },
  {
    tableName: "articulos",
    timestamps: false,
  }
);
module.exports = articulo;
