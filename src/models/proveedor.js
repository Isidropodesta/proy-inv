const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const proveedor = sequelize.define(
  "proveedor",
  {
    cuit: { type: DataTypes.INTEGER, primaryKey: true },
    razonSocial: DataTypes.STRING,
    telefono: DataTypes.STRING,
    proveedorVigente: DataTypes.BOOLEAN,
    fechaBaja: DataTypes.DATE,
  },
  {
    tableName: "proveedores",
    timestamps: false,
  }
);

module.exports = proveedor;
