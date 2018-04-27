import { NewClient } from './socket';
import * as dispatcher from './LabActionCreator';
export class SocketHandler {
    constructor(server, store, idgenerator) {
        this.playersId = {};
        this.getPlayerBySocket = (socket) => {
            for (let playerId in this.playersId) {
                if (this.playersId[playerId] === socket) {
                    return playerId;
                }
            }
        };
        this.store = store;
        store.subscribe(() => {
            console.log(this.store.getState());
            for (let playerId in this.playersId) {
                let newState = this.store.getState(); //utiliser reducer_relatif(state,playerId)
                this.playersId[playerId].emit('gridChanged', newState);
            }
        });
        server.on('connect', (client) => {
            let newID = idgenerator.generetaId();
            this.playersId[newID] = client;
            dispatcher.NewPlayer(newID);
            NewClient(client, store, this);
        });
    }
}
