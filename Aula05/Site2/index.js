const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/calcular-media', (req, res)=>{
    const {nome, nota1, nota2} = req.body;
    
    if(nome === undefined || nota1 === undefined || nota2 === undefined){
        return res.status(400).json({erro: 'Parâmetros incompletos. Envie nome, nota1 e nota2'});
    }

    if(typeof nome!== 'string' || typeof nota1 !== 'number' || typeof nota2!== 'number'){
        return res.status(400).json({erro: 'Parâmetros com tipos invalidos. Nome dever ser string, notas deve ser números'})
    }

    const media = (nota1+nota2) / 2;
    const situacao = media >= 5 ? 'Aprovado' : 'Reprovado';

    res.json({nome, media, situacao});
});

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`);
});