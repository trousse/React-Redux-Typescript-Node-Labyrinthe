
import SocketIO = require('socket.io');
import {NewClient,DepNewClient} from './socket'
import {lockerGrid} from './labyrintheClasse'
import * as conf from './labyrintheConst'
import { Socket } from 'net';

export class Idgenerator{
    private id:number 
    constructor(){}
    public generetaId = () => this.id++;
}

export class PlayerHandler{

    private grid: lockerGrid = new lockerGrid(conf.XSIZE,conf.YSIZE);
    private newClient = NewClient;
    private dep: DepNewClient = {
        grid: this.grid,
        playerHandler: this
    }

    private players: Player[];
    private io: SocketIO.Server;
    private lab : labyrinthe;

    private getPlayerById:(id:number)=>Player = (id:number) =>
        ( this.players.find((player)=>(player.getId()===id)))

    private getPlayerBySocket:(socket:SocketIO.Socket) =>Player =
    (socket:SocketIO.Socket)=>
        ( this.players.find((player)=>
            (player.getSocket()===<SocketIO.Socket>{...socket})
        ) 
    )

    constructor(io:SocketIO.Server,idGenerateur:Idgenerator){
        io.on('connection',(client)=>{
            this.lab = new labyrinthe(conf.XSIZE,conf.YSIZE);
            let newPlayer  = new Player(client,idGenerateur,conf.PV);
            this.players.push(newPlayer);
            this.newClient(client,this.dep);
        })
    }

    public mooveTo = (client,caseFrom,caseTo)=>{
        let player = this.getPlayerBySocket(client);
        this.lab.moovePlayer(caseFrom.x,caseFrom.y,caseTo.x,caseTo.y);
        this.io.emit('gridChange',this.lab.GetGrid());
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
    public getSocket: ()=>SocketIO.Socket = () => (<SocketIO.Socket>{...this.socket});
    public getId: ()=>number = () => (this.id);

    //protocole

    public sendConf = (conf) => this.socket.send('conf',{...conf});
    
}

export class labyrinthe{
    private PLAYER = ':)';
    private CORIDOR = '  ';

    private grid :string[][];

    constructor(x:number,y:number){
        for(let i = 0;i<x;i++){
            for(let j = 0;j<y;j++){
                this.grid[i][j]=this.CORIDOR;
            }
        }
    }

    public popPlayer = (x,y)=>{
        this.grid[x][y] = this.PLAYER;
    }

    public moovePlayer = (lx,ly,nx,ny)=>{
        this.grid[lx][ly] = this.CORIDOR;
        this.grid[lx][ly] = this.PLAYER;
    }

    public GetGrid = () => (
        this.grid.map((ligne)=>
            (  ligne.map( (Case)=>
                ( Case)) 
            ))
        )

}