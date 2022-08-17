import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_CAMPS,
  ADD_NEW_CAMP,
  DELETE_CAMP,
  UPDATE_CAMP
} from './actionTypes'

import {
  getCampsSuccess,
  getCampsFail,
  addCampFail,
  addCampSuccess,
  updateCampSuccess,
  updateCampFail,
  deleteCampSuccess,
  deleteCampFail,
  loadingCamp,
  closeModal
} from '@/store/actions'

import { getCamps, addNewCamp, updateCamp, deleteCamp } from '@/api/camp'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchCamps({ payload: params }) {
  yield put(loadingCamp(true))
  try {
    const response = yield call(getCamps, params)
    yield put(getCampsSuccess(response, params))
  } catch (error) {
    yield put(getCampsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingCamp(false))
}

function* onAddNewCamp({ payload: camp }) {
  yield put(loadingCamp(true))
  try {
    const response = yield call(addNewCamp, camp)
    yield put(addCampSuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(addCampFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.CREATE_DATA_FAIL, 'error')
  }
  yield put(loadingCamp(false))
}

function* onUpdateCamp({ payload: camp }) {
  yield put(loadingCamp(true))
  try {
    const response = yield call(updateCamp, camp)
    yield put(updateCampSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateCampFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingCamp(false))
}

function* onDeleteCamp({ payload: camp }) {
  yield put(loadingCamp(true))
  try {
    const response = yield call(deleteCamp, camp.id)
    yield put(deleteCampSuccess(response?.data))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(deleteCampFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(loadingCamp(false))
}

function* campsSaga() {
  yield takeEvery(GET_CAMPS, fetchCamps)
  yield takeEvery(ADD_NEW_CAMP, onAddNewCamp)
  yield takeEvery(UPDATE_CAMP, onUpdateCamp)
  yield takeEvery(DELETE_CAMP, onDeleteCamp)
}

export default campsSaga
