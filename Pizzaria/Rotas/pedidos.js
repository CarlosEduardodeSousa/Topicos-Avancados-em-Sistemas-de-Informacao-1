const express = require('express');
const router = express.Router();
const controller = require('../Controllers/pedidoController');

router.post('/', controller.criarPedido);
router.get('/em-atendimento', controller.pedidosEmAtendimento);
router.get('/entregues', controller.pedidosEntregues);
router.get('/cliente/:id', controller.historicoCliente);

module.exports = router;
