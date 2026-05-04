const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' }); //  caminho corrigido
const sequelize = require('./config/database');

const clienteRoute = require('./routes/cliente.route');
const contaRoute = require('./routes/conta.route');
const investimentoRoute = require('./routes/investimentos.route');
const errorMiddleware = require('./middlewares/error.middleware');
const ativoRoute = require('./routes/ativo.route'); //  adicionar

const app = express();
app.use(cors());
app.use(express.json());

app.use('/clientes', clienteRoute);
app.use('/conta', contaRoute);
app.use('/investimentos', investimentoRoute);
app.use('/ativos', ativoRoute); //  adicionar

app.use(errorMiddleware);

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error.message);
  }
};

start();
