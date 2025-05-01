const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.use('/clientes', require('./Rotas/clientes'));
app.use('/pizzas', require('./Rotas/pizzas'));
app.use('/pedidos', require('./Rotas/pedidos'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
