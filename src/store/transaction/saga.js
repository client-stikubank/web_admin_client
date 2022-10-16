import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_TRANSACTIONS, UPDATE_TRANSACTION } from './actionTypes'

import {
  getTransactionsSuccess,
  getTransactionsFail,
  updateTransactionSuccess,
  updateTransactionFail,
  loadingTransaction,
  closeModal
} from '@/store/actions'

import { getTransactions, updateTransaction } from '@/api/transaction'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchTransactions({ payload: params }) {
  yield put(loadingTransaction(true))
  try {
    const response = yield call(getTransactions, params)
    yield put(getTransactionsSuccess(response, params))
  } catch (error) {
    yield put(getTransactionsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingTransaction(false))
}

function* onUpdateTransaction({ payload: transaction }) {
  yield put(loadingTransaction(true))
  try {
    const response = yield call(updateTransaction, transaction)
    yield put(updateTransactionSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateTransactionFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingTransaction(false))
}

function* transactionsSaga() {
  yield takeEvery(GET_TRANSACTIONS, fetchTransactions)
  yield takeEvery(UPDATE_TRANSACTION, onUpdateTransaction)
}

export default transactionsSaga
