import {
  GET_CARNIVAL_GIFTS,
  GET_CARNIVAL_GIFTS_FAIL,
  GET_CARNIVAL_GIFTS_SUCCESS,
  ADD_NEW_CARNIVAL_GIFT,
  ADD_CARNIVAL_GIFT_SUCCESS,
  ADD_CARNIVAL_GIFT_FAIL,
  UPDATE_CARNIVAL_GIFT,
  UPDATE_CARNIVAL_GIFT_SUCCESS,
  UPDATE_CARNIVAL_GIFT_FAIL,
  DELETE_CARNIVAL_GIFT,
  DELETE_CARNIVAL_GIFT_SUCCESS,
  DELETE_CARNIVAL_GIFT_FAIL,
  LOADING_CARNIVAL_GIFT
} from './actionTypes'

export const getCarnivalGifts = params => ({
  type: GET_CARNIVAL_GIFTS,
  payload: params
})

export const getCarnivalGiftsSuccess = (carnivalGifts, params) => ({
  type: GET_CARNIVAL_GIFTS_SUCCESS,
  payload: carnivalGifts,
  params
})

export const getCarnivalGiftsFail = error => ({
  type: GET_CARNIVAL_GIFTS_FAIL,
  payload: error
})

export const addNewCarnivalGift = carnivalGift => ({
  type: ADD_NEW_CARNIVAL_GIFT,
  payload: carnivalGift
})

export const addCarnivalGiftSuccess = carnivalGift => ({
  type: ADD_CARNIVAL_GIFT_SUCCESS,
  payload: carnivalGift
})

export const addCarnivalGiftFail = error => ({
  type: ADD_CARNIVAL_GIFT_FAIL,
  payload: error
})

export const updateCarnivalGift = carnivalGift => ({
  type: UPDATE_CARNIVAL_GIFT,
  payload: carnivalGift
})

export const updateCarnivalGiftSuccess = carnivalGift => ({
  type: UPDATE_CARNIVAL_GIFT_SUCCESS,
  payload: carnivalGift
})

export const updateCarnivalGiftFail = error => ({
  type: UPDATE_CARNIVAL_GIFT_FAIL,
  payload: error
})

export const deleteCarnivalGift = carnivalGift => ({
  type: DELETE_CARNIVAL_GIFT,
  payload: carnivalGift
})

export const deleteCarnivalGiftSuccess = carnivalGift => ({
  type: DELETE_CARNIVAL_GIFT_SUCCESS,
  payload: carnivalGift
})

export const deleteCarnivalGiftFail = error => ({
  type: DELETE_CARNIVAL_GIFT_FAIL,
  payload: error
})

export const loadingCarnivalGift = status => ({
  type: LOADING_CARNIVAL_GIFT,
  payload: status
})
