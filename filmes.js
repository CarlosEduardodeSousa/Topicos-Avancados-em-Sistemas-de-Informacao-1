const mysql = require('mysql2/promise');
const prompt = require('prompt-sync')();

async function main() {
    let connection;
    try{
        const dbConfig = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: 3307,
            database: 'locadora'
        }
        connection = await mysql.createConnection(dbConfig);
        console.log("Conexão ativa");

        while(true){
            console.log('\n Opções: ');
            console.log('1 - Exibir Filmes');
            console.log('4 - Sair');

            const escolha = prompt('Digite opção');

            switch (escolha){
                case '1':
                    await listarTodosFilmes(connection);
                    break;
                case '4':
                    console.log('App encerrado');
                    return;
                default:
                    console.log('Opção invalida');
            }
        }
    } catch(err){
        console.error('Erro DB: ', err);
    }
}

async function listarTodosFilmes(connection) {
    try{
        const [rows] = await connection.execute(
            'select cod_filme, nome from filme'
        );
        if (rows.length > 0 ){
            rows.forEach(filme =>{
                console.log('Código: ', filme.cod_filme, 'Nome: ', filme.nome);
            });
        }
    } catch (err){
        console.log('Erro: ', err);
    }
}

main();
