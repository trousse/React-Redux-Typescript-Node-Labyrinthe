import { foundPlayer, foundCase, GetAllCoridor } from './metierFunc';
import * as Const from './labyrintheConst';
import { CaseTypeKeys } from './Interface/LabStates';
const actionGoOnCase = {
    Coridor: (curentCase, targetCase, state, action) => {
        state.grid[curentCase.curentIndex.y][curentCase.curentIndex.x] = targetCase.curentCase;
        state.grid[curentCase.curentIndex.y - 1][curentCase.curentIndex.x] = curentCase.curentCase;
        return state;
    },
    Wall: (curentCase, targetCase, state, action) => {
        return state;
    },
    Exit: (curentCase, targetCase, state, action) => {
        console.log('wp');
        return state;
    },
    CasePlayer: (curentCase, targetCase, state, action) => {
        console.log('hit not impleòented yet');
        return state;
    }
};
const actionSwitch = {
    PlayerMooveDown: function (state, action) {
        let curentPosition = foundPlayer(state, action);
        if (curentPosition.curentIndex.y !== Const.YSIZE - 1) {
            let nextCase = {
                curentCase: state.grid[curentPosition.curentIndex.y + 1][curentPosition.curentIndex.x],
                curentIndex: { x: curentPosition.curentIndex.x, y: curentPosition.curentIndex.y + 1 },
            };
            return actionGoOnCase[nextCase.curentCase.types](curentPosition, nextCase, state, action);
        }
    },
    PlayerMooveUp: function (state, action) {
        let curentPosition = foundPlayer(state, action);
        if (curentPosition.curentIndex.y !== 0) {
            let nextCase = {
                curentCase: state.grid[curentPosition.curentIndex.y - 1][curentPosition.curentIndex.x],
                curentIndex: { x: curentPosition.curentIndex.x, y: curentPosition.curentIndex.y + 1 },
            };
            return actionGoOnCase[nextCase.curentCase.types](curentPosition, nextCase, state, action);
        }
    },
    PlayerMooveLeft: function (state, action) {
        let curentPosition = foundPlayer(state, action);
        if (curentPosition.curentIndex.x !== 0) {
            let nextCase = {
                curentCase: state.grid[curentPosition.curentIndex.y][curentPosition.curentIndex.x - 1],
                curentIndex: { x: curentPosition.curentIndex.x - 1, y: curentPosition.curentIndex.y },
            };
            return actionGoOnCase[nextCase.curentCase.types](curentPosition, nextCase, state, action);
        }
    },
    PlayerMooveRight: function (state, action) {
        let curentPosition = foundPlayer(state, action);
        if (curentPosition.curentIndex.x !== Const.XSIZE - 1) {
            let nextCase = {
                curentCase: state.grid[curentPosition.curentIndex.y][curentPosition.curentIndex.x + 1],
                curentIndex: { x: curentPosition.curentIndex.x + 1, y: curentPosition.curentIndex.y },
            };
            return actionGoOnCase[nextCase.curentCase.types](curentPosition, nextCase, state, action);
        }
    },
    NewPlayer: function (state, action) {
        let newPlayerCase = {
            types: CaseTypeKeys.Player,
            playerId: action.playerId,
            hidden: false,
        };
        let coridorCases = GetAllCoridor(state);
        let randomPlace = Math.trunc(Math.random() * coridorCases.length);
        let targetCoridor = foundCase(state, coridorCases[randomPlace]);
        state.grid[targetCoridor.curentIndex.y][targetCoridor.curentIndex.x] = newPlayerCase;
        return state;
    }
};
export function labActionReducer(Lab, action) {
    if (action.type.toString().split('/')[0] !== "@@redux") {
        return actionSwitch[action.type.toString()](Lab, action);
    }
    else
        return Lab;
}
