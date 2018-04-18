import { NewClient } from './socket';
import { lockerGrid } from './labyrintheClasse';
import * as conf from './labyrintheConst';
export class Idgenerator {
    constructor() {
        this.generetaId = () => this.id++;
    }
}
export class LabHandlerGenerator {
    constructor() {
        this.generate = (server) => {
            let newIDGenetator = new Idgenerator();
            let newHandler = new PlayerHandler(server.of('/room' + this.labs.length), newIDGenetator);
            this.labs.push(newHandler);
        };
        this.labs = [];
    }
}
export class PlayerHandler {
    constructor(io, idGenerateur) {
        this.newClient = NewClient;
        this.getPlayerById = (id) => (this.players.find((player) => (player.getId() === id)));
        this.getPlayerBySocket = (socket) => (this.players.find((player) => (player.isSameSocket(socket))));
        this.mooveTo = (client, caseFrom, caseTo) => {
            let player = this.getPlayerBySocket(client);
            this.lab.moovePlayer(caseFrom, caseTo);
        };
        this.sendInitdata = (client) => {
            this
                .getPlayerBySocket(client)
                .sendConf(conf);
        };
        this.lockerGrid = new lockerGrid(conf.XSIZE, conf.YSIZE);
        this.lab = new labyrinthe(conf.XSIZE, conf.YSIZE, io);
        this.players = [];
        io.on('connection', (client) => {
            let newPlayer = new Player(client, idGenerateur, conf.PV);
            this.players.push(newPlayer);
            this.newClient(client, this.lockerGrid, this);
        });
    }
}
export class Player {
    constructor(socket, idgenerator, pv) {
        //accesor
        this.getDamage = (damage) => this.pv -= damage;
        this.getPv = () => (this.pv);
        this.isSameSocket = (extSocket) => (extSocket === this.socket);
        this.getId = () => (this.id);
        //protocole
        this.sendConf = (conf) => this.socket.send('conf', Object.assign({}, conf));
        this.socket = socket;
        this.id = idgenerator.generetaId();
        this.pv = pv;
    }
}
export class labyrinthe {
    constructor(x, y, io) {
        this.PLAYER = ':)';
        this.CORIDOR = '  ';
        this.sendGridChange = () => this.observer.emit('gridChange', this.grid);
        this.popPlayer = (x, y) => {
            this.grid[x][y] = this.PLAYER;
        };
        this.moovePlayer = (lastPosition, nextPosition) => {
            this.grid[lastPosition.x][lastPosition.y] = this.CORIDOR;
            this.grid[nextPosition.x][nextPosition.y] = this.PLAYER;
            this.sendGridChange();
        };
        this.grid = [];
        this.observer = io;
        for (let i = 0; i < x; i++) {
            let newColone = [];
            for (let j = 0; j < y; j++) {
                newColone.push(this.CORIDOR);
            }
            this.grid.push(newColone);
        }
    }
}
