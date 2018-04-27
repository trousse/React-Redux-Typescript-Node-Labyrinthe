import { Server, Namespace } from "socket.io";
import { Store } from "redux";
import { Idgenerator } from "./LabGenerator";
import { NewClient } from './socket'
import { IAppState, Lab } from "./Interface/LabStates";
import { LabActionTypes } from "./Interface/IAppAction";
import * as dispatcher from './LabActionCreator';

export class SocketHandler{
    private playersId = {};
    private store:Store<Lab,LabActionTypes>;
    constructor(server:Namespace,store:Store<Lab,LabActionTypes>,idgenerator:Idgenerator){
        this.store = store;

        store.subscribe(()=>{
            console.log(this.store.getState());
            for(let playerId in this.playersId){
                let newState = this.store.getState() //utiliser reducer_relatif(state,playerId)
                this.playersId[playerId].emit('gridChanged',newState);
             }
        })

        server.on('connect',(client)=>{
            let newID = idgenerator.generetaId()
            this.playersId[newID]=client;
            dispatcher.NewPlayer(newID);
            NewClient(client,store,this);
        });

    }
    public getPlayerBySocket = (socket:SocketIO.Socket)=>{
        for(let playerId in this.playersId){
            if(this.playersId[playerId]===socket){
                return playerId;
            }
        }
    }
}