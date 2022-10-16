import {
  GET_STOCKS,
  GET_STOCKS_FAIL,
  GET_STOCKS_SUCCESS,
  UPDATE_STOCK,
  UPDATE_STOCK_SUCCESS,
  UPDATE_STOCK_FAIL,
  LOADING_STOCK
} from './actionTypes'

export const getStocks = params => ({
  type: GET_STOCKS,
  payload: params
})

export const getStocksSuccess = (stocks, params) => ({
  type: GET_STOCKS_SUCCESS,
  payload: stocks,
  params
})

export const getStocksFail = error => ({
  type: GET_STOCKS_FAIL,
  payload: error
})

export const updateStock = stock => ({
  type: UPDATE_STOCK,
  payload: stock
})

export const updateStockSuccess = stock => ({
  type: UPDATE_STOCK_SUCCESS,
  payload: stock
})

export const updateStockFail = error => ({
  type: UPDATE_STOCK_FAIL,
  payload: error
})

export const loadingStock = status => ({
  type: LOADING_STOCK,
  payload: status
})
