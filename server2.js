const io = require('socket.io')(5000)

io.on('connection', function(socket){
    console.log(socket.id)
    socket.on('something',data=>{
        console.log("Data:",data)
        socket.emit('replyGPS',{
            Longitude:123,
            Latitude:321,
            State:0
        })
    })
  });