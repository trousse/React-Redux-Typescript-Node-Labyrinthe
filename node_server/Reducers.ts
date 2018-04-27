import * as IState from './Interface/LabStates';
import * as IAction from './Interface/IAppAction';
import { foundPlayer, CaseIndex, foundCase, GetAllCoridor } from './metierFunc';
import * as Const from './labyrintheConst';
import {CaseTypeKeys} from './Interface/LabStates';
import { LabActionTypeKeys } from './Interface/IAppActionTypes';

export interface Icoor{
    x: number,
    y: number,
}

const actionGoOnCase:IAction.ActionGoOnCase = {
    Coridor:(curentCase:CaseIndex,targetCase:CaseIndex,state:IState.Lab,action:IAction.LabActionTypes)=>{
        state.grid[curentCase.curentIndex.y][curentCase.curentIndex.x] = targetCase.curentCase;
        state.grid[curentCase.curentIndex.y-1][curentCase.curentIndex.x] = curentCase.curentCase;
        return state;
    },
    Wall:(curentCase:CaseIndex,targetCase:CaseIndex,state:IState.Lab,action:IAction.LabActionTypes)=>{
        return state;
    },
    Exit:(curentCase:CaseIndex,targetCase:CaseIndex,state:IState.Lab,action:IAction.LabActionTypes)=>{
        console.log('wp');
        return state;
    },
    CasePlayer:(curentCase:CaseIndex,targetCase:CaseIndex,state:IState.Lab,action:IAction.LabActionTypes)=>{
        console.log('hit not impleòented yet');
        return state;
    }
}

const actionSwitch:IAction.ActionMooveSwitch = {
    PlayerMooveDown:function(state:IState.Lab,action:IAction.PlayerMooveDown){
        let curentPosition:CaseIndex = foundPlayer(state,action);
        if(curentPosition.curentIndex.y!==Const.YSIZE-1){
            let nextCase:CaseIndex = {
                curentCase: state.grid[curentPosition.curentIndex.y+1][curentPosition.curentIndex.x],
                curentIndex: {x: curentPosition.curentIndex.x, y: curentPosition.curentIndex.y+1},
            };
            return actionGoOnCase[nextCase.curentCase.types](curentPosition,nextCase,state,action);
        }
    },
    PlayerMooveUp:function(state:IState.Lab,action:IAction.PlayerMooveUp){
        let curentPosition:CaseIndex = foundPlayer(state,action);
        if(curentPosition.curentIndex.y!==0){
            let nextCase:CaseIndex = {
                curentCase: state.grid[curentPosition.curentIndex.y-1][curentPosition.curentIndex.x],
                curentIndex: {x: curentPosition.curentIndex.x, y: curentPosition.curentIndex.y+1},
            };
            return actionGoOnCase[nextCase.curentCase.types](curentPosition,nextCase,state,action);
        }
    },
    PlayerMooveLeft:function(state:IState.Lab,action:IAction.PlayerMooveLeft){
        let curentPosition:CaseIndex = foundPlayer(state,action);
        if(curentPosition.curentIndex.x!==0){
            let nextCase:CaseIndex = {
                curentCase: state.grid[curentPosition.curentIndex.y][curentPosition.curentIndex.x-1],
                curentIndex: {x: curentPosition.curentIndex.x-1, y: curentPosition.curentIndex.y},
            };
            return actionGoOnCase[nextCase.curentCase.types](curentPosition,nextCase,state,action);
        }
    },
    PlayerMooveRight:function(state:IState.Lab,action:IAction.PlayerMooveRight){
        let curentPosition:CaseIndex = foundPlayer(state,action);
        if(curentPosition.curentIndex.x!==Const.XSIZE-1){
            let nextCase:CaseIndex = {
                curentCase: state.grid[curentPosition.curentIndex.y][curentPosition.curentIndex.x+1],
                curentIndex: {x: curentPosition.curentIndex.x+1, y: curentPosition.curentIndex.y},
            };
            return actionGoOnCase[nextCase.curentCase.types](curentPosition,nextCase,state,action);
        }
    },
    NewPlayer:function(state:IState.Lab,action:IAction.NewPlayer){
        let newPlayerCase:IState.CasePlayer={     
            types:  CaseTypeKeys.Player,
            playerId: action.playerId,
            hidden: false,
        }
        let coridorCases:IState.Case[] = GetAllCoridor(state);
        let randomPlace = Math.trunc(Math.random()*coridorCases.length);
        let targetCoridor = foundCase(state,coridorCases[randomPlace]);
        state.grid[targetCoridor.curentIndex.y][targetCoridor.curentIndex.x] = newPlayerCase;
        return state;
    }
}

export function labActionReducer(Lab:IState.Lab,action:IAction.LabActionTypes){
        if(  action.type.toString().split('/')[0] !== "@@redux" ){
            return actionSwitch[action.type.toString()](Lab,action);
        }
        else return Lab;
}