const { DataTypes } = require("sequelize");
const database = require("../db");

const Evoluciones = database.define(
  "Evoluciones",
  {
    id_evolucion: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    origin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origin_id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_evolucion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    evolucion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // ✅ agrega fecha actual automáticamente
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Evoluciones;
