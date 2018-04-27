
const SocketIO = require('socket.io');
import * as redux from 'redux' ;
import * as conf from './labyrintheConst'
import { SocketHandler } from './SocketHandler';
import * as dispatcher from './LabActionCreator'
import { IAppState, Lab } from './Interface/LabStates';
import { LabActionTypes } from './Interface/IAppAction';
import { Idgenerator } from './LabGenerator';


export const NewClient = (client: SocketIO.Socket,store:redux.Store<Lab,LabActionTypes>,socketHandler:SocketHandler) => {                 


    client.on('up',()=>{
        let player = socketHandler.getPlayerBySocket(client);
        dispatcher.PlayerMooveUp(player,store);
    })
    
    client.on('down',()=>{
        let player = socketHandler.getPlayerBySocket(client);
        dispatcher.PlayerMooveDown(player,store);
    })
        
    client.on('left',()=>{
        let player = socketHandler.getPlayerBySocket(client);
        dispatcher.PlayerMooveLeft(player,store);
    })

    client.on('right',()=>{
        let player = socketHandler.getPlayerBySocket(client);
        dispatcher.PlayerMooveRight(player,store);
    })

}

