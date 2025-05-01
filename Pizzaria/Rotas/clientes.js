const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

router.post('/', controller.criarCliente);
router.get('/', controller.listarClientes);
router.get('/buscar', controller.buscarCliente);
router.put('/:id', controller.atualizarCliente);
router.delete('/:id', controller.desativarCliente);

module.exports = router;
