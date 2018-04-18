import { LabHandlerGenerator } from './playerClasse';
import { MAX_BY_ROOM } from './labyrintheConst';
export class Asigner {
    constructor(server) {
        this.asign = () => {
            if (this.counter % MAX_BY_ROOM === 0) {
                //will create a handler who implemente io.on('connection',imp)
                //and create the game context 
                this.labHandlerGenerator.generate(this.server);
            }
            let asign = 'room' + Math.trunc(this.counter / MAX_BY_ROOM);
            this.counter++;
            return asign;
        };
        this.labHandlerGenerator = new LabHandlerGenerator();
        this.labHandlerGenerator.generate(server);
        this.counter = 0;
        this.server = server;
    }
}
