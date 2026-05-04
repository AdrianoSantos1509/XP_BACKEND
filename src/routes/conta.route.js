const express = require('express')
const contaController = require('../controllers/conta.controller')

const router = express.Router()

router.get('/:id/saldo', contaController.getSaldo)
router.post('/deposito', contaController.deposito)
router.post('/saque', contaController.saque)

module.exports = router