import {PlayerHandler,Idgenerator, LabHandlerGenerator} from './playerClasse';
import * as SocketIO from 'socket.io';
import {MAX_BY_ROOM} from './labyrintheConst';

export class Asigner{
    private counter:number;
    private server:SocketIO.Server;
    private labHandlerGenerator:LabHandlerGenerator;

    constructor(server:SocketIO.Server){
        this.labHandlerGenerator = new LabHandlerGenerator();
        this.labHandlerGenerator.generate(server);
        this.counter= 0;
        this.server= server;
    }

    public asign:()=>string = ()=>{
        if(this.counter % MAX_BY_ROOM===0){
            //will create a handler who implemente io.on('connection',imp)
            //and create the game context 
            this.labHandlerGenerator.generate(this.server);
        }
        let asign = 'room'+Math.trunc(this.counter/MAX_BY_ROOM);
        this.counter++;
        return asign;
    }
}