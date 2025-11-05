const { DataTypes } = require('sequelize')
const database = require("../db");

const Resumenes = database.define(
  "Resumenes",
  {
    id_resumen: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      id_paciente: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Pacientes',
          key: 'id_paciente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      origin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        field: 'updated_at'
      },
      evoluciones: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      consultas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      resumen: {
        type: DataTypes.STRING(3000),
        allowNull: true,
      },
    },
    {
      tableName: 'Resumenes',
      schema: 'public',
      timestamps: true,
    }
  );

  Resumenes.associate = (models) => {
    Resumenes.belongsTo(models.Paciente, {
      foreignKey: 'id_paciente',
      targetKey: 'id_paciente',
      as: 'paciente',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

module.exports = Resumenes;

