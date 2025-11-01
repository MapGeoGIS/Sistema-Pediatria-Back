const server = require("./src/server");
const Pacientes = require("./src/models/Pacientes");
const Consultas = require("./src/models/Consultas");
const Evoluciones = require("./src/models/Evoluciones");
const Anemias = require("./src/models/Anemias");
const Laboratorios = require("./src/models/Laboratorios");
const Usuarios = require("./src/models/Usuarios");
const Turnos = require("./src/models/Turnos");
const Infusiones = require("./src/models/Infusiones");

const PORT = process.env.PORT || 3001;

(async () => {
  try {
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
    ]);

    console.log("Todos los modelos sincronizados");

    server.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
})();
