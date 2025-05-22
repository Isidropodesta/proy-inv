const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const articuloProv = sequelize.define(
  "articuloProv",
  {
    costoPedido: DataTypes.FLOAT,
    modeloInventario: DataTypes.STRING,
    proveedorPredeterminado: DataTypes.BOOLEAN,
    demoraEntrega: DataTypes.INTEGER,
    precioUnitario: DataTypes.FLOAT,
  },
  {
    tableName: "articulo_proveedores",
    timestamps: false,
  }
);

module.exports = articuloProv;
