const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3306;

app.use(cors());

// Comfiguração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost', // Endereço de servidor
    user: 'root', // Seu nome de usuário no mySQL
    password: '', // Sua senha do MySQL
    database: 'pedido_node' // Nomde do banco de dados
});

// Conecta ao banco de dados
connection.connect((err)=>{
    if(err){
        console.error('Erro ao conectar ao banco de dados');
        return;
    }
    console.log('Conectado ao banco de dados');
});

//Rota para obter todos os produtos do banco de dados
app.get('/produtos', (req, res)=>{
    const query = 'SELECT * FROM produtos';

    //Executa a comsulta
    connection.query(query, (err, results)=>{
        if(err){
            console.error('Erro ao executar a consulta:', err);
            res.status(500).json({ erro: 'Erro ao obter produtos no banco de dados'});
            return;
        }

        //Envia os resultados como JSON
        res.json({
            produtos: results.map((produto)=>({
                id: produto.cod_produto,
                nome: produto.nome,
                preco: produto.valor
            }))
        });

        //Exibe os dados dos produtos no console
        console.log('Produtos extraidos do banco de dados');
        results.forEach((produto)=>{
            console.log(`ID: ${produto.cod_produto}`);
            console.log(`Nome: ${produto.nome}`);
            console.log(`Preço: ${produto.valor}`);
            console.log('-------------------------------')
        });
    });

    //Inicia o servidor
    app.listen(port, () =>{
        console.log(`Servidor rodando em http://localhost${port}`);
    })
});
