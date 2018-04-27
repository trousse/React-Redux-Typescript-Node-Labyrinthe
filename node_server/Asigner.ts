import {Idgenerator, GameGenerator} from './LabGenerator';
import * as SocketIO from 'socket.io';
import {MAX_BY_ROOM} from './labyrintheConst';

export class Asigner{
    private counter:number;
    private server:SocketIO.Server;
    private GameGenerator:GameGenerator;

    constructor(server:SocketIO.Server){
        this.GameGenerator = new GameGenerator();
        this.GameGenerator.generate(server);
        this.counter = 0;
        this.server = server;
    }

    public asign:()=>string = ()=>{
        if(this.counter % MAX_BY_ROOM===0){
            //will create a handler who implemente io.on('connection',imp)
            //and create the game context 
            this.GameGenerator.generate(this.server);
        }
        let asign = 'room'+Math.trunc(this.counter/MAX_BY_ROOM);
        this.counter++;
        return asign;
    }
}