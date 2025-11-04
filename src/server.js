const express = require('express');
const cors = require('cors');

const pacientesRouter = require('./routes/pacientes');
const consultasRouter = require('./routes/consultas');
const evolucionesRouter = require('./routes/evoluciones');
const anemiasRouter = require('./routes/anemias');
const laboratoriosRouter = require('./routes/laboratorios');
const usuariosRouter = require('./routes/usuarios');
const authRoutes = require("./routes/auth");
const iaRouter = require("./routes/ia");

const server = express();

// Middleware
server.use(express.json());
server.use(cors({
  origin: '*', // temporal para pruebas, luego poner tu frontend
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// Rutas
server.use('/api/pacientes', pacientesRouter);
server.use('/api/consultas', consultasRouter);
server.use('/api/evoluciones', evolucionesRouter);
server.use('/api/anemias', anemiasRouter);
server.use('/api/laboratorios', laboratoriosRouter);
server.use('/api/usuarios', usuariosRouter);
server.use('/api/auth', authRoutes);
server.use('/api/ia', iaRouter);

module.exports = server;
