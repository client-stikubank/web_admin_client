import {
  GET_CARNIVALS,
  GET_CARNIVALS_FAIL,
  GET_CARNIVALS_SUCCESS,
  GET_CARNIVAL_DETAIL,
  ADD_NEW_CARNIVAL,
  ADD_CARNIVAL_SUCCESS,
  ADD_CARNIVAL_FAIL,
  UPDATE_CARNIVAL,
  UPDATE_CARNIVAL_SUCCESS,
  UPDATE_CARNIVAL_FAIL,
  DELETE_CARNIVAL,
  DELETE_CARNIVAL_SUCCESS,
  DELETE_CARNIVAL_FAIL,
  GET_CARNIVAL_DETAIL_FAIL,
  GET_CARNIVAL_DETAIL_SUCCESS,
  TOGGLE_LOADING
} from './actionTypes'

export const getCarnivals = params => ({
  type: GET_CARNIVALS,
  payload: params
})

export const getCarnivalsSuccess = (carnivals, params) => ({
  type: GET_CARNIVALS_SUCCESS,
  payload: carnivals,
  params
})

export const addNewCarnival = carnival => ({
  type: ADD_NEW_CARNIVAL,
  payload: carnival
})

export const addCarnivalSuccess = carnival => ({
  type: ADD_CARNIVAL_SUCCESS,
  payload: carnival
})

export const addCarnivalFail = error => ({
  type: ADD_CARNIVAL_FAIL,
  payload: error
})

export const updateCarnival = carnival => ({
  type: UPDATE_CARNIVAL,
  payload: carnival
})

export const updateCarnivalSuccess = carnival => ({
  type: UPDATE_CARNIVAL_SUCCESS,
  payload: carnival
})

export const updateCarnivalFail = error => ({
  type: UPDATE_CARNIVAL_FAIL,
  payload: error
})

export const deleteCarnival = carnival => ({
  type: DELETE_CARNIVAL,
  payload: carnival
})

export const deleteCarnivalSuccess = carnival => ({
  type: DELETE_CARNIVAL_SUCCESS,
  payload: carnival
})

export const deleteCarnivalFail = error => ({
  type: DELETE_CARNIVAL_FAIL,
  payload: error
})

export const getCarnivalsFail = error => ({
  type: GET_CARNIVALS_FAIL,
  payload: error
})

export const getCarnivalDetail = carnivalId => ({
  type: GET_CARNIVAL_DETAIL,
  carnivalId
})

export const getCarnivalDetailSuccess = carnivalDetails => ({
  type: GET_CARNIVAL_DETAIL_SUCCESS,
  payload: carnivalDetails
})

export const getCarnivalDetailFail = error => ({
  type: GET_CARNIVAL_DETAIL_FAIL,
  payload: error
})

export const toggleLoading = status => ({
  type: TOGGLE_LOADING,
  payload: status
})
