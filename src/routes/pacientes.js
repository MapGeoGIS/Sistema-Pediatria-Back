const express = require("express");
const router = express.Router();
const Pacientes = require("../models/Pacientes");
const { verifyToken, verifyRole } = require("../middlewares/auth");

// GET todos los pacientes (admin y user)
router.get("/", verifyToken, async (req, res) => {
  try {
    const pacientes = await Pacientes.findAll({ order: [["apellido", "ASC"]] });
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener pacientes" });
  }
});

// GET un paciente por ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const paciente = await Pacientes.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener paciente" });
  }
});

// POST crear paciente (solo admin)
router.post("/", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const paciente = await Pacientes.create(req.body);
    res.status(201).json(paciente);
  } catch (err) {
    res.status(500).json({ error: "Error al crear paciente" });
  }
});

// PUT actualizar paciente (solo admin)
router.put("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const paciente = await Pacientes.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });

    await paciente.update(req.body);
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar paciente" });
  }
});

// DELETE paciente (solo admin)
router.delete("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const paciente = await Pacientes.findByPk(req.params.id);
    if (!paciente) return res.status(404).json({ error: "Paciente no encontrado" });

    await paciente.destroy();
    res.json({ message: "Paciente eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar paciente" });
  }
});

module.exports = router;
