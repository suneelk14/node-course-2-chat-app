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
    socket.emit('newMessage', {from:'John', text:'Hello', createdAt: 123});
    socket.on('createMessage', (newMessage)=>{
    console.log('Received new Message', newMessage) ;

  });

  socket.on('disconnect', ()=>{
    console.log('Disconnected by client');
  });


});


server.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
