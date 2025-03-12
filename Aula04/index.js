const{createServer} = require('http');
let server = createServer((request,response)=>{ //Create server possui os parâmetros request e response
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write('<h1>Boa noite!</h1><p>Meu primeiro projeto</p>');
    response.end();
});
server.listen(8000); //Ouve a porta 8000 do servidor
console.log("Projeto iniciado");
