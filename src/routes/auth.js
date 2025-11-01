const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuarios = require("../models/Usuarios");

router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuarios.findOne({ where: { email } });
    if (!usuario) return res.status(401).json({ error: "Usuario no encontrado" });

    /*const passValida = await bcrypt.compare(password, usuario.password);
    if (!passValida) return res.status(401).json({ error: "Contraseña incorrecta" });*/

    const token = jwt.sign(
      { id: usuario.id_usuario, username: usuario.username, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: { id: usuario.id_usuario, username: usuario.username, rol: usuario.rol }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el login" });
  }
});

module.exports = router;
