const { DataTypes } = require("sequelize");
const database = require("../db");

const Turnos = database.define(
  "Turnos",
  {
    id_turno: {
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
    fecha_turno: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_turno: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado_turno: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    forma_pago: {
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
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Turnos;
