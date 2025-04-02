const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let pedido = []; // array para mrmazenar os  itens do pedido

// Rota para adicionar e visualizar o pedido

app.route('/pedido')
    .post(function (req, res){
        const item = req.body.item;
        const quantidade = req.body.quantidade;

        if(!item || !quantidade){
            return res.status(400).json({ erro: 'Precisa enviar item e quantidade'});
        }

        pedido.push({ item, quantidade });
        return res.status(201).json({ mensagem: 'Item adicionado'});
    })
    .get(function (req, res){
        if(pedido.length === 0){
            return res.status(200).json({ mensagem: 'Pedido vazio'});
        }
        res.json(pedido);
    });

// Rota para excluir um item do pedido
app.delete('/pedido/:index', function (req, res){
    const index = req.params.index; // Obtém o índice do item a ser excluído

    if(index < 0 || index >= pedido.length){
        return res.status(404).json({ erro: 'Item não encontrado'});
    }

    pedido.splice(index, 1); // Remove o item no array
    res.json({ mensagem: 'Item excluído'});
});

//Rota para alterar um item do pedido
app.put('/pedido/:index', function (req,res){
    const index = req.params.index;
    const novoItem = req.body.item;
    const novaQuantidade = req.body.quantidade;

    if(index < 0 || index >= pedido.length){
        return res.status(404).json({erro: 'Item não encontrado'});
    }

    if(!novoItem || !novaQuantidade){
        return res.status(400).json({erro: 'Precisa enviar novo item e quantidade'});
    }

    pedido[index] = { item: novoItem, quantidade: novaQuantidade}; // Atualiza o item no array
    res.json({ mensagem: 'Item alterado'})
});

// Inicia o servidor
app.listen(port, function(){
    console.log(`Servidor rodando em http://localhost:${port}`);
});