import { Case, CasePlayer, Lab, IAppState, CaseTypeKeys, Coridor } from "./Interface/LabStates";
import { Icoor } from "./Reducers";
import { LabActionTypes } from "./Interface/IAppAction";

export interface CaseIndex{
    curentCase:Case;
    curentIndex:Icoor;
}

export function foundPlayer(state:Lab,action:LabActionTypes):CaseIndex{
    let curentCase:CasePlayer;
        let curentIndex:Icoor;
        for(let i = 0;i<state.grid.length;i++){
            let PlayersCases = <CasePlayer[]> state.grid[i].filter((Case)=>Case.types==='Player')
            curentCase = PlayersCases.find((Case,index)=>{
                curentIndex= {x:index, y:i};      
                return Case.playerId===action.playerId});
            
            if(PlayersCases.find((Case)=>Case.playerId===action.playerId)) break;
            
        }
        return { curentCase: curentCase, curentIndex: curentIndex }
}

export function foundCase(state:Lab,CaseSearched:Case):CaseIndex{
    let curentCase:Case;
        let curentIndex:Icoor;
        for(let i = 0;i<state.grid.length;i++){
            let Cases = <Case[]> state.grid[i];
            curentCase = Cases.find((Case,index)=>{
                curentIndex= {x:index, y:i};      
                return Case===CaseSearched});
            
            if(Cases.find((Case)=>Case===CaseSearched)) break;
            
        }
        return { curentCase: curentCase, curentIndex: curentIndex }
}

export function GetAllCoridor(state:Lab):Case[]{
    let coridors = state.grid.reduce((coridors,row)=>{
        return coridors.concat(row.filter((Case)=>Case.types===CaseTypeKeys.Coridor))
    })
    return coridors;
}