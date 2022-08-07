import { SET_MODAL, CLOSE_MODAL } from "./actionTypes"

export const setModal = (options) => ({
  type: SET_MODAL,
  payload: options
})

export const closeModal = (options) => ({
  type: CLOSE_MODAL,
  payload: options,
})