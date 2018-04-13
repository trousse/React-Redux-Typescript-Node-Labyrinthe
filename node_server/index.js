var server = require('http').createServer()
var io = require('socket.io')(server)
import NewClient from "./client.js"

io.on('connection',NewClient(client))
server.listen(8080);