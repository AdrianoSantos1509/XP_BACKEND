const Cliente = require('../models/cliente.model');

const contaController = {
  // 1. Consultar Saldo
  getSaldo: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id, {
        attributes: ['nome', 'saldo']
      });

      if (!cliente) {
        return res.status(404).json({ message: 'Conta não encontrada' });
      }

      return res.status(200).json({ 
        nome: cliente.nome,
        saldo: cliente.saldo 
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar saldo', error: error.message });
    }
  },

  // 2. Realizar Depósito
  deposito: async (req, res) => {
    try {
      const { codCliente, valor } = req.body;

      // Mensagem corrigida para 'depósito'
      if (valor <= 0) {
        return res.status(400).json({ message: 'O valor do depósito deve ser maior que zero' });
      }

      const cliente = await Cliente.findByPk(codCliente);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      cliente.saldo = Number(cliente.saldo) + Number(valor);
      await cliente.save();

      return res.status(200).json({ 
        message: 'Depósito realizado com sucesso', 
        novoSaldo: cliente.saldo 
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao processar depósito', error: error.message });
    }
  },

  // 3. Realizar Saque
  saque: async (req, res) => {
    try {
      const { codCliente, valor } = req.body;

      // Validação de valor adicionada no saque
      if (valor <= 0) {
        return res.status(400).json({ message: 'O valor do saque deve ser maior que zero' });
      }

      const cliente = await Cliente.findByPk(codCliente);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      if (cliente.saldo < valor) {
        return res.status(400).json({ message: 'Saldo insuficiente para esta operação' });
      }

      cliente.saldo = Number(cliente.saldo) - Number(valor);
      await cliente.save();

      return res.status(200).json({ 
        message: 'Saque realizado com sucesso', 
        novoSaldo: cliente.saldo 
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao processar saque', error: error.message });
    }
  }
};

module.exports = contaController;