require("dotenv").config();
const { Sequelize } = require("sequelize");
const { BDD, DB_USER, DB_PASS, DB_PORT, DB_HOST } = process.env;

const database = new Sequelize(BDD, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

// Verificar la conexión
database.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = database;