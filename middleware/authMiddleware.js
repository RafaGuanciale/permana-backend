const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Usuário ou senha inválidos" });
    }
    const tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenVerified) {
      req.user = tokenVerified;
      next();
    }
  } catch {
    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  }
}

module.exports = { authMiddleware };
