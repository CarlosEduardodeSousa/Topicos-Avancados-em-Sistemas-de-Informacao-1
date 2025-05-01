const express = require('express');
const router = express.Router();
const controller = require('../Controllers/pizzaController');

router.post('/', controller.criarPizza);
router.get('/', controller.listarPizzas);
router.put('/:id', controller.atualizarPizza);
router.delete('/:id', controller.desativarPizza);

module.exports = router;
