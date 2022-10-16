import {
  GET_TRANSACTIONS,
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS_SUCCESS,
  UPDATE_TRANSACTION,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  LOADING_TRANSACTION
} from './actionTypes'

export const getTransactions = params => ({
  type: GET_TRANSACTIONS,
  payload: params
})

export const getTransactionsSuccess = (transactions, params) => ({
  type: GET_TRANSACTIONS_SUCCESS,
  payload: transactions,
  params
})

export const getTransactionsFail = error => ({
  type: GET_TRANSACTIONS_FAIL,
  payload: error
})

export const updateTransaction = transaction => ({
  type: UPDATE_TRANSACTION,
  payload: transaction
})

export const updateTransactionSuccess = transaction => ({
  type: UPDATE_TRANSACTION_SUCCESS,
  payload: transaction
})

export const updateTransactionFail = error => ({
  type: UPDATE_TRANSACTION_FAIL,
  payload: error
})

export const loadingTransaction = status => ({
  type: LOADING_TRANSACTION,
  payload: status
})
