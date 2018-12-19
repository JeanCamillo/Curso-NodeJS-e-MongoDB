/*Importar as configurações do servidor */
var app = require('./config/server');

/*parametrizar a porta de escuta */
var server = app.listen(80, function(){
    console.log('Servidor online');
})

var io = require('socket.io').listen(server);

app.set('io', io);

/*Criar uma conexão por websocket, ON fica ouvindo pedidos de execução */
io.on('connection', function(socket){
    console.log('Usuario Conectou !');

    
    socket.on('disconnect',function(){
        console.log('Usuario Desconectou !');
    });

    
    socket.on('msgParaServidor', function(data){
        /*Dialogo */
        socket.emit('msgParaCliente', {apelido: data.apelido, mensagem : data.mensagem});
        socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem : data.mensagem});

        /*Participantes */
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit('participantesParaCliente', {apelido: data.apelido});
            socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
        }
    })

    
})

