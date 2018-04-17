
import SocketIO = require('socket.io');
import {NewClient,DepNewClient} from './socket'
import {lockerGrid} from './labyrintheClasse'
import * as conf from './labyrintheConst'

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
    private getPlayerById:(id:number)=>Player = (id:number) =>
    ( this.players.find((player)=>(player.getId()===id)) )

    constructor(io:SocketIO.Server,idGenerateur:Idgenerator){
        io.on('connection',(client)=>{
            let newPlayer  = new Player(client,idGenerateur,conf.PV);
            this.players.push(newPlayer);
            newPlayer.getSocket().send('conf',{...conf});
            this.newClient(client,this.dep);
            newPlayer.getSocket().send('listening');
        })
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
}
