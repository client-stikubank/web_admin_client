import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_ASSESSMENT_QUESTIONS,
  ADD_NEW_ASSESSMENT_QUESTION,
  DELETE_ASSESSMENT_QUESTION,
  UPDATE_ASSESSMENT_QUESTION
} from './actionTypes'

import {
  getAssessmentQuestionsSuccess,
  getAssessmentQuestionsFail,
  addAssessmentQuestionFail,
  addAssessmentQuestionSuccess,
  updateAssessmentQuestionSuccess,
  updateAssessmentQuestionFail,
  deleteAssessmentQuestionSuccess,
  deleteAssessmentQuestionFail,
  loadingAssessmentQuestion,
  closeModal
} from '@/store/actions'

import { getAssessmentQuestions, addNewAssessmentQuestion, updateAssessmentQuestion, deleteAssessmentQuestion } from '@/api/assessment-question'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchAssessmentQuestions({ payload: params }) {
  yield put(loadingAssessmentQuestion(true))
  try {
    const response = yield call(getAssessmentQuestions, params)
    yield put(getAssessmentQuestionsSuccess(response, params))
  } catch (error) {
    yield put(getAssessmentQuestionsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingAssessmentQuestion(false))
}

function* onAddNewAssessmentQuestion({ payload: assessmentQuestion }) {
  yield put(loadingAssessmentQuestion(true))
  try {
    const response = yield call(addNewAssessmentQuestion, assessmentQuestion)
    yield put(addAssessmentQuestionSuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(addAssessmentQuestionFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.CREATE_DATA_FAIL, 'error')
  }
  yield put(loadingAssessmentQuestion(false))
}

function* onUpdateAssessmentQuestion({ payload: assessmentQuestion }) {
  yield put(loadingAssessmentQuestion(true))
  try {
    const response = yield call(updateAssessmentQuestion, assessmentQuestion)
    yield put(updateAssessmentQuestionSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateAssessmentQuestionFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingAssessmentQuestion(false))
}

function* onDeleteAssessmentQuestion({ payload: assessmentQuestion }) {
  yield put(loadingAssessmentQuestion(true))
  try {
    const response = yield call(deleteAssessmentQuestion, assessmentQuestion.id)
    yield put(deleteAssessmentQuestionSuccess(response?.data))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(deleteAssessmentQuestionFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(loadingAssessmentQuestion(false))
}

function* assessmentQuestionsSaga() {
  yield takeEvery(GET_ASSESSMENT_QUESTIONS, fetchAssessmentQuestions)
  yield takeEvery(ADD_NEW_ASSESSMENT_QUESTION, onAddNewAssessmentQuestion)
  yield takeEvery(UPDATE_ASSESSMENT_QUESTION, onUpdateAssessmentQuestion)
  yield takeEvery(DELETE_ASSESSMENT_QUESTION, onDeleteAssessmentQuestion)
}

export default assessmentQuestionsSaga
