import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_ASSESSMENTS } from './actionTypes'

import {
  getAssessmentsSuccess,
  getAssessmentsFail,
  loadingAssessment,
  closeModal
} from '@/store/actions'

import { getAssessments } from '@/api/assessment'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchAssessments({ payload: params }) {
  yield put(loadingAssessment(true))
  try {
    const response = yield call(getAssessments, params)
    yield put(getAssessmentsSuccess(response, params))
  } catch (error) {
    yield put(getAssessmentsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingAssessment(false))
}

function* assessmentsSaga() {
  yield takeEvery(GET_ASSESSMENTS, fetchAssessments)
}

export default assessmentsSaga
