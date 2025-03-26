const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

// Para guardar os intens do pedido.+
let  pedido = [];

// Rota para adicionar e ver o pedido

app.route('/pedido')
.post(function(req, res){
    const item = req.body.item;
    const quantidade = req.body.quantidade;

    // Validação básica dos dados
    if(!item || !quantidade){
        res.status(400).json({ erro: 'Precisa enviar item e quantidade'});
        return;
    }

    //Adicionar o item ao pedido
    pedido.push({item, quantidade});
    res.status(201).json({mensagem: 'Item adicionado'});
})

.get(function(req, res){
    if(pedido.length === 0){
        res.status(200).json({mensagem: 'Pedido vazio'});
        return;
    }
    res.json(pedido)
});

// Inicia servidor
app.listen(port, function(){
    console.log(`Servidor rodando em http://localhost:${port}`);
});