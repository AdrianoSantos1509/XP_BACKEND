const express = require('express')
const investimentosController = require('../controllers/investimentos.controller')

const router = express.Router()

router.get('/:id', investimentosController.getCarteiraPorCliente)
router.post('/comprar', investimentosController.comprarAtivo)
router.post('/vender', investimentosController.venderAtivo)

module.exports = router