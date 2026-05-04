const Investimento = require('../models/investimento.model');
const Ativo = require('../models/ativo.model');
const Cliente = require('../models/cliente.model');

const comprar = async (codCliente, codAtivo, qtdeAtivo) => {
  const ativo = await Ativo.findByPk(codAtivo);
  if (!ativo) throw new Error('Ativo não encontrado');

  const valorTotal = ativo.valor * qtdeAtivo;

  const [investimento, created] = await Investimento.findOrCreate({
    where: { cod_cliente: codCliente, cod_ativo: codAtivo },
    defaults: { qtdeAtivo: 0, valorMedio: ativo.valor }
  });

  if (!created) {
    const novaQtde = investimento.qtdeAtivo + qtdeAtivo;
    investimento.valorMedio = ((Number(investimento.valorMedio) * investimento.qtdeAtivo) + valorTotal) / novaQtde;
    investimento.qtdeAtivo = novaQtde;
  } else {
    investimento.qtdeAtivo = qtdeAtivo;
  }

  await investimento.save();
  return investimento;
};

const vender = async (codCliente, codAtivo, qtdeAtivo) => {
  const investimento = await Investimento.findOne({
    where: { cod_cliente: codCliente, cod_ativo: codAtivo }
  });

  if (!investimento || investimento.qtdeAtivo < qtdeAtivo) {
    throw new Error('Quantidade insuficiente');
  }

  investimento.qtdeAtivo -= qtdeAtivo;
  if (investimento.qtdeAtivo === 0) {
    await investimento.destroy();
  } else {
    await investimento.save();
  }
  // return adicionado
  return true;
}; // chave fechando a função vender

module.exports = { comprar, vender };