const SocketIO = require('socket.io');
export const NewClient = (client, grid, playerHandler) => {
    client.on('test', (data) => {
        console.log(data);
    });
    //client.on('wait',()=> console.log('waiting'));
    client.on('goOnCase', (data) => {
        grid.lock(data.caseTo, () => (new Promise((resolve, reject) => {
            playerHandler.mooveTo(client, data.caseFrom, data.caseTo);
            resolve();
        })));
    });
    client.on('listening', () => {
        playerHandler.sendInitdata(client);
    });
};
