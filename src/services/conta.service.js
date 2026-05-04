const Cliente = require('../models/cliente.model');

const getSaldo = async (id) => {
  const cliente = await Cliente.findByPk(id);
  return cliente ? cliente.saldo : null;
};

const atualizarSaldo = async (id, valor) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) return null;

  cliente.saldo = Number(cliente.saldo) + Number(valor);
  await cliente.save();
  return cliente.saldo;
};

module.exports = { getSaldo, atualizarSaldo };