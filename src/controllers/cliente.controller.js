const Cliente = require('../models/cliente.model');
const jwtUtil = require('../utils/jwt');

const clienteController = {
  // 1. Criar um novo cliente (Cadastro)
  create: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;
      
      const novoCliente = await Cliente.create({ 
        nome, 
        email, 
        senha, 
        saldo: 0 
      });

      return res.status(201).json(novoCliente);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
    }
  },

  // 2. Listar todos os clientes
  findAll: async (_req, res) => {
    try {
      const clientes = await Cliente.findAll({
        attributes: { exclude: ['senha'] }
      });
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
    }
  },

  // 3. Buscar cliente por ID
  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id, {
        attributes: { exclude: ['senha'] }
      });

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
    }
  },

  // 4. Login
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const cliente = await Cliente.findOne({ where: { email } });
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      if (cliente.senha !== senha) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      const token = jwtUtil.generateToken({ id: cliente.id, email: cliente.email });

      return res.status(200).json({ 
        token, 
        cliente: { 
          id: cliente.id, 
          nome: cliente.nome, 
          email: cliente.email 
        } 
      });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }
  }
};

module.exports = clienteController;