//require("babel-core").transform("code");
var server = require('http').createServer();
var io = require('socket.io')(server);
import { Asigner } from './asigner';
const asigner = new Asigner(io);
//on client connect => listen event define in Newclient
//create new client handle by playerHanler
io.on('connection', (client) => {
    let room = asigner.asign();
    //client.on('wait',()=> console.log('waiting'));
    client.on('wait', () => client.emit('asigned', room));
    console.log('client connect asign on ' + room);
});
server.listen(8080);
