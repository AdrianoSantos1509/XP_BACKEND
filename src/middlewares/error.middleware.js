const errorMiddleware = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Erro inesperado. Tente novamente mais tarde.';

  console.error(`[ERRO]: ${message}`);

  return res.status(status).json({ message });
};

module.exports = errorMiddleware;