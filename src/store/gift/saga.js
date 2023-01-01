import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_GIFTS,
  ADD_NEW_GIFT,
  DELETE_GIFT,
  UPDATE_GIFT
} from './actionTypes'

import {
  getGiftsSuccess,
  getGiftsFail,
  addGiftFail,
  addGiftSuccess,
  updateGiftSuccess,
  updateGiftFail,
  deleteGiftSuccess,
  deleteGiftFail,
  loadingGift,
  closeModal
} from '@/store/actions'

import { getGifts, addNewGift, updateGift, deleteGift } from '@/api/gift'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchGifts({ payload: params }) {
  yield put(loadingGift(true))
  try {
    const response = yield call(getGifts, params)
    yield put(getGiftsSuccess(response, params))
  } catch (error) {
    yield put(getGiftsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingGift(false))
}

function* onAddNewGift({ payload: gift }) {
  yield put(loadingGift(true))
  try {
    const response = yield call(addNewGift, gift)
    yield put(addGiftSuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(addGiftFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.CREATE_DATA_FAIL, 'error')
  }
  yield put(loadingGift(false))
}

function* onUpdateGift({ payload: gift }) {
  yield put(loadingGift(true))
  try {
    const response = yield call(updateGift, gift)
    yield put(updateGiftSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateGiftFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingGift(false))
}

function* onDeleteGift({ payload: gift }) {
  yield put(loadingGift(true))
  try {
    yield call(deleteGift, gift.id)
    yield put(deleteGiftSuccess(gift))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(deleteGiftFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(loadingGift(false))
}

function* giftsSaga() {
  yield takeEvery(GET_GIFTS, fetchGifts)
  yield takeEvery(ADD_NEW_GIFT, onAddNewGift)
  yield takeEvery(UPDATE_GIFT, onUpdateGift)
  yield takeEvery(DELETE_GIFT, onDeleteGift)
}

export default giftsSaga
