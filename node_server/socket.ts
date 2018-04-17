
import SocketIO = require('socket.io');
import * as EventInterfaces from './EventInterfaces';
import {lockerGrid} from './labyrintheClasse'
import {PlayerHandler} from './playerClasse'

export interface DepNewClient{
    grid: lockerGrid,
    playerHandler: PlayerHandler
}

export const NewClient = (client : SocketIO.Socket,
                          dep : DepNewClient ) => {
    
    let {grid,playerHandler} = dep;                   

    client.on('test',(data)=>{
        console.log(data);
    })

    client.on('goOnCase',(data : EventInterfaces.goOnCaseData)=>{
       grid.lock(data.caseTo,()=>(
                new Promise((resolve, reject) => {
                    playerHandler.mooveTo(client,data.caseFrom,data.caseTo);
                    resolve();
                })
            )
        )
    })

    client.on('listening',()=>{
        playerHandler.sendInitdata(client);
    })
}

