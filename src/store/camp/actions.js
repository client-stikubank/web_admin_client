import {
  GET_CAMPS,
  GET_CAMPS_FAIL,
  GET_CAMPS_SUCCESS,
  ADD_NEW_CAMP,
  ADD_CAMP_SUCCESS,
  ADD_CAMP_FAIL,
  UPDATE_CAMP,
  UPDATE_CAMP_SUCCESS,
  UPDATE_CAMP_FAIL,
  DELETE_CAMP,
  DELETE_CAMP_SUCCESS,
  DELETE_CAMP_FAIL,
  LOADING_CAMP
} from './actionTypes'

export const getCamps = params => ({
  type: GET_CAMPS,
  payload: params
})

export const getCampsSuccess = (camps, params) => ({
  type: GET_CAMPS_SUCCESS,
  payload: camps,
  params
})

export const getCampsFail = error => ({
  type: GET_CAMPS_FAIL,
  payload: error
})

export const addNewCamp = camp => ({
  type: ADD_NEW_CAMP,
  payload: camp
})

export const addCampSuccess = camp => ({
  type: ADD_CAMP_SUCCESS,
  payload: camp
})

export const addCampFail = error => ({
  type: ADD_CAMP_FAIL,
  payload: error
})

export const updateCamp = camp => ({
  type: UPDATE_CAMP,
  payload: camp
})

export const updateCampSuccess = camp => ({
  type: UPDATE_CAMP_SUCCESS,
  payload: camp
})

export const updateCampFail = error => ({
  type: UPDATE_CAMP_FAIL,
  payload: error
})

export const deleteCamp = camp => ({
  type: DELETE_CAMP,
  payload: camp
})

export const deleteCampSuccess = camp => ({
  type: DELETE_CAMP_SUCCESS,
  payload: camp
})

export const deleteCampFail = error => ({
  type: DELETE_CAMP_FAIL,
  payload: error
})

export const loadingCamp = status => ({
  type: LOADING_CAMP,
  payload: status
})
