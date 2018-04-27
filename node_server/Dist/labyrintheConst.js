import * as interfaces from './Interface/LabStates';
export const XSIZE = 3;
export const YSIZE = 3;
export const MAX_BY_ROOM = 6;
export const PV = 100;
export const initialLab = { grid: [
        [
            {
                types: interfaces.CaseTypeKeys.Coridor,
                hidden: false,
            }, {
                types: interfaces.CaseTypeKeys.Coridor,
                hidden: false,
            }, {
                types: interfaces.CaseTypeKeys.Coridor,
                hidden: false,
            }
        ],
        [
            {
                types: interfaces.CaseTypeKeys.Coridor,
                hidden: false,
            }, {
                types: interfaces.CaseTypeKeys.Wall,
                hidden: false,
            },
            {
                types: interfaces.CaseTypeKeys.Coridor,
                hidden: false,
            }
        ],
        [
            {
                types: interfaces.CaseTypeKeys.Wall,
                hidden: false,
            },
            {
                types: interfaces.CaseTypeKeys.Wall,
                hidden: false,
            },
            {
                types: interfaces.CaseTypeKeys.Wall,
                hidden: false,
            }
        ]
    ], playerWin: false };
/*
export interface Wall{
    types: CaseTypeKeys.Wall,
    hidden: boolean,
}

export interface Coridor{
    types: CaseTypeKeys.Coridor,
    hidden: boolean,
}

export interface Player{
    types: CaseTypeKeys.Player,
    playerId: number,
    hidden: boolean,
}

export interface Exit{
    types: CaseTypeKeys.Exit,
    hidden: boolean,
} */ 
