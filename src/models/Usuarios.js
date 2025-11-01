const { DataTypes } = require("sequelize");
const database = require("../db");

const Usuarios = database.define("Usuarios", {
  id_usuario: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("admin", "usuario", "invitado"),
    defaultValue: "invitado",
  },
});

module.exports = Usuarios;
