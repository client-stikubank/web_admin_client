import {
  GET_ASSESSMENT_QUESTIONS,
  GET_ASSESSMENT_QUESTIONS_FAIL,
  GET_ASSESSMENT_QUESTIONS_SUCCESS,
  ADD_NEW_ASSESSMENT_QUESTION,
  ADD_ASSESSMENT_QUESTION_SUCCESS,
  ADD_ASSESSMENT_QUESTION_FAIL,
  UPDATE_ASSESSMENT_QUESTION,
  UPDATE_ASSESSMENT_QUESTION_SUCCESS,
  UPDATE_ASSESSMENT_QUESTION_FAIL,
  DELETE_ASSESSMENT_QUESTION,
  DELETE_ASSESSMENT_QUESTION_SUCCESS,
  DELETE_ASSESSMENT_QUESTION_FAIL,
  LOADING_ASSESSMENT_QUESTION
} from './actionTypes'

export const getAssessmentQuestions = params => ({
  type: GET_ASSESSMENT_QUESTIONS,
  payload: params
})

export const getAssessmentQuestionsSuccess = (assessmentQuestions, params) => ({
  type: GET_ASSESSMENT_QUESTIONS_SUCCESS,
  payload: assessmentQuestions,
  params
})

export const getAssessmentQuestionsFail = error => ({
  type: GET_ASSESSMENT_QUESTIONS_FAIL,
  payload: error
})

export const addNewAssessmentQuestion = assessmentQuestion => ({
  type: ADD_NEW_ASSESSMENT_QUESTION,
  payload: assessmentQuestion
})

export const addAssessmentQuestionSuccess = assessmentQuestion => ({
  type: ADD_ASSESSMENT_QUESTION_SUCCESS,
  payload: assessmentQuestion
})

export const addAssessmentQuestionFail = error => ({
  type: ADD_ASSESSMENT_QUESTION_FAIL,
  payload: error
})

export const updateAssessmentQuestion = assessmentQuestion => ({
  type: UPDATE_ASSESSMENT_QUESTION,
  payload: assessmentQuestion
})

export const updateAssessmentQuestionSuccess = assessmentQuestion => ({
  type: UPDATE_ASSESSMENT_QUESTION_SUCCESS,
  payload: assessmentQuestion
})

export const updateAssessmentQuestionFail = error => ({
  type: UPDATE_ASSESSMENT_QUESTION_FAIL,
  payload: error
})

export const deleteAssessmentQuestion = assessmentQuestion => ({
  type: DELETE_ASSESSMENT_QUESTION,
  payload: assessmentQuestion
})

export const deleteAssessmentQuestionSuccess = assessmentQuestion => ({
  type: DELETE_ASSESSMENT_QUESTION_SUCCESS,
  payload: assessmentQuestion
})

export const deleteAssessmentQuestionFail = error => ({
  type: DELETE_ASSESSMENT_QUESTION_FAIL,
  payload: error
})

export const loadingAssessmentQuestion = status => ({
  type: LOADING_ASSESSMENT_QUESTION,
  payload: status
})
