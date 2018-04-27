import * as IO from 'socket.io-client'
import {listenServerEvent} from './listenServerEvent'
import { Icoor } from './EventInterfaces';
import IlabObserver from './IlabObserver'

export class SocketHandler{
    private socket:SocketIOClient.Socket;

    constructor(url:string,observer:IlabObserver){
        let socket = IO(url);
        socket.on('asigned', (room: string) => {
            console.log('asigned On room ' + room);
            this.socket = IO(url + '/' + room);
            socket.emit('up');
            observer.onAsigned(room);
            listenServerEvent(this.socket,observer);
        })
        socket.emit('wait');
    }
    public sendUp = () => {
        this.socket.emit('up');
    }
    public sendLeft = () => {
        this.socket.emit('left');
    }
    public sendRight = () =>{
        this.socket.emit('right');
    }
    public sendDown = () =>{
        this.socket.emit('down');
    }
}