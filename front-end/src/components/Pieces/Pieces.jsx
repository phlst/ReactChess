import "./Pieces.css";
import Piece from "./Piece.jsx";
import {useState, useRef} from 'react';
import arbiter from "../../arbiter/arbiter.jsx"
import { createPosition, copyPosition } from "../../helper.js";
import { useAppContext } from "../../contexts/context.jsx";
import { clearCandidates, makeNewMove } from "../../reducer/actions/move.jsx";
import { openPromotion } from "../../reducer/actions/popup.jsx";
import { getCastleDirections } from "../../arbiter/getMoves.jsx";

function Pieces() {
  const ref = useRef();
  
  const {appState,dispatch} = useAppContext();
  
  const currentPosition = appState.position[appState.position.length-1]

  const calculatePosition = e => {
    const {width,left,top} = ref.current.getBoundingClientRect()
    const size = width /8;
    const y =  Math.floor((e.clientX-left) / size);
    const x = 7 - Math.floor((e.clientY-top) / size);
    return {x,y}
  }

  const openPromotionBox = ({rank,file,x,y}) => {
    dispatch(openPromotion({
      rank: Number(rank),
      file: Number(file),
      x,
      y
    }))
  }

  const updateCastlingState = ({piece,rank,file}) => {
    const direction = getCastleDirections({
        castleDirection: appState.castleDirection,
        piece,
        file: Number(file),
        rank: Number(rank)
    })
    if (direction){
        dispatch(updateCastlingState(direction))
    }
}

  const move = e => {
    const {x,y} = calculatePosition(e)
    const [piece,file,rank] = e.dataTransfer.getData('text').split(",")

    if (appState.candidateMoves?.find(m => m[0] === x && m[1] === y)){
      if((piece === "wp" && x === 7) || (piece === "bp" && x === 0)){
        openPromotionBox({rank,file,x,y})
        return 
      }
      if(piece.endsWith('r') || piece.endsWith('k')){
        updateCastlingState({piece,rank,file})
      }
      const newPosition = arbiter.performMove({
        position:currentPosition,
        piece,rank,file,
        x,y
      })
      dispatch(makeNewMove({newPosition}))
    }
    dispatch(clearCandidates())
  }

  const onDrop = e => {
    e.preventDefault()
    move(e)
  }
  const onDragOver = e => {e.preventDefault();}

  return<div 
      ref = {ref}
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="pieces">
          {currentPosition.map((r,rank) =>
            r.map((f,file) =>
              currentPosition[rank][file]
              ?     <Piece 
                      key={rank+"-"+file}
                      file={file}
                      rank={rank}
                      piece={currentPosition[rank][file]}
                  />
              :   null
          ))}
        </div>
}
export default Pieces;