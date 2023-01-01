import {
  GET_ASSESSMENTS,
  GET_ASSESSMENTS_FAIL,
  GET_ASSESSMENTS_SUCCESS,
  LOADING_ASSESSMENT
} from './actionTypes'

export const getAssessments = params => ({
  type: GET_ASSESSMENTS,
  payload: params
})

export const getAssessmentsSuccess = (assessments, params) => ({
  type: GET_ASSESSMENTS_SUCCESS,
  payload: assessments,
  params
})

export const getAssessmentsFail = error => ({
  type: GET_ASSESSMENTS_FAIL,
  payload: error
})

export const loadingAssessment = status => ({
  type: LOADING_ASSESSMENT,
  payload: status
})
