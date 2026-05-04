const jwtUtil = require('../utils/jwt')

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  const user = jwtUtil.validateToken(authorization);

  if (!user) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }

  req.user = user;
  next();
};

module.exports = authMiddleware;