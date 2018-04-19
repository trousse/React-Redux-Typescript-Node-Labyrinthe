import * as IO from 'socket.io-client'
import {listenServerEvent} from './listenServerEvent'
import { Icoor } from './EventInterfaces';

export class SocketHandler{
    private socket:SocketIOClient.Socket;

    constructor(url:string,observer:IlabObserver){
        let socket = IO(url);
        socket.on('asigned', (room: string) => {
            console.log('asigned On room ' + room);
            this.socket = IO(url + '/' + room);
            observer.onAsigned();
            listenServerEvent(this.socket,observer);
        }   
    }
    //devra etre fleche h,b,g,d
    public sendMooveTO = (from:Icoor,to:Icoor) => {
        let data = { caseFrom: from, caseTo: to };
        this.socket.emit('goOnCase', data);
    }

    public sendClickOn = (Case:Icoor) => {
        this.socket.emit('click',Case);
    }
}