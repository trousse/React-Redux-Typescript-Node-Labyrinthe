import 'socket.io-client';
import {IcaseProps} from './Props'
import IlabObserver from './IlabObserver';

export const listenServerEvent = (socket:SocketIOClient.Socket, lab:IlabObserver) => {
    socket.on('gridChanged',(grid:IcaseProps[][]) => {
        console.log('hey');
        lab.onGridChanged(grid);
    })
}