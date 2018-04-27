import * as redux from 'redux';
import { SocketHandler } from './SocketHandler';
import { labActionReducer } from './Reducers';
export class Idgenerator {
    constructor() {
        this.generetaId = () => {
            this.id++;
            return this.id.toString();
        };
    }
}
export class GameGenerator {
    constructor() {
        this.generate = (server) => {
            let newIDGenetator = new Idgenerator();
            let store = redux.createStore(labActionReducer);
            let room = server.of('/room' + this.labs.length);
            let socketHandler = new SocketHandler(room, store, newIDGenetator);
            this.labs.push(socketHandler);
        };
        this.labs = [];
    }
}
