var server = require('http').createServer()
var io = require('socket.io')(server)
const NewClient = require("./socket.js").NewClient
import {lockerGrid} from './labyrintheClasse'
import { DepNewClient } from './socket';
import { PlayerHandler } from './playerClasse';

//constante (need to be in conf file)
const nbPlayerByRoom = 6;
//declaration
var compteur: number = 0;
const grid: lockerGrid = new lockerGrid(5,5);
var playerHandler: PlayerHandler;
//dependencie injection


//on client connect => listen event define in Newclient
//create new client handle by playerHanler
io.on('connection',(client)=>{

    //assigne le client a un handler en appelant handlerAssigner.assigne()
    //qui retourne le handler assigne au $client
    //envoi l evenement assigned au $client qui se connecte a ca room
    //le handler lui fait ecouter les evenement de la room et enregistre
    //ses donne 
    
    //handlerAssigner depend de io pour  
    // cree un nouveau namespace qu il assigne a un nouveau handler 

    //dans le constructeur du handler
    //NewClient(client,{grid,playerHandler});

})
server.listen(8080);