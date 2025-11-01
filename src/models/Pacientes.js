const { DataTypes } = require("sequelize");
const database = require("../db");

const Pacientes = database.define(
  "Pacientes",
  {
    id_paciente: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    origin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nac: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    edad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    localidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    obra_social: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    afiliado_nro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono_numero: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    especialidad: {
      type: DataTypes.ENUM("Hematológico", "Pediátrico", "General"),
      allowNull: false,
    },
    diagnostico: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enfermedad_base: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ant_perinatales: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ant_familiares: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    usuario_registro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_reg: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Pacientes;
