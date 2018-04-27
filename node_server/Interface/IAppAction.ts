import {LabActionTypeKeys} from './IAppActionTypes'
import * as LabState from './LabStates'
import { PlayerMooveDown } from '../LabActionCreator';
import * as redux from 'redux' ;
import {Coridor,Exit,Wall,CasePlayer} from './LabStates'
import { CaseIndex } from '../metierFunc';

export interface PlayerMooveUp {
    readonly type: LabActionTypeKeys.PlayerMooveUp;
    readonly playerId: string;
    store: redux.Store<LabState.Lab,LabActionTypes>;
  }
  
  export interface PlayerMooveDown {
    readonly type: LabActionTypeKeys.PlayerMooveDown;
    readonly playerId: string;
    store: redux.Store<LabState.Lab,LabActionTypes>;
  }
  
  export interface PlayerMooveLeft {
    readonly type: LabActionTypeKeys.PlayerMooveLeft;
    readonly playerId: string;
    store: redux.Store<LabState.Lab,LabActionTypes>;
  }

  export interface PlayerMooveRight {
    readonly type: LabActionTypeKeys.PlayerMooveRight;
    readonly playerId: string;
    store: redux.Store<LabState.Lab,LabActionTypes>;
  }

  export interface NewPlayer{
    readonly type: LabActionTypeKeys.NewPlayer;
    readonly playerId: string;
  }

  export type LabActionTypes = 
  | PlayerMooveUp
  | PlayerMooveDown
  | PlayerMooveLeft
  | PlayerMooveRight
  | NewPlayer;

  
  export interface ActionMooveSwitch{
      PlayerMooveDown: (state:LabState.Lab,action:LabActionTypes)=>LabState.Lab;
      PlayerMooveUp:(state:LabState.Lab,action:LabActionTypes)=>LabState.Lab;
      PlayerMooveLeft:(state:LabState.Lab,action:LabActionTypes)=>LabState.Lab;
      PlayerMooveRight:(state:LabState.Lab,action:LabActionTypes)=>LabState.Lab;
      NewPlayer:(state:LabState.Lab,action:LabActionTypes)=>LabState.Lab;
  }

  export interface ActionGoOnCase{
      Coridor: (curentCase:CaseIndex,targetCase:CaseIndex,state:LabState.Lab,action:LabActionTypes)=>LabState.Lab;
      Wall: (curentCase:CaseIndex,targetCase:CaseIndex,state:LabState.Lab,action:LabActionTypes)=>LabState.Lab;
      CasePlayer: (curentCase:CaseIndex,targetCase:CaseIndex,state:LabState.Lab,action:LabActionTypes)=>LabState.Lab;
      Exit: (curentCase:CaseIndex,targetCase:CaseIndex,state:LabState.Lab,action:LabActionTypes)=>LabState.Lab;
  }