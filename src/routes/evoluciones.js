const express = require('express');
const router = express.Router();
const Evoluciones = require('../models/Evoluciones');
const { verifyToken, verifyRole } = require("../middlewares/auth");

// GET todas las evoluciones
router.get('/', verifyToken, async (req, res) => {
  try {
    const evoluciones = await Evoluciones.findAll();
    res.json(evoluciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los evoluciones' });
  }
});

// GET una evolucion por ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const evolucion = await Evoluciones.findByPk(req.params.id);
    if (!evolucion) return res.status(404).json({ error: 'Evolucion no encontrada' });
    res.json(evolucion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la evolucion' });
  }
});

// POST crear una nueva evolucion
router.post('/', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const evolucion = await Evoluciones.create(req.body);
    res.status(201).json(evolucion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la evolucion' });
  }
});

// PUT actualizar una evolucion
router.put('/:id', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const evolucion = await Evoluciones.findByPk(req.params.id);
    if (!evolucion) return res.status(404).json({ error: 'Evolucion no encontrada' });

    await evolucion.update(req.body);
    res.json(evolucion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la evolucion' });
  }
});

// DELETE una evolucion
router.delete('/:id', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const evolucion = await Evoluciones.findByPk(req.params.id);
    if (!evolucion) return res.status(404).json({ error: 'Evolucion no encontrada' });

    await evolucion.destroy();
    res.json({ message: 'Evolucion eliminada', evolucion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la evolucion' });
  }
});

module.exports = router;
