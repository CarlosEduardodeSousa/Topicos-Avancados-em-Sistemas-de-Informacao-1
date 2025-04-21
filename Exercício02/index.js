const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuração do banco de dados MySQL
const pool = mysql.createPool({
    host: 'localhost', //Ou o host do seu banco de dados
    user: 'root',
    password: 'root',
    port: 3307,
    database: 'mercado',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Rota para adicionar e visualizar o pedido
app.route('/pedido')

    .post(function (req, res){
        const item = req.body.item;
        const quantidade = req.body.quantidade;
        const preco = req.body.preco;
        if(!item || !quantidade || !preco){
            return res.status(400).json({ erro: 'Precisa enviar item e quantidade'});
        }

        pool.query(
            'INSERT INTO pedidos (item, quantidade, preco) VALUES (?, ?, ?)',
            [item, quantidade, preco],
            function (err, results){
                if (err){
                    console.error(err);
                    return res.status(500).json({ erro: 'Erro ao adicionar item'});
                }
                res.status(201).json({ mensagem: 'Item adicionado'});
            }
        );
    })

    .get(function (req, res){
        pool.query('SELECT * FROM pedidos', function (err, results) {
            if (err){
                console.error(err);
                return res.status(500).json({ erro: 'Erro ao buscar pedidos'});
            }

            if(results.length === 0){
                return res.status(200).json({ mensagem: 'Pedido vazio'});
            }

            res.json(results);
        });
    });

    // Rota para excluir um item do pedido
    app.delete('/pedido/:id', function (req, res){
        const id = req.params.id;

        pool.query('DELETE FROM pedidos WHERE id = ?', [id], function (err, results){
            if (err){
                console.error(err);
                return res.status(500).json({ erro: 'Erro ao excluir item'});
            }

            if (results.affectedRows === 0){
                return res.status(404).json({ erro: 'Item não encontrado'});
            }

            res.json({ mensagem: 'Item excluido' });
        });
    });

    // Rota para alterar um item do pedido
    app.put('/pedido/:id', function (req, res){
        const id = req.params.id;
        const novoItem = req.body.item;
        const novaQuantidade = req.body.quantidade;
        const novoPreco = req.body.preco;

        if(!novoItem || !novaQuantidade || !novoPreco){
            return res.status(400).json({ erro: 'Precisa enviar novo item e quantidade'});
        }

        pool.query(
            'UPDATE pedidos SET item = ?, quantidade = ?, preco = ? WHERE id = ?',
            [novoItem, novaQuantidade, novoPreco, id],
            function (err, results){
                if (err){
                    console.error(err);
                    return res.status(500).json({ erro: 'Erro ao alterar item'});
                }

                if(results.affectedRows === 0){
                    return res.status(404).json({ erro: 'Item não encontrado'});
                }

                res.json({ mensagem: 'Item alterado'});
            }
        );
    });

    // Inicia o servidor
    app.listen(port, function(){
        console.log(`Servidor rodando em http://localhost:${port}`);
    });