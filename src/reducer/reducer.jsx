import { useReducer } from "react"
import actionType from "./actionTypes"
import { Status } from "../constant"

export const reducer =  (state,action) => {
  switch(action.type){
    case actionType.NEW_MOVE : {
      let {turn,position} = state

      turn = turn === "w" ? "b" : "w"

      position = [
        ...position,
        action.payload.newPosition
      ]
      return{
        ...state,
        turn,
        position
      }
    }
    case actionType.GENERATE_CANDIDATE_MOVES : {
      return {
        ...state,
        candidateMoves: action.payload.candidateMoves
      }
    }
    case actionType.CLEAR_CANDIDATE_MOVES : {
      return {
        ...state,
        candidateMoves: []
      }
    }
    case actionType.PROMOTION_OPEN: {
      return{
        ...state,
        status: Status.promoting,
        promotionSquare: {...action.payload}
      }
    }
    case actionType.PROMOTION_CLOSE : {
      return {
          ...state,
          status : Status.ongoing,
          promotionSquare : null
      }
  } case actionType.CAN_CASTLE : {
    let {turn,castleDirection} = state 

    castleDirection[turn] = action.payload
    
    return {
        ...state,
        castleDirection,
    }
  }case actionType.STALEMATE: {
    return{
      ...state,
      status: Status.stalemate,
    }
  }case actionType.NEW_GAME: {
  return{
    ...action.payload
    }
  }case actionType.INSUFFICIENT: {
    return{
      ...state,
      status: Status.insufficient
    }
  }case actionType.CHECKMATE: {
    return{
      ...state,
      status: action.payload === 'w' ? Status.white : Status.black,
    }
  }
  default:
      return state
  }
}
