import redux from 'redux';
export class Idgenerator {
    constructor() {
        this.generetaId = () => this.id++;
    }
}
export class GameGenerator {
    constructor() {
        this.generate = (server) => {
            let newIDGenetator = new Idgenerator();
            //create new reducer()
            redux.createStore();
            //create new store(reducer)
            //create new namespace  //server.of(/room+this.lab.length)
            //create new socketHandler(namespace,store)
            //let newHandler = new PlayerHandler(server.of('/room'+this.labs.length),newIDGenetator);
            //this.labs.push(newHandler);
        };
        this.labs = [];
    }
}
