import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_CARNIVAL_GIFTS,
  ADD_NEW_CARNIVAL_GIFT,
  DELETE_CARNIVAL_GIFT,
  UPDATE_CARNIVAL_GIFT
} from './actionTypes'

import {
  getCarnivalGiftsSuccess,
  getCarnivalGiftsFail,
  addCarnivalGiftFail,
  addCarnivalGiftSuccess,
  updateCarnivalGiftSuccess,
  updateCarnivalGiftFail,
  deleteCarnivalGiftSuccess,
  deleteCarnivalGiftFail,
  loadingCarnivalGift,
  closeModal
} from '@/store/actions'

import {
  getCarnivalGifts,
  addNewCarnivalGift,
  updateCarnivalGift,
  deleteCarnivalGift
} from '@/api/carnival-gift'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchCarnivalGifts({ payload: params }) {
  yield put(loadingCarnivalGift(true))
  try {
    const response = yield call(getCarnivalGifts, params)
    yield put(getCarnivalGiftsSuccess(response, params))
  } catch (error) {
    yield put(getCarnivalGiftsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingCarnivalGift(false))
}

function* onAddNewCarnivalGift({ payload: carnivalGift }) {
  yield put(loadingCarnivalGift(true))
  try {
    const response = yield call(addNewCarnivalGift, carnivalGift)
    yield put(addCarnivalGiftSuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(addCarnivalGiftFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.CREATE_DATA_FAIL, 'error')
  }
  yield put(loadingCarnivalGift(false))
}

function* onUpdateCarnivalGift({ payload: carnivalGift }) {
  yield put(loadingCarnivalGift(true))
  try {
    const response = yield call(updateCarnivalGift, carnivalGift)
    yield put(updateCarnivalGiftSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateCarnivalGiftFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingCarnivalGift(false))
}

function* onDeleteCarnivalGift({ payload: carnivalGift }) {
  yield put(loadingCarnivalGift(true))
  try {
    yield call(deleteCarnivalGift, carnivalGift.id)
    yield put(deleteCarnivalGiftSuccess(carnivalGift))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(deleteCarnivalGiftFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(loadingCarnivalGift(false))
}

function* carnivalGiftsSaga() {
  yield takeEvery(GET_CARNIVAL_GIFTS, fetchCarnivalGifts)
  yield takeEvery(ADD_NEW_CARNIVAL_GIFT, onAddNewCarnivalGift)
  yield takeEvery(UPDATE_CARNIVAL_GIFT, onUpdateCarnivalGift)
  yield takeEvery(DELETE_CARNIVAL_GIFT, onDeleteCarnivalGift)
}

export default carnivalGiftsSaga
