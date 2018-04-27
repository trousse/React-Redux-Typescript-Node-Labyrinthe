import * as SocketIO from 'socket.io';
import * as conf from './labyrintheConst';
import * as redux from 'redux' ;
import {SocketHandler} from './SocketHandler'
import {labActionReducer} from './Reducers'

export class Idgenerator{
    private id:number 
    constructor(){}
    public generetaId = () => {
        this.id++;
        return this.id.toString();
    }
}

export class GameGenerator{
    private labs: SocketHandler[];
    constructor(){
        this.labs = [];
    }

    public generate = (server:SocketIO.Server) =>{
        let newIDGenetator = new Idgenerator();
        let store = redux.createStore(labActionReducer);
        let room = server.of('/room'+this.labs.length);
        let socketHandler =  new SocketHandler(room,store,newIDGenetator);
        this.labs.push(socketHandler);
    }   
}

