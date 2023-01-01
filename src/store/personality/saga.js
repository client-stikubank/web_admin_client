import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_PERSONALITIES,
  ADD_NEW_PERSONALITY,
  DELETE_PERSONALITY,
  UPDATE_PERSONALITY
} from './actionTypes'

import {
  getPersonalitiesSuccess,
  getPersonalitiesFail,
  addPersonalityFail,
  addPersonalitySuccess,
  updatePersonalitySuccess,
  updatePersonalityFail,
  deletePersonalitySuccess,
  deletePersonalityFail,
  loadingPersonality,
  closeModal
} from '@/store/actions'

import {
  getPersonalities,
  addNewPersonality,
  updatePersonality,
  deletePersonality
} from '@/api/personality'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchPersonalities({ payload: params }) {
  yield put(loadingPersonality(true))
  try {
    const response = yield call(getPersonalities, params)
    yield put(getPersonalitiesSuccess(response, params))
  } catch (error) {
    yield put(getPersonalitiesFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingPersonality(false))
}

function* onAddNewPersonality({ payload: personality }) {
  yield put(loadingPersonality(true))
  try {
    const response = yield call(addNewPersonality, personality)
    yield put(addPersonalitySuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(addPersonalityFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.CREATE_DATA_FAIL, 'error')
  }
  yield put(loadingPersonality(false))
}

function* onUpdatePersonality({ payload: personality }) {
  yield put(loadingPersonality(true))
  try {
    const response = yield call(updatePersonality, personality)
    yield put(updatePersonalitySuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updatePersonalityFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingPersonality(false))
}

function* onDeletePersonality({ payload: personality }) {
  yield put(loadingPersonality(true))
  try {
    yield call(deletePersonality, personality.id)
    yield put(deletePersonalitySuccess(personality))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(deletePersonalityFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(loadingPersonality(false))
}

function* personalitiesSaga() {
  yield takeEvery(GET_PERSONALITIES, fetchPersonalities)
  yield takeEvery(ADD_NEW_PERSONALITY, onAddNewPersonality)
  yield takeEvery(UPDATE_PERSONALITY, onUpdatePersonality)
  yield takeEvery(DELETE_PERSONALITY, onDeletePersonality)
}

export default personalitiesSaga
