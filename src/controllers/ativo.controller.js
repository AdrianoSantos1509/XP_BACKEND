const Ativo = require('../models/ativo.model');

const ativoController = {
  findAll: async (_req, res) => {
    try {
      const ativos = await Ativo.findAll();
      return res.status(200).json(ativos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar ativos', error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const ativo = await Ativo.findByPk(id);
      if (!ativo) {
        return res.status(404).json({ message: 'Ativo não encontrado' });
      }
      return res.status(200).json(ativo);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar ativo', error: error.message });
    }
  },

  // adicionado
  create: async (req, res) => {
    try {
      const { codAtivo, nomeAtivo, qtdeAtivo, valor } = req.body;
      const novoAtivo = await Ativo.create({ codAtivo, nomeAtivo, qtdeAtivo, valor });
      return res.status(201).json(novoAtivo);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar ativo', error: error.message });
    }
  }
};

module.exports = ativoController;