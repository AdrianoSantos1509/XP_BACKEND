const express = require('express');
const ativoController = require('../controllers/ativo.controller');

const router = express.Router();

router.get('/', ativoController.findAll);
router.get('/:id', ativoController.findById);
router.post('/', ativoController.create); // ✅ adicionado

module.exports = router;