var server = require('http').createServer()
var io = require('socket.io')(server)
import NewClient from "./socket.js"

io.use((socket,next)=>{
    console.log(JSON.stringify(socket))
})
io.on('connection',NewClient(client))

server.listen(8080);