import { SET_MODAL, CLOSE_MODAL } from "./actionTypes"

const INIT_STATE = {
  type: undefined,
  show: false
}

const modal = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        type: action.payload.type,
        show: action.payload.show
      }
    case CLOSE_MODAL:
      return INIT_STATE
    default:
      return state
  }
}

export default modal