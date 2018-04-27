export enum CaseTypeKeys {
    Wall = "Wall",
    Coridor = "Coridor",
    Player = "Player",
    Exit = "Exit",
  }

export type CaseTypeskey = 
  | CaseTypeKeys.Wall
  | CaseTypeKeys.Coridor
  | CaseTypeKeys.Player
  | CaseTypeKeys.Exit;

export interface Wall{
    types: CaseTypeKeys.Wall,
    hidden: boolean,
}

export interface Coridor{
    types: CaseTypeKeys.Coridor,
    hidden: boolean,
}

export interface CasePlayer{
    types: CaseTypeKeys.Player,
    playerId: string,
    hidden: boolean,
}

export interface Exit{
    types: CaseTypeKeys.Exit,
    hidden: boolean,
} 

export type Case =
| Wall
| Coridor
| CasePlayer
| Exit;


export interface Lab {
    grid: Case[][],
    playerWin: boolean,
}

export interface Player{
    playerId: number,
    pv: number,
    force: number,
}

export interface Players{
    players: Player[]
}

export interface IAppState{
    lab:Lab,
    players:Players,
}
