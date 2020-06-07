//node index.js to start

let app = require('express')();
let http = require('http').Server(app);

let socket = require('socket.io')(http);

app.get('/', (request, response) => {
    response.sendFile(__dirname +'/index.html');

})

//where the server will open an endpoint for connection
http.listen(3000, () => {
    console.log('connection established');
})

socket.on('connection', (io) => { //get a parameter from the server
    console.log(Object.keys(socket.sockets.connected).length);
    socket.emit('connections',Object.keys(socket.sockets.connected).length)

    io.on('disconnect', () => {
        console.log('user disconnected');
        socket.emit('connections', Object.keys(socket.sockets.connected).length)
    })

    io.on('created', (data) => { //listen and then emit an event
         io.broadcast.emit('created', (data)); //emit will broadcast the message to other users
    })

    io.on('chat-message', (data) => {
        io.broadcast.emit('chat-message', (data));
    })

    io.on('typing', (data) => {
        io.broadcast.emit('typing', (data));
    })

    io.on('stopTyping', (data) => {
        io.broadcast.emit('stopTyping', (data));
    })

    io.on('joined', (data) =>{
        io.broadcast.emit('joined', (data));
    })

    io.on('leaved', (data) =>{
        io.broadcast.emit('leaved', (data));
    })
})