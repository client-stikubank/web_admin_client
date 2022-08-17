import {
  GET_STAGES,
  GET_STAGES_SUCCESS,
  GET_STAGES_FAIL,
  UPDATE_STAGE,
  UPDATE_STAGE_SUCCESS,
  UPDATE_STAGE_FAIL,
  ADD_STAGE_CAMP,
  ADD_STAGE_CAMP_SUCCESS,
  ADD_STAGE_CAMP_FAIL,
  DELETE_STAGE_CAMP,
  DELETE_STAGE_CAMP_SUCCESS,
  DELETE_STAGE_CAMP_FAIL,
  LOADING_STAGE
} from './actionTypes'

export const getStages = params => ({
  type: GET_STAGES,
  payload: params
})

export const getStagesSuccess = (stages, params) => ({
  type: GET_STAGES_SUCCESS,
  payload: stages,
  params
})

export const getStagesFail = error => ({
  type: GET_STAGES_FAIL,
  payload: error
})

export const updateStage = stage => ({
  type: UPDATE_STAGE,
  payload: stage
})

export const updateStageSuccess = stage => ({
  type: UPDATE_STAGE_SUCCESS,
  payload: stage
})

export const updateStageFail = error => ({
  type: UPDATE_STAGE_FAIL,
  payload: error
})

export const addStageCamp = stageCamp => ({
  type: ADD_STAGE_CAMP,
  payload: stageCamp
})

export const addStageCampSuccess = stageCamp => ({
  type: ADD_STAGE_CAMP_SUCCESS,
  payload: stageCamp
})

export const addStageCampFail = error => ({
  type: ADD_STAGE_CAMP_FAIL,
  payload: error
})

export const deleteStageCamp = stageCamp => ({
  type: DELETE_STAGE_CAMP,
  payload: stageCamp
})

export const deleteStageCampSuccess = stageCamp => ({
  type: DELETE_STAGE_CAMP_SUCCESS,
  payload: stageCamp
})

export const deleteStageCampFail = error => ({
  type: DELETE_STAGE_CAMP_FAIL,
  payload: error
})

export const loadingStage = status => ({
  type: LOADING_STAGE,
  payload: status
})
