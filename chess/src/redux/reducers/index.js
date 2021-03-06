import {
  UPDATE_BOARD, SET_SELECTED_POSITION, SET_POTENTIAL_MOVES,
  NEXT_PLAYER_TURN, NEXT_MOVE_STATE, REVERT_TO_SELECT_PIECE, HANDLE_WHITE_REMOVE_PIECE,
  HANDLE_BLACK_REMOVE_PIECE, SET_GAME_OVER, INITIALIZE_PAWN_WARS, INITIALIZE_CHESS, SET_GAME_MODE
} from '../action/actionTypes';
import populateGameBoard, { initialWhitePiecesInPlay, initialBlackPiecesInPlay, populatePawnWars, initializeWhitePawnWarsPiecesInPlay, initializeBlackPawnWarsPiecesInPlay } from '../../utility/game-initialization';
import { SELECT_PIECE, SELECT_AVAILABLE_MOVE, WHITE, BLACK } from '../string-constants';
import QueenPiece from '../../models/pieces/queen-piece';

const initialState = {
  board: populateGameBoard(),
  selectedPosition: -1,
  potentialMoves: [],
  playerTurn: WHITE,
  moveState: SELECT_PIECE,
  whitePiecesInPlay: initialWhitePiecesInPlay(),
  blackPiecesInPlay: initialBlackPiecesInPlay(),
  gameMode: "chess"
}

function rootReducer(state = initialState, action) {
  if (action.type === UPDATE_BOARD) {
    return Object.assign({}, state, {
      board: action.payload
    });
  } else if (action.type === SET_SELECTED_POSITION) {
    return Object.assign({}, state, {
      selectedPosition: action.payload
    });
  } else if (action.type === SET_POTENTIAL_MOVES) {
    return Object.assign({}, state, {
      potentialMoves: action.payload
    });
  } else if (action.type === NEXT_PLAYER_TURN) {
    if (state.playerTurn === WHITE) {
      return Object.assign({}, state, {
        playerTurn: BLACK
      });
    } else {
      return Object.assign({}, state, {
        playerTurn: BLACK
      })
    }
  } else if (action.type === NEXT_MOVE_STATE) {
    if (state.moveState === SELECT_PIECE) {
      return Object.assign({}, state, {
        moveState: SELECT_AVAILABLE_MOVE
      });
    } else {
      if (state.playerTurn === WHITE) {
        return Object.assign({}, state, {
          moveState: SELECT_PIECE,
          playerTurn: BLACK
        });
      } else {
        return Object.assign({}, state, {
          moveState: SELECT_PIECE,
          playerTurn: WHITE
        });
      }
    }

  } else if (action.type === REVERT_TO_SELECT_PIECE) {
    if (state.moveState !== SELECT_PIECE) {
      return Object.assign({}, state, {
        moveState: SELECT_PIECE
      });
    }
  } else if (action.type === HANDLE_WHITE_REMOVE_PIECE ) {
      let foundItem = state.whitePiecesInPlay.find(x => x.typeOfPiece === action.payload.typeOfPiece);
      if(action.payload.typeOfPiece === "pawn" && !foundItem) {
        foundItem = new QueenPiece(action.payload.player);
      }
      let piecesInPlay = state.whitePiecesInPlay;
      for(let i = 0; i < piecesInPlay.length; i++) {
        if(foundItem && piecesInPlay[i].typeOfPiece === foundItem.typeOfPiece) {
          piecesInPlay.splice(i, 1);
          break;
        }
      }
      return Object.assign({}, state, {
        whitePiecesInPlay: piecesInPlay
      });
  } else if (action.type === HANDLE_BLACK_REMOVE_PIECE ) {
    let item = state.blackPiecesInPlay.find(x => x.typeOfPiece === action.payload.typeOfPiece);
    if(action.payload.typeOfPiece === "pawn" && !item) {
      item = new QueenPiece(action.payload.player);
    }
    let itemsInPlay = state.blackPiecesInPlay;
    for(let i = 0; i < itemsInPlay.length; i++) {
      if(item && itemsInPlay[i].typeOfPiece === item.typeOfPiece) {
        itemsInPlay.splice(i, 1);
        break;
      }
    }
    return Object.assign({}, state, {
      blackPiecesInPlay: itemsInPlay
    });
  } else if (action.type === SET_GAME_OVER) {
    return Object.assign({}, state, {
      moveState: "GAME_OVER"
    });
  } else if (action.type === INITIALIZE_PAWN_WARS) {
    return Object.assign({}, state, {
      board: populatePawnWars()
    });
  } else if (action.type === INITIALIZE_CHESS) {
    return Object.assign({}, state, {
      board: populateGameBoard()
    });
  } else if (action.type === SET_GAME_MODE) {
    console.log('ITEM TRIGGERED: ' + action.payload);
    if(action.payload === "pawnWars") {
      return Object.assign({}, state, {
        gameMode: action.payload,
        whitePiecesInPlay: initializeWhitePawnWarsPiecesInPlay(),
        blackPiecesInPlay: initializeBlackPawnWarsPiecesInPlay()
      });
    } else {
      return Object.assign({}, state, {
        gameMode: action.payload,
        whitePiecesInPlay: initialWhitePiecesInPlay(),
        blackPiecesInPlay: initialBlackPiecesInPlay()
      });
    }
  }
  return state;
}

export default rootReducer;