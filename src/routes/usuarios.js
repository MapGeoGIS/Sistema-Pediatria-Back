const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Usuarios = require("../models/Usuarios");
const { verifyToken, verifyRole } = require("../middlewares/auth");

// GET todos los usuarios (solo admin)
router.get("/", verifyToken, async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll({ attributes: { exclude: ["password"] } });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// GET emails permitidos
router.get("/allowed-emails", async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll({
      attributes: ["email"], // solo el email
    });
    const allowedEmails = usuarios.map(u => u.email);
    res.json({ allowedEmails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener emails" });
  }
});

// GET un usuario por ID (solo admin)
router.get("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.params.id, { attributes: { exclude: ["password"] } });
    if (!usuario) return res.status(404).json({ error: "Tu cuenta no tiene permisos para acceder al sistema!" });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

// POST crear un usuario (solo admin)
router.post("/", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const { email, username, password, rol } = req.body;
    if (!email || !username || !password || !rol)
      return res.status(400).json({ error: "Faltan datos" });

    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuarios.create({ email, username, password: hash, rol });

    const { password: _, ...usuarioSinPass } = nuevoUsuario.toJSON();
    res.status(201).json(usuarioSinPass);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

// PUT actualizar usuario (solo admin)
router.put("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await usuario.update(req.body);
    const { password: _, ...usuarioSinPass } = usuario.toJSON();
    res.json(usuarioSinPass);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

// DELETE usuario (solo admin)
router.delete("/:id", verifyToken, verifyRole("admin"), async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    await usuario.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

module.exports = router;
