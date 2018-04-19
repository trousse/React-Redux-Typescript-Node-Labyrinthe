import { Component, Props } from "react";
import IlabObserver from "./IlabObserver";
import {SocketHandler} from './SocketHandler'

export class lab extends Component implements IlabObserver {
    private socketHandler: SocketHandler;
    constructor(url:string){
        super(url)
        this.socketHandler = new SocketHandler( url, this );
        this.state = { asigned: false };
    }

    public onAsigned = (room:string) => {this.setState( {asigned: true} )}
    public onGridChanged = ( grid: CaseProps[][] ) => {/*envoyer evenement a redux*/}

}