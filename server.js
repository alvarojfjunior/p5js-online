var express = require('express');
const database = require('mime-db');
var app = express();
var server = app.listen(process.env.PORT || 3000, listen);

// Create server
function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://' + host + ':' + port);
}

// Set directory app
app.use(express.static('public'));

// Create soket.io connect
var io = require('socket.io')(server);

io.sockets.on('connection', socket => {
    console.log(socket.id + " is connected.");

    // Get and emit mouse event
    socket.on('playerMove', data => {
        console.log('User ' + data.id + ' move to X:' + data.position.x + ' and Y:' + data.position.y)
        socket.broadcast.emit('playerMove', data);
    });


    socket.on('', data => {
        console.log('User ' + data.id + ' move to X:' + data.position.x + ' and Y:' + data.position.y)
    });



    // get disconnect event
    socket.on('disconnect', data => {
        console.log(socket.id + " is disconnected.");
    });
});

