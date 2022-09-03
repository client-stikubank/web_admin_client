import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_COINS,
  UPDATE_COIN
} from './actionTypes'

import {
  getCoinsSuccess,
  getCoinsFail,
  updateCoinSuccess,
  updateCoinFail,
  loadingCoin,
  closeModal
} from '@/store/actions'

import { getCoins, updateCoin } from '@/api/coin'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchCoins({ payload: params }) {
  yield put(loadingCoin(true))
  try {
    const response = yield call(getCoins, params)
    yield put(getCoinsSuccess(response, params))
  } catch (error) {
    yield put(getCoinsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingCoin(false))
}

function* onUpdateCoin({ payload: coin }) {
  yield put(loadingCoin(true))
  try {
    const response = yield call(updateCoin, coin)
    yield put(updateCoinSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateCoinFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingCoin(false))
}

function* coinsSaga() {
  yield takeEvery(GET_COINS, fetchCoins)
  yield takeEvery(UPDATE_COIN, onUpdateCoin)
}

export default coinsSaga
