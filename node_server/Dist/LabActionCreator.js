import { LabActionTypeKeys } from './Interface/IAppActionTypes';
export function PlayerMooveUp(playerid, store) {
    return ({
        type: LabActionTypeKeys.PlayerMooveUp,
        playerId: playerid,
        store: store,
    });
}
export function PlayerMooveDown(playerid, store) {
    return ({
        type: LabActionTypeKeys.PlayerMooveDown,
        playerId: playerid,
        store: store,
    });
}
export function PlayerMooveLeft(playerid, store) {
    return ({
        type: LabActionTypeKeys.PlayerMooveLeft,
        playerId: playerid,
        store: store,
    });
}
export function PlayerMooveRight(playerid, store) {
    return ({
        type: LabActionTypeKeys.PlayerMooveRight,
        playerId: playerid,
        store: store,
    });
}
export function NewPlayer(playerid) {
    return ({
        type: LabActionTypeKeys.NewPlayer,
        playerid: playerid,
    });
}
