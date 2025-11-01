const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Esperamos el header "Authorization: Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardamos info del usuario en la request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}

function verifyRole(role) {
  return (req, res, next) => {
    if (req.user.rol !== role) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
  };
}

module.exports = { verifyToken, verifyRole };