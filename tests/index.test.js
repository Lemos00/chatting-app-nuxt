let app = require('express')();
let http = require('http').Server(app);

let socket = require('socket.io')(http);

test('should communicate', () => {
  socket.emit('echo', 'Hello World');
  socket.once('echo', (message) => {
    expect(message).toBe('Hello World');
  });
});

// CHECK this code before actually considering it a valid tests