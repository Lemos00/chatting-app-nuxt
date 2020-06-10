let app = require('express')();
let http = require('http').Server(app);
let socket = require('socket.io')(http);

test('should communicate', () => {
  socket.emit('echo', 'Hello World');
  socket.once('echo', (message) => {
    expect(message).toBe('Hello World');
  });
});
//check to see if connecting to the socket server actually works
test('connection testing', () => {
  socket.on('connection', (mySocket) => {
    expect(mySocket).toBeDefined();
  });
});

