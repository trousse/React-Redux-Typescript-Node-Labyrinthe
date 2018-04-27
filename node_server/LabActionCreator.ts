import {LabActionTypeKeys} from './Interface/IAppActionTypes'
import * as action from './Interface/IAppAction'
import * as redux from 'redux' ;
import { IAppState, Lab } from './Interface/LabStates';

export function PlayerMooveUp(playerid:string,store:redux.Store<Lab,action.LabActionTypes>){
    return(
        {
            type: LabActionTypeKeys.PlayerMooveUp,
            playerId: playerid,
            store: store,
        }
    )
}

export function PlayerMooveDown(playerid:string,store:redux.Store<Lab,action.LabActionTypes>){
    return(
        {
            type: LabActionTypeKeys.PlayerMooveDown,
            playerId: playerid,
            store: store,
        }
    )
}

export function PlayerMooveLeft(playerid:string,store:redux.Store<Lab,action.LabActionTypes>){
    return(
        {
            type: LabActionTypeKeys.PlayerMooveLeft,
            playerId: playerid,
            store: store,
        }
    )
}

export function PlayerMooveRight(playerid:string,store:redux.Store<Lab,action.LabActionTypes>){
    return(
        {
            type: LabActionTypeKeys.PlayerMooveRight,
            playerId: playerid,
            store: store,
        }
    )
}

export function NewPlayer(playerid:string){
    return(
        {
            type: LabActionTypeKeys.NewPlayer,
            playerid: playerid,
        }
    )
}