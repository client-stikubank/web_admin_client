import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_STOCKS, UPDATE_STOCK } from './actionTypes'

import {
  getStocksSuccess,
  getStocksFail,
  updateStockSuccess,
  updateStockFail,
  loadingStock,
  closeModal
} from '@/store/actions'

import { getStocks, updateStock } from '@/api/stock'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchStocks({ payload: params }) {
  yield put(loadingStock(true))
  try {
    const response = yield call(getStocks, params)
    yield put(getStocksSuccess(response, params))
  } catch (error) {
    yield put(getStocksFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingStock(false))
}

function* onUpdateStock({ payload: stock }) {
  yield put(loadingStock(true))
  try {
    const response = yield call(updateStock, stock)
    yield put(updateStockSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateStockFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingStock(false))
}

function* stocksSaga() {
  yield takeEvery(GET_STOCKS, fetchStocks)
  yield takeEvery(UPDATE_STOCK, onUpdateStock)
}

export default stocksSaga
