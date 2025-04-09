const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Módulo para trabalhar com arquivos

const app = express();
const port = 3000;
const filePath = 'pedido.json'; // Nome do arquivo JSON

app.use(cors());
app.use(express.json());

//Função para ler o pedido do arquivo JSON
function lerPedido(){
   try{
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data); 
   } catch (err){
     return []; // Retorna um array vazio se o arquivo não existir ou ocorrer um erro
   }
}

//Função para escrever o pedido no arquivo JSON
function escreverPedido(pedido){
    fs.writeFileSync(filePath, JSON.stringify(pedido, null, 2));
}

// Rota para adicionar e visualizar o pedido
app.route('/pedido')
    .post(function (req,res){
        const item = req.body.item;
        const quantidade = req.body.quantidade;

        if(!item || !quantidade){
            return res.status(400).json({ erro: 'Precisa enviar item e quantidade'});
        }

        const pedido = lerPedido();
        pedido.push({ item, quantidade });
        escreverPedido(pedido);
        res.status(201).json({ mensagem: 'Item adicionado'});
    })
    .get(function (req, res){
        const pedido = lerPedido();
        if(pedido.length === 0){
            return res.status(200).json({ mensagem: 'Pedido vazio'});
        }
        res.json(pedido);
    });

// Rota para excluir um item do pedido
app.delete('/pedido/:index', function (req, res){
    const index = req.params.index;
    const pedido = lerPedido();

    if(index < 0 || index >= pedido.length){
        return res.status(404).json({ erro: 'Item não encontrado'});
    }

    pedido.splice(index, 1);
    escreverPedido(pedido);
    res.json({ mensagem: 'Item excluido'});
});

// Rota para alterar um item do pedido
app.put('/pedido/:index', function (req, res){
    const index = req.params.index;
    const novoItem = req.body.item;
    const novaQuantidade = req.body.item;
    const pedido = lerPedido();

    if(index < 0 || index >= pedido.length){
        return res.status(404).json({ erro: 'Item não encontrado'});
    }

    if(!novoItem || !novaQuantidade){
        return res.status(400).json({ erro: 'Precisa enviar novo item e quantidade'});
    }

    pedido[index] = {item: novoItem, quantidade: novaQuantidade};
    escreverPedido(pedido);
    res.json({ mensagem: 'Item alterado'});
});

//Inicia o servidor
app.listen(port, function(){
    console.log(`Servidor rodando em http://localhost:${port}`);
});