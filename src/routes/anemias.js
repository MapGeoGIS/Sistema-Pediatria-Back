const express = require('express');
const router = express.Router();
const Anemias = require('../models/Anemias');
const { verifyToken, verifyRole } = require("../middlewares/auth");

// GET todas las anemias
router.get('/', verifyToken, async (req, res) => {
  try {
    const anemias = await Anemias.findAll();
    res.json(anemias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los anemias' });
  }
});

// GET una anemia por ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const anemia = await Anemias.findByPk(req.params.id);
    if (!anemia) return res.status(404).json({ error: 'Anemia no encontrada' });
    res.json(anemia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la anemia' });
  }
});

// POST crear una nueva anemia
router.post('/', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const anemia = await Anemias.create(req.body);
    res.status(201).json(anemia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la anemia' });
  }
});

// PUT actualizar una anemia
router.put('/:id', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const anemia = await Anemias.findByPk(req.params.id);
    if (!anemia) return res.status(404).json({ error: 'Anemia no encontrada' });

    await anemia.update(req.body);
    res.json(anemia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la anemia' });
  }
});

// DELETE una anemia
router.delete('/:id', verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const anemia = await Anemias.findByPk(req.params.id);
    if (!anemia) return res.status(404).json({ error: 'Anemia no encontrada' });

    await anemia.destroy();
    res.json({ message: 'Anemia eliminada', anemia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la anemia' });
  }
});

module.exports = router;
