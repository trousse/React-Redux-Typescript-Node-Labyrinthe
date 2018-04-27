

import IlabObserver from "./IlabObserver";
import {SocketHandler} from './SocketHandler';
import { IlabProps, IcaseProps } from "./Props";
import * as React from "react";
import {Cases} from './Case';

interface Statest{
    asigned:boolean;
    grid:IcaseProps[][];
}

export class Lab extends React.Component<IlabProps,Statest> implements IlabObserver {
    private socketHandler: SocketHandler;
   
    private handleKeyPress = (event:React.KeyboardEvent<HTMLDivElement>) => {
        let key = event.keyCode;
        switch(key){
            case 87:
            case 18: /*haut*/
                this.socketHandler.sendUp();
                console.log('w')
                break;
            case 37:
            case 65: /*gauche*/
                this.socketHandler.sendLeft();
                console.log('a');
                break;
            case 40:
            case 83: /*bas*/
                this.socketHandler.sendDown();
                console.log('s');
                break;
            case 39:
            case 68: /*droite*/
                this.socketHandler.sendRight();
                console.log('d')
                break;
        }   
    }
    constructor(Props:IlabProps){
        super(Props)
        this.socketHandler = new SocketHandler( Props.url, this );
        this.state = { asigned: false , grid: [[]] };
    }

    public onAsigned = ( room:string ) => {
        this.setState( {asigned: true} );
        console.log('coucou');
    }
    public onGridChanged = ( grid: IcaseProps[][] ) => {
        this.setState( { grid : grid } );
    }

    render(){
        const {asigned,grid} = this.state;
        return(
        
        <div className='lab'>
        {asigned ? (
            <div onKeyPress={(event)=>this.handleKeyPress(event)} > 
            coucou
                {
                  grid.map( (row) => {
                      row.map( (Case) => (
                        <table className="availableLetter">
                        <tbody>
                            { grid.map( (colone , index ) => (
                                <tr key={index} >
                                    { colone.map( ( Target , i ) => (
                                        <Cases key={i} type={Target.type} hidden={Target.hidden}/>
                                    ) ) }
                                </tr>
                            ) ) }
                        </tbody>
                    </table>
                      ))
                  })  
                }
            </div>
            ) : (
            <div className="waiting">
               <span> "waiting for Connection"</span>
            </div>
            )
        }
        </div>
    )}
    
}

