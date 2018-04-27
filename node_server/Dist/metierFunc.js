import { CaseTypeKeys } from "./Interface/LabStates";
export function foundPlayer(state, action) {
    let curentCase;
    let curentIndex;
    for (let i = 0; i < state.grid.length; i++) {
        let PlayersCases = state.grid[i].filter((Case) => Case.types === 'Player');
        curentCase = PlayersCases.find((Case, index) => {
            curentIndex = { x: index, y: i };
            return Case.playerId === action.playerId;
        });
        if (PlayersCases.find((Case) => Case.playerId === action.playerId))
            break;
    }
    return { curentCase: curentCase, curentIndex: curentIndex };
}
export function foundCase(state, CaseSearched) {
    let curentCase;
    let curentIndex;
    for (let i = 0; i < state.grid.length; i++) {
        let Cases = state.grid[i];
        curentCase = Cases.find((Case, index) => {
            curentIndex = { x: index, y: i };
            return Case === CaseSearched;
        });
        if (Cases.find((Case) => Case === CaseSearched))
            break;
    }
    return { curentCase: curentCase, curentIndex: curentIndex };
}
export function GetAllCoridor(state) {
    let coridors = state.grid.reduce((coridors, row) => {
        return coridors.concat(row.filter((Case) => Case.types === CaseTypeKeys.Coridor));
    });
    return coridors;
}
