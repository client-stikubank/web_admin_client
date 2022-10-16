import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_CARNIVALS,
  GET_CARNIVAL_DETAIL,
  ADD_NEW_CARNIVAL,
  UPDATE_CARNIVAL,
  DELETE_CARNIVAL,
  ACTIVATE_CARNIVAL
} from './actionTypes'

import {
  getCarnivalsSuccess,
  getCarnivalsFail,
  getCarnivalDetailSuccess,
  getCarnivalDetailFail,
  addCarnivalFail,
  addCarnivalSuccess,
  updateCarnivalSuccess,
  updateCarnivalFail,
  deleteCarnivalSuccess,
  deleteCarnivalFail,
  activateCarnivalSuccess,
  activateCarnivalFail,
  toggleLoading,
  closeModal
} from '../actions'

import {
  getCarnivals,
  getCarnivalsDetails,
  addNewCarnival,
  updateCarnival,
  deleteCarnival,
  activateCarnival
} from '@/api/carnival'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchCarnivals({ payload: params }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getCarnivals, params)
    yield put(getCarnivalsSuccess(response, params))
  } catch (error) {
    yield put(getCarnivalsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(toggleLoading(false))
}

function* fetchCarnivalDetail({ carnivalId }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(getCarnivalsDetails, carnivalId)
    yield put(getCarnivalDetailSuccess(response))
  } catch (error) {
    yield put(getCarnivalDetailFail(error))
  }
  yield put(toggleLoading(false))
}

function* onAddNewCarnival({ payload: carnival }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(addNewCarnival, carnival)
    yield put(addCarnivalSuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
  } catch (error) {
    yield put(addCarnivalFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.CREATE_DATA_FAIL, 'error')
  }
  yield put(toggleLoading(false))
}

function* onUpdateCarnival({ payload: carnival }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(updateCarnival, carnival)
    yield put(updateCarnivalSuccess(response))
    yield put(closeModal())
    toast(message.UPDATE_DATA_SUCCESS, 'success')
  } catch (error) {
    yield put(updateCarnivalFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(toggleLoading(false))
}

function* onDeleteCarnival({ payload: carnival }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(deleteCarnival, carnival)
    yield put(deleteCarnivalSuccess(response))
    toast(message.DELETE_DATA_SUCCESS, 'success')
  } catch (error) {
    yield put(deleteCarnivalFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(toggleLoading(true))
}

function* onActivateCarnival({ payload: carnival }) {
  yield put(toggleLoading(true))
  try {
    const response = yield call(activateCarnival, carnival)
    yield put(activateCarnivalSuccess(response))
    yield put(closeModal())
    toast(message.ACTIVATE_DATA_SUCCESS, 'success')
  } catch (error) {
    yield put(activateCarnivalFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(toggleLoading(true))
}

function* carnivalsSaga() {
  yield takeEvery(GET_CARNIVALS, fetchCarnivals)
  yield takeEvery(GET_CARNIVAL_DETAIL, fetchCarnivalDetail)
  yield takeEvery(ADD_NEW_CARNIVAL, onAddNewCarnival)
  yield takeEvery(UPDATE_CARNIVAL, onUpdateCarnival)
  yield takeEvery(DELETE_CARNIVAL, onDeleteCarnival)
  yield takeEvery(ACTIVATE_CARNIVAL, onActivateCarnival)
}

export default carnivalsSaga
