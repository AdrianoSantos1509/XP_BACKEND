const { expect } = require('chai');
const sinon = require('sinon');
const Cliente = require('../../../models/cliente.model'); // ✅ importação corrigida
const contaService = require('../../../services/conta.service');

describe('Testes de Unidade: Conta Service', () => {
  afterEach(() => sinon.restore());

  it('Deve atualizar o saldo corretamente no depósito', async () => {
    // Simulando um cliente que já tem 100 reais
    const clienteFake = { id: 1, saldo: 100, save: sinon.stub().resolves() };
    sinon.stub(Cliente, 'findByPk').resolves(clienteFake);

    const novoSaldo = await contaService.atualizarSaldo(1, 50); // Depositando 50

    expect(novoSaldo).to.be.equal(150);
    expect(clienteFake.save.calledOnce).to.be.true;
  });
});