const express = require('express')
const clienteController = require('../controllers/cliente.controller')

const router = express.Router()

router.get('/', clienteController.findAll)
router.post('/', clienteController.create)
router.get('/:id', clienteController.findById)
router.post('/login', clienteController.login) // ✅ adicionado

module.exports = router