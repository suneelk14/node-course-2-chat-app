const path=require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");
var app = express() ;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('New User Connected');

    socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chat app',
      createdAt: new Date().getTime()
    } ) ;

    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      message:'New user Joined',
      createdAt: new Date().getTime()
    });


    socket.on('createMessage', (message)=>{
      console.log('Received new Message', message) ;

      io.emit('newMessage', {
        from: message.from,
        message:message.text,
        createdAt: new Date().getTime()
      });
      // socket.broadcast.emit('newMessage', {
      //   from: message.from,
      //   message:message.text,
      //   createdAt: new Date().getTime()
      // });
    });

    socket.on('disconnect', ()=>{
    console.log('Disconnected by client');
  });


});


server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
