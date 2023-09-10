import {
  GET_QRCLUES,
  GET_QRCLUES_FAIL,
  GET_QRCLUES_SUCCESS,
  ADD_NEW_QRCLUE,
  ADD_QRCLUE_SUCCESS,
  ADD_QRCLUE_FAIL,
  UPDATE_QRCLUE,
  UPDATE_QRCLUE_SUCCESS,
  UPDATE_QRCLUE_FAIL,
  DELETE_QRCLUE,
  DELETE_QRCLUE_SUCCESS,
  DELETE_QRCLUE_FAIL,
  LOADING_QRCLUE,
} from "./actionTypes";

export const getQrclues = (params) => ({
  type: GET_QRCLUES,
  payload: params,
});

export const getQrcluesSuccess = (qrclues, params) => ({
  type: GET_QRCLUES_SUCCESS,
  payload: qrclues,
  params,
});

export const getQrcluesFail = (error) => ({
  type: GET_QRCLUES_FAIL,
  payload: error,
});

export const addNewQrclue = (qrclue) => ({
  type: ADD_NEW_QRCLUE,
  payload: qrclue,
});

export const addQrclueSuccess = (qrclue) => ({
  type: ADD_QRCLUE_SUCCESS,
  payload: qrclue,
});

export const addQrclueFail = (error) => ({
  type: ADD_QRCLUE_FAIL,
  payload: error,
});

export const updateQrclue = (qrclue) => ({
  type: UPDATE_QRCLUE,
  payload: qrclue,
});

export const updateQrclueSuccess = (qrclue) => ({
  type: UPDATE_QRCLUE_SUCCESS,
  payload: qrclue,
});

export const updateQrclueFail = (error) => ({
  type: UPDATE_QRCLUE_FAIL,
  payload: error,
});

export const deleteQrclue = (qrclue) => ({
  type: DELETE_QRCLUE,
  payload: qrclue,
});

export const deleteQrclueSuccess = (qrclue) => ({
  type: DELETE_QRCLUE_SUCCESS,
  payload: qrclue,
});

export const deleteQrclueFail = (error) => ({
  type: DELETE_QRCLUE_FAIL,
  payload: error,
});

export const loadingQrclue = (status) => ({
  type: LOADING_QRCLUE,
  payload: status,
});
