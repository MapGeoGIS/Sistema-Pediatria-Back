const { DataTypes } = require("sequelize");
const database = require("../db");

const Anemias = database.define(
  "Anemias",
  {
    id_anemia: {
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
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dieta: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Dieta rica en hierro',
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plan: {
      type: DataTypes.TEXT,
      allowNull: true,
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
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Anemias;