const { DataTypes } = require("sequelize");
const database = require("../db");

const Consultas = database.define(
  "Consultas",
  {
    id_consulta: {
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
    fecha_consulta: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    uni_edad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad_anios: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    edad_texto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    talla: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    imc: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    pc: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conducta: {
      type: DataTypes.TEXT,
      allowNull: false,
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

module.exports = Consultas;
