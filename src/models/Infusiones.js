const { DataTypes } = require("sequelize");
const database = require("../db");

const Infusiones = database.define(
  "Infusiones",
  {
    id_infusion: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    origin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paciente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_infusion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora_infusion: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    cantidad_viales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    evolucion: {
      type: DataTypes.TEXT,
      defaultValue: "No presenta reacciones adversas durante la infusión, parámetros vitales estables pre y post infusión",
      allowNull: false,
    },
    fecha_prox_lab: {
      type: DataTypes.DATEONLY,
      defaultValue: '1900-01-01',
      allowNull: false,
    },
    enfermedad: {
      type: DataTypes.ENUM("Gaucher", "Macrotrombocitopenia"),
      allowNull: false,
    },
    modo_aplicacion: {
      type: DataTypes.STRING,
      defaultValue: "Ev",
      allowNull: true,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dosis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    efectos_adversos: {
      type: DataTypes.STRING,
      defaultValue: "No presenta",
      allowNull: false,
    },
    fecha_control: {
      type: DataTypes.DATEONLY,
      defaultValue: '1900-01-01',
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

module.exports = Infusiones;
