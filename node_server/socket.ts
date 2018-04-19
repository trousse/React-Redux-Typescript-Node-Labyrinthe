
const SocketIO = require('socket.io');
import * as EventInterfaces from './EventInterfaces';
import {lockerGrid} from './labyrintheClasse'
import {PlayerHandler} from './playerClasse'
import * as conf from './labyrintheConst'

export interface DepNewClient{
    grid: lockerGrid,
    playerHandler: PlayerHandler
}

export const NewClient = (client: SocketIO.Socket,
                          grid: lockerGrid,
                          playerHandler: PlayerHandler   ) => {                 

    client.on('test',(data)=>{
        console.log(data);
    })

    //client.on('wait',()=> console.log('waiting'));

    client.on('goOnCase',(data : EventInterfaces.GoOnCaseData)=>{
        let XinRangeOfGrid = (data.caseFrom.x && data.caseTo.x) < conf.XSIZE;
        let YinRangeOfGrid = (data.caseFrom.y && data.caseTo.y) < conf.YSIZE;
        if(XinRangeOfGrid && YinRangeOfGrid){
            grid.lock(data.caseTo,()=>(
                    new Promise((resolve, reject) => {
                        playerHandler.mooveTo(client,data.caseFrom,data.caseTo);
                        resolve();
                    })
                )
            )
        }
    })

    client.on('listening',()=>{
        playerHandler.sendInitdata(client);
    })
}

