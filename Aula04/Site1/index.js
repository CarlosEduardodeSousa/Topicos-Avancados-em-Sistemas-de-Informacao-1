const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

function calcular(req, res){
    const valores = req.body.valores;

    if(!valores || !Array.isArray(valores) || valores.length === 0){
        return req.status(400).json({ erro: 'Lista de valores inválida'});
    }

    let soma = 0;
    for(let i=0; i < valores.length; i++){
        soma += valores[i];
    }

    let media = soma / valores.length;
    res.json({soma:soma , media:media});
}

app.post('/calcular', calcular);

function iniciarServidor(){
    console.log('Servidor rodando em http://localhost: ' + port);
}

app.listen(port, iniciarServidor);