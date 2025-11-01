const express = require('express');
const router = express.Router();
const Turnos = require('../models/Turnos');
const { verifyToken, verifyRole } = require("../middlewares/auth");

// GET todos los turnos
router.get('/', verifyToken, async (req, res) => {
  try {
    const turnos = await Turnos.findAll();
    res.json(turnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los turnos' });
  }
});

// GET un turno por ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const turno = await Turnos.findByPk(req.params.id_turno);
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });
    res.json(turno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el turno' });
  }
});

// POST crear un nuevo turno
router.post('/', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const turno = await Turnos.create(req.body);
    res.status(201).json(turno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el turno' });
  }
});

// PUT actualizar un turno
router.put('/:id', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const turno = await Turnos.findByPk(req.params.id_turno);
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });

    await turno.update(req.body);
    res.json(turno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el turno' });
  }
});

// DELETE un turno
router.delete('/:id', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const turno = await Turnos.findByPk(req.params.id_turno);
    if (!turno) return res.status(404).json({ error: 'Turno no encontrado' });

    await turno.destroy();
    res.json({ message: 'Usuario eliminado', turno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el turno' });
  }
});

module.exports = router;
