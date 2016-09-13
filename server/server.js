var http = require('http');
var fs = require('fs');

var tab = [];
// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('../index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
    // res.end('toto');
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
	//commande executé
    console.log('Un client est connecté !');
    
    socket.emit('message', 'Vous êtes bien connecté !');

    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('msg', function (message) {
        console.log('Un client me parle ! Il me dit : ' + message);
    });	

    socket.on('name', function (message) {
        // console.log('n client me parle ! Il me dit : ' + message);
        tab.push(message);
        console.log("tab = ", tab);
        socket.emit('name', tab);
    });


});

server.listen(8080);