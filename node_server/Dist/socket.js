const SocketIO = require('socket.io');
import * as dispatcher from './LabActionCreator';
export const NewClient = (client, store, socketHandler) => {
    client.on('up', () => {
        let player = socketHandler.getPlayerBySocket(client);
        dispatcher.PlayerMooveUp(player, store);
    });
    client.on('down', () => {
        let player = socketHandler.getPlayerBySocket(client);
        dispatcher.PlayerMooveDown(player, store);
    });
    client.on('left', () => {
        let player = socketHandler.getPlayerBySocket(client);
        dispatcher.PlayerMooveLeft(player, store);
    });
    client.on('right', () => {
        let player = socketHandler.getPlayerBySocket(client);
        dispatcher.PlayerMooveRight(player, store);
    });
};
