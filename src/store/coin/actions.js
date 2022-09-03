import {
  GET_COINS,
  GET_COINS_FAIL,
  GET_COINS_SUCCESS,
  UPDATE_COIN,
  UPDATE_COIN_SUCCESS,
  UPDATE_COIN_FAIL,
  LOADING_COIN
} from './actionTypes'

export const getCoins = params => ({
  type: GET_COINS,
  payload: params
})

export const getCoinsSuccess = (coins, params) => ({
  type: GET_COINS_SUCCESS,
  payload: coins,
  params
})

export const getCoinsFail = error => ({
  type: GET_COINS_FAIL,
  payload: error
})

export const updateCoin = coin => ({
  type: UPDATE_COIN,
  payload: coin
})

export const updateCoinSuccess = coin => ({
  type: UPDATE_COIN_SUCCESS,
  payload: coin
})

export const updateCoinFail = error => ({
  type: UPDATE_COIN_FAIL,
  payload: error
})

export const loadingCoin = status => ({
  type: LOADING_COIN,
  payload: status
})
