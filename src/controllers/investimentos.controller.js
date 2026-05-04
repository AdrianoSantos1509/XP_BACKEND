const Investimento = require('../models/investimento.model');
const Cliente = require('../models/cliente.model');
const Ativo = require('../models/ativo.model');

const investimentosController = {
  // 1. Comprar um Ativo
  comprarAtivo: async (req, res) => {
    try {
      const { codCliente, codAtivo, qtdeAtivo } = req.body;

      const ativo = await Ativo.findByPk(codAtivo);
      if (!ativo) return res.status(404).json({ message: 'Ativo não encontrado' });

      const valorTotal = ativo.valor * qtdeAtivo;

      const cliente = await Cliente.findByPk(codCliente);
      if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado' });

      if (cliente.saldo < valorTotal) {
        return res.status(400).json({ message: 'Saldo insuficiente para compra' });
      }

      cliente.saldo = Number(cliente.saldo) - valorTotal;
      await cliente.save();

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

      return res.status(200).json({ message: 'Compra realizada com sucesso', investimento });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao comprar ativo', error: error.message });
    }
  },

  // 2. Vender um Ativo
  venderAtivo: async (req, res) => {
    try {
      const { codCliente, codAtivo, qtdeAtivo } = req.body;

      // debug
      console.log('Dados recebidos:', { codCliente, codAtivo, qtdeAtivo });

      const investimento = await Investimento.findOne({
        where: { cod_cliente: codCliente, cod_ativo: codAtivo }
      });

      // debug
      console.log('Investimento encontrado:', investimento);

      if (!investimento || investimento.qtdeAtivo < qtdeAtivo) {
        return res.status(400).json({ message: 'Quantidade insuficiente de ativos na carteira' });
      }

      const ativo = await Ativo.findByPk(codAtivo);
      const valorVenda = ativo.valor * qtdeAtivo;

      investimento.qtdeAtivo -= qtdeAtivo;
      if (investimento.qtdeAtivo === 0) {
        await investimento.destroy();
      } else {
        await investimento.save();
      }

      const cliente = await Cliente.findByPk(codCliente);
      cliente.saldo = Number(cliente.saldo) + valorVenda;
      await cliente.save();

      return res.status(200).json({ message: 'Venda realizada com sucesso', novoSaldo: cliente.saldo });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao vender ativo', error: error.message });
    }
  },

  // 3. Consultar ativos por Cliente
  getCarteiraPorCliente: async (req, res) => {
    try {
      const { id } = req.params;
      const carteira = await Investimento.findAll({
        where: { cod_cliente: id },
        include: [{ model: Ativo, attributes: ['codAtivo', 'nomeAtivo', 'valor'] }]
      });
      return res.status(200).json(carteira);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar carteira', error: error.message });
    }
  }
};

module.exports = investimentosController;