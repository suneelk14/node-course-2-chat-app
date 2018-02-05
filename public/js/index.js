var socket = io();

socket.on('connect', function(){
  console.log('connected to server');

  });

socket.on('newMessage', function(newMessage){
  console.log('New Message', newMessage);
});
socket.on('disconnect', function(){
  console.log('Disconnected from server');
});
