const { expect } = require('chai');
const sinon = require('sinon');
const Investimento = require('../../../models/investimento.model'); // ✅ importação corrigida
const Ativo = require('../../../models/ativo.model'); // ✅ importação corrigida
const investimentoService = require('../../../services/investimentos.service'); // ✅ nome corrigido

describe('Testes de Unidade: Investimento Service', () => {
  afterEach(() => sinon.restore());

  it('Deve realizar a compra de um ativo', async () => {
    const ativoFake = { id: 1, valor: 10 };
    const investimentoFake = { qtdeAtivo: 0, save: sinon.stub().resolves() };

    sinon.stub(Ativo, 'findByPk').resolves(ativoFake);
    // Simulando que o ativo não existia na carteira (created: true)
    sinon.stub(Investimento, 'findOrCreate').resolves([investimentoFake, true]);

    const resultado = await investimentoService.comprar(1, 1, 5);

    expect(resultado.qtdeAtivo).to.be.equal(5);
    expect(investimentoFake.save.calledOnce).to.be.true;
  });
});