import {
  GET_STAGES_SUCCESS,
  UPDATE_STAGE,
  UPDATE_STAGE_SUCCESS,
  UPDATE_STAGE_FAIL
} from './actionTypes'

export const getStagesSuccess = stages => ({
  type: GET_STAGES_SUCCESS,
  payload: stages
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
