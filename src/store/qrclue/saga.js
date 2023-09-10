import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_QRCLUES,
  ADD_NEW_QRCLUE,
  DELETE_QRCLUE,
  UPDATE_QRCLUE,
} from "./actionTypes";

import {
  getQrcluesSuccess,
  getQrcluesFail,
  addQrclueFail,
  addQrclueSuccess,
  updateQrclueSuccess,
  updateQrclueFail,
  deleteQrclueSuccess,
  deleteQrclueFail,
  loadingQrclue,
  closeModal,
} from "@/store/actions";

import {
  getQrclues,
  addNewQrclue,
  updateQrclue,
  deleteQrclue,
} from "@/api/qrclue";

import toast from "@/helpers/toast";
import * as message from "@/constants/message";

function* fetchQrclues({ payload: params }) {
  yield put(loadingQrclue(true));
  try {
    const response = yield call(getQrclues, params);
    yield put(getQrcluesSuccess(response, params));
  } catch (error) {
    yield put(getQrcluesFail(error));
    let errorMessage = error.response?.data.message;
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage;
    toast(errorMessage || message.FETCH_FAIL, "error");
  }
  yield put(loadingQrclue(false));
}

function* onAddNewQrclue({ payload: qrclue }) {
  yield put(loadingQrclue(true));
  try {
    const response = yield call(addNewQrclue, qrclue);
    yield put(addQrclueSuccess(response));
    toast(message.CREATE_DATA_SUCCESS, "success");
    yield put(closeModal());
  } catch (error) {
    yield put(addQrclueFail(error));
    let errorMessage = error.response?.data.message;
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage;
    toast(errorMessage || message.CREATE_DATA_FAIL, "error");
  }
  yield put(loadingQrclue(false));
}

function* onUpdateQrclue({ payload: qrclue }) {
  yield put(loadingQrclue(true));
  try {
    const response = yield call(updateQrclue, qrclue);
    yield put(updateQrclueSuccess(response?.data));
    toast(message.UPDATE_DATA_SUCCESS, "success");
    yield put(closeModal());
  } catch (error) {
    yield put(updateQrclueFail(error));
    let errorMessage = error.response?.data.message;
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage;
    toast(errorMessage || message.UPDATE_DATA_FAIL, "error");
  }
  yield put(loadingQrclue(false));
}

function* onDeleteQrclue({ payload: qrclue }) {
  yield put(loadingQrclue(true));
  try {
    yield call(deleteQrclue, qrclue.id);
    yield put(deleteQrclueSuccess(qrclue));
    toast(message.DELETE_DATA_SUCCESS, "success");
    yield put(closeModal());
  } catch (error) {
    yield put(deleteQrclueFail(error));
    let errorMessage = error.response?.data.message;
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage;
    toast(errorMessage || message.DELETE_DATA_FAIL, "error");
  }
  yield put(loadingQrclue(false));
}

function* qrcluesSaga() {
  yield takeEvery(GET_QRCLUES, fetchQrclues);
  yield takeEvery(ADD_NEW_QRCLUE, onAddNewQrclue);
  yield takeEvery(UPDATE_QRCLUE, onUpdateQrclue);
  yield takeEvery(DELETE_QRCLUE, onDeleteQrclue);
}

export default qrcluesSaga;
