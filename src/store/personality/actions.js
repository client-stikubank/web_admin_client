import {
  GET_PERSONALITIES,
  GET_PERSONALITIES_FAIL,
  GET_PERSONALITIES_SUCCESS,
  ADD_NEW_PERSONALITY,
  ADD_PERSONALITY_SUCCESS,
  ADD_PERSONALITY_FAIL,
  UPDATE_PERSONALITY,
  UPDATE_PERSONALITY_SUCCESS,
  UPDATE_PERSONALITY_FAIL,
  DELETE_PERSONALITY,
  DELETE_PERSONALITY_SUCCESS,
  DELETE_PERSONALITY_FAIL,
  LOADING_PERSONALITY
} from './actionTypes'

export const getPersonalities = params => ({
  type: GET_PERSONALITIES,
  payload: params
})

export const getPersonalitiesSuccess = (personalities, params) => ({
  type: GET_PERSONALITIES_SUCCESS,
  payload: personalities,
  params
})

export const getPersonalitiesFail = error => ({
  type: GET_PERSONALITIES_FAIL,
  payload: error
})

export const addNewPersonality = personality => ({
  type: ADD_NEW_PERSONALITY,
  payload: personality
})

export const addPersonalitySuccess = personality => ({
  type: ADD_PERSONALITY_SUCCESS,
  payload: personality
})

export const addPersonalityFail = error => ({
  type: ADD_PERSONALITY_FAIL,
  payload: error
})

export const updatePersonality = personality => ({
  type: UPDATE_PERSONALITY,
  payload: personality
})

export const updatePersonalitySuccess = personality => ({
  type: UPDATE_PERSONALITY_SUCCESS,
  payload: personality
})

export const updatePersonalityFail = error => ({
  type: UPDATE_PERSONALITY_FAIL,
  payload: error
})

export const deletePersonality = personality => ({
  type: DELETE_PERSONALITY,
  payload: personality
})

export const deletePersonalitySuccess = personality => ({
  type: DELETE_PERSONALITY_SUCCESS,
  payload: personality
})

export const deletePersonalityFail = error => ({
  type: DELETE_PERSONALITY_FAIL,
  payload: error
})

export const loadingPersonality = status => ({
  type: LOADING_PERSONALITY,
  payload: status
})
