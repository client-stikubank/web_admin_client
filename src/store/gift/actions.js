import {
  GET_GIFTS,
  GET_GIFTS_FAIL,
  GET_GIFTS_SUCCESS,
  ADD_NEW_GIFT,
  ADD_GIFT_SUCCESS,
  ADD_GIFT_FAIL,
  UPDATE_GIFT,
  UPDATE_GIFT_SUCCESS,
  UPDATE_GIFT_FAIL,
  DELETE_GIFT,
  DELETE_GIFT_SUCCESS,
  DELETE_GIFT_FAIL,
  LOADING_GIFT
} from './actionTypes'

export const getGifts = params => ({
  type: GET_GIFTS,
  payload: params
})

export const getGiftsSuccess = (gifts, params) => ({
  type: GET_GIFTS_SUCCESS,
  payload: gifts,
  params
})

export const getGiftsFail = error => ({
  type: GET_GIFTS_FAIL,
  payload: error
})

export const addNewGift = gift => ({
  type: ADD_NEW_GIFT,
  payload: gift
})

export const addGiftSuccess = gift => ({
  type: ADD_GIFT_SUCCESS,
  payload: gift
})

export const addGiftFail = error => ({
  type: ADD_GIFT_FAIL,
  payload: error
})

export const updateGift = gift => ({
  type: UPDATE_GIFT,
  payload: gift
})

export const updateGiftSuccess = gift => ({
  type: UPDATE_GIFT_SUCCESS,
  payload: gift
})

export const updateGiftFail = error => ({
  type: UPDATE_GIFT_FAIL,
  payload: error
})

export const deleteGift = gift => ({
  type: DELETE_GIFT,
  payload: gift
})

export const deleteGiftSuccess = gift => ({
  type: DELETE_GIFT_SUCCESS,
  payload: gift
})

export const deleteGiftFail = error => ({
  type: DELETE_GIFT_FAIL,
  payload: error
})

export const loadingGift = status => ({
  type: LOADING_GIFT,
  payload: status
})
