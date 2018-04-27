import { Component } from "react";
import * as React from "react";
import { IcaseProps } from "./Props";

export class Cases extends Component<IcaseProps,any>{
    private vue = (type:string) => {
        switch(type){
            case 'Coridor':
                return ' ';
            case 'Wall':
                return '=';
            case 'Player':
                return '😀';
            case 'Exit':
                return '💫';
            default:
                return ' ';
        }
    }
    constructor(Props:IcaseProps){
        super(Props)
        this.props=Props;
    }

    render(){
        const {type,hidden} = this.props;
        return(
            <div>
            { hidden ? 
            ( <span className='case_Hidden'> {this.vue(type)} </span> ):
            ( <div className='case_notHidden' >🌛</div>)
            }
            </div>
        )
    }
}