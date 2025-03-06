import { initGameState } from '../../constant';
import actionType from '../actionTypes';

export const updateCastling = (direction) => {
    return {
        type: actionType.CAN_CASTLE,
        payload: direction,
    }
}
export const detectCheckMate = winner =>{
    return{
        type: actionType.CHECKMATE,
        payload: winner
    }
}

export const detectStalemate = winner => {
    return {
        type: actionType.STALEMATE,
    }
}
export const detectInsufficientMaterial = () => {
    return {
        type: actionType.INSUFFICIENT,
    }
}
export const setupNewGame = () => {
    return {
        type: actionType.NEW_GAME,
        payload: initGameState
    }
}