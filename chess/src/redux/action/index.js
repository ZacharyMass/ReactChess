// redux/actions.js
import { UPDATE_BOARD, SET_SELECTED_POSITION } from './actionTypes'

// let nextTodoId = 0
// export const addTodo = content => ({
//   type: ADD_TODO,
//   payload: {
//     id: ++nextTodoId,
//     content
//   }
// })

/**
 * Update board takes the modified board and sends it to the globalstore.
 */
export function updateBoard(payload) {
  return { type: UPDATE_BOARD, payload};
}

export function setSelectedPosition(payload) {
  return { type: SET_SELECTED_POSITION, payload };
}