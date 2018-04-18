
import {NewClient} from './socket'
import {lockerGrid} from './labyrintheClasse'
import {Icoor} from './EventInterfaces'
import * as conf from './labyrintheConst'

export class Idgenerator{
    private id:number 
    constructor(){}
    public generetaId = () => this.id++;
}

export class LabHandlerGenerator{
    private labs: PlayerHandler[];
    constructor(){
        this.labs = [];
    }

    public generate = (server:SocketIO.Server) =>{
        let newIDGenetator = new Idgenerator();
        let newHandler = new PlayerHandler(server.of('/room'+this.labs.length),newIDGenetator);
        this.labs.push(newHandler);
    }   
}

export class PlayerHandler{

    private lockerGrid: lockerGrid ;
    private newClient = NewClient;

    private players: Player[];
    private io: SocketIO.Server;
    private lab : labyrinthe;

    private getPlayerById:(id:number)=>Player = (id:number) =>
        ( this.players.find((player)=>(player.getId()===id)))

    private getPlayerBySocket:(socket:SocketIO.Socket) =>Player =
    (socket:SocketIO.Socket)=>
        ( this.players.find((player)=>
            (player.isSameSocket(socket))
        ) 
    )

    constructor(io:SocketIO.Namespace,idGenerateur:Idgenerator){
        this.lockerGrid = new lockerGrid(conf.XSIZE,conf.YSIZE);
        this.lab = new labyrinthe(conf.XSIZE,conf.YSIZE,io);
        this.players = [];
        io.on('connection',(client)=>{
            let newPlayer  = new Player(client,idGenerateur,conf.PV);
            this.players.push(newPlayer);
            this.newClient(client,this.lockerGrid,this);
        })
    }

    public mooveTo = (client,caseFrom,caseTo)=>{
        let player = this.getPlayerBySocket(client);
        this.lab.moovePlayer(caseFrom,caseTo);
    }

    public sendInitdata = (client:SocketIO.Socket) =>{
        this
        .getPlayerBySocket(client)
        .sendConf(conf);
    }
}

export class Player{
    
    private socket: SocketIO.Socket;
    private id: number;
    private pv: number;

    constructor(socket : SocketIO.Socket,idgenerator:Idgenerator,pv:number){
        this.socket = socket;
        this.id = idgenerator.generetaId();
        this.pv = pv;
    }
    
    //accesor
    public getDamage = (damage:number)=>this.pv -= damage;
    public getPv: ()=>Number = () => (this.pv);
    public isSameSocket: (extSocket:SocketIO.Socket)=>boolean = (extSocket:SocketIO.Socket) => (extSocket===this.socket);
    public getId: ()=>number = () => (this.id);

    //protocole

    public sendConf = (conf) => this.socket.send('conf',{...conf});
    
}

export class labyrinthe{
    private PLAYER = ':)';
    private CORIDOR = '  ';
    private observer:SocketIO.Namespace;
    private sendGridChange = () => this.observer.emit('gridChange',this.grid);
    
    private grid :string[][];

    constructor(x:number,y:number,io:SocketIO.Namespace){
        this.grid = [];
        this.observer = io;
        for(let i = 0;i<x;i++){
            let newColone = [];
            for(let j = 0;j<y;j++){
                newColone.push(this.CORIDOR);
            }
            this.grid.push(newColone);
        }
    }

    public popPlayer = (x,y)=>{
        this.grid[x][y] = this.PLAYER;
    }

    public moovePlayer = (lastPosition:Icoor,nextPosition:Icoor)=>{
        this.grid[lastPosition.x][lastPosition.y] = this.CORIDOR;
        this.grid[nextPosition.x][nextPosition.y] = this.PLAYER;
        this.sendGridChange();
    }
}