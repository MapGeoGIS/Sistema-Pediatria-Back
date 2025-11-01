const express = require('express');
const router = express.Router();
const Consultas = require('../models/Consultas');
const { verifyToken, verifyRole } = require("../middlewares/auth");

// GET todas las consultas
router.get('/', verifyToken, async (req, res) => {
  try {
    const consultas = await Consultas.findAll();
    res.json(consultas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las consultas' });
  }
});

// GET un consultas por ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const consultas = await Consultas.findByPk(req.params.id);
    if (!consultas) return res.status(404).json({ error: 'consultas no encontrado' });
    res.json(consultas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el consultas' });
  }
});

// POST crear un nuevo consultas
router.post('/', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const consultas = await Consultas.create(req.body);
    res.status(201).json(consultas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el consultas' });
  }
});

// PUT actualizar un consultas
router.put('/:id', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const consultas = await Consultas.findByPk(req.params.id);
    if (!consultas) return res.status(404).json({ error: 'consultas no encontrado' });

    await consultas.update(req.body);
    res.json(consultas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el consultas' });
  }
});

// DELETE un consultas
router.delete('/:id', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const consultas = await Consultas.findByPk(req.params.id);
    if (!consultas) return res.status(404).json({ error: 'consultas no encontrado' });

    await consultas.destroy();
    res.json({ message: 'consultas eliminado', consultas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el consultas' });
  }
});

module.exports = router;
