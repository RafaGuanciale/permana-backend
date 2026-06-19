const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Autorização necessária" });
  }

  const token = authorization.split(" ")[1];
  let tokenVerified;

  try {
    tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).send({ message: "Autorização necessária" });
  }

  req.user = tokenVerified;
  next();
}

module.exports = { authMiddleware };
