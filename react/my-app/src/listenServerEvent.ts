import 'socket.io-client';

export const listenServerEvent = (socket:SocketIOClient.Socket, lab:IlabObserver) =>{
    socket.on('gridChanged',(grid:CaseProps[][]){
        lab.onGridChanged(grid);
    })
}