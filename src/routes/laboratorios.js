const express = require('express');
const router = express.Router();
const Laboratorios = require('../models/Laboratorios');
const { verifyToken, verifyRole } = require("../middlewares/auth");

// GET todos los laboratorios
router.get('/', verifyToken, async (req, res) => {
  try {
    const laboratorios = await Laboratorios.findAll();
    res.json(laboratorios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los laboratorios' });
  }
});

// GET un laboratorio por ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const laboratorio = await Laboratorios.findByPk(req.params.id);
    if (!laboratorio) return res.status(404).json({ error: 'Laboratorio no encontrado' });
    res.json(laboratorio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el paciente' });
  }
});

// POST crear un nuevo laboratorio
router.post('/', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const laboratorio = await Laboratorios.create(req.body);
    res.status(201).json(laboratorio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el laboratorio' });
  }
});

// PUT actualizar un laboratorio
router.put('/:id', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const laboratorio = await Laboratorios.findByPk(req.params.id);
    if (!laboratorio) return res.status(404).json({ error: 'Laboratorio no encontrado' });

    await laboratorio.update(req.body);
    res.json(laboratorio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el laboratorio' });
  }
});

// DELETE un laboratorio
router.delete('/:id', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const laboratorio = await Laboratorios.findByPk(req.params.id);
    if (!laboratorio) return res.status(404).json({ error: 'Laboratorio no encontrado' });

    await laboratorio.destroy();
    res.json({ message: 'Laboratorio eliminado', laboratorio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el laboratorio' });
  }
});

module.exports = router;
