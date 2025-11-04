require("dotenv").config();
const db = require("./src/db");
const server = require("./src/server");
const Pacientes = require("./src/models/Pacientes");
const Consultas = require("./src/models/Consultas");
const Evoluciones = require("./src/models/Evoluciones");
const Anemias = require("./src/models/Anemias");
const Laboratorios = require("./src/models/Laboratorios");
const Usuarios = require("./src/models/Usuarios");
const Turnos = require("./src/models/Turnos");
const Infusiones = require("./src/models/Infusiones");
const Resumenes = require("./src/models/Resumenes");

const PORT = process.env.PORT || 3001;

(async () => {
  try {
    // Verificar conexión antes de sincronizar
    await db.authenticate();
    console.log("Conexión a la base de datos verificada");

    // Sincronizar ambos modelos
    await Promise.all([
      Pacientes.sync(), // sincroniza tabla Pacientes
      Consultas.sync(), // sincroniza tabla Consultas
      Evoluciones.sync(),
      Anemias.sync(),
      Laboratorios.sync(),
      Usuarios.sync(),
      Turnos.sync(),
      Infusiones.sync(),
      Resumenes.sync(),
    ]);

    console.log("Todos los modelos sincronizados");

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();
