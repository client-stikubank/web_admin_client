import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_QUESTIONNAIRES,
  ADD_NEW_QUESTIONNAIRE,
  DELETE_QUESTIONNAIRE,
  UPDATE_QUESTIONNAIRE,
} from "./actionTypes";

import {
  getQuestionnairesSuccess,
  getQuestionnairesFail,
  addQuestionnaireFail,
  addQuestionnaireSuccess,
  updateQuestionnaireSuccess,
  updateQuestionnaireFail,
  deleteQuestionnaireSuccess,
  deleteQuestionnaireFail,
  loadingQuestionnaire,
  closeModal,
} from "@/store/actions";

import {
  getQuestionnaires,
  addNewQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
} from "@/api/questionnaire";

import toast from "@/helpers/toast";
import * as message from "@/constants/message";

function* fetchQuestionnaires({ payload: params }) {
  yield put(loadingQuestionnaire(true));
  try {
    const response = yield call(getQuestionnaires, params);
    yield put(getQuestionnairesSuccess(response, params));
  } catch (error) {
    yield put(getQuestionnairesFail(error));
    let errorMessage = error.response?.data.message;
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage;
    toast(errorMessage || message.FETCH_FAIL, "error");
  }
  yield put(loadingQuestionnaire(false));
}

function* onAddNewQuestionnaire({ payload: questionnaire }) {
  yield put(loadingQuestionnaire(true));
  try {
    const response = yield call(addNewQuestionnaire, questionnaire);
    yield put(addQuestionnaireSuccess(response));
    toast(message.CREATE_DATA_SUCCESS, "success");
    yield put(closeModal());
  } catch (error) {
    yield put(addQuestionnaireFail(error));
    let errorMessage = error.response?.data.message;
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage;
    toast(errorMessage || message.CREATE_DATA_FAIL, "error");
  }
  yield put(loadingQuestionnaire(false));
}

function* onUpdateQuestionnaire({ payload: questionnaire }) {
  yield put(loadingQuestionnaire(true));
  try {
    const response = yield call(updateQuestionnaire, questionnaire);
    yield put(updateQuestionnaireSuccess(response?.data));
    toast(message.UPDATE_DATA_SUCCESS, "success");
    yield put(closeModal());
  } catch (error) {
    yield put(updateQuestionnaireFail(error));
    let errorMessage = error.response?.data.message;
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage;
    toast(errorMessage || message.UPDATE_DATA_FAIL, "error");
  }
  yield put(loadingQuestionnaire(false));
}

function* onDeleteQuestionnaire({ payload: questionnaire }) {
  yield put(loadingQuestionnaire(true));
  try {
    yield call(deleteQuestionnaire, questionnaire.id);
    yield put(deleteQuestionnaireSuccess(questionnaire));
    toast(message.DELETE_DATA_SUCCESS, "success");
    yield put(closeModal());
  } catch (error) {
    yield put(deleteQuestionnaireFail(error));
    let errorMessage = error.response?.data.message;
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage;
    toast(errorMessage || message.DELETE_DATA_FAIL, "error");
  }
  yield put(loadingQuestionnaire(false));
}

function* questionnairesSaga() {
  yield takeEvery(GET_QUESTIONNAIRES, fetchQuestionnaires);
  yield takeEvery(ADD_NEW_QUESTIONNAIRE, onAddNewQuestionnaire);
  yield takeEvery(UPDATE_QUESTIONNAIRE, onUpdateQuestionnaire);
  yield takeEvery(DELETE_QUESTIONNAIRE, onDeleteQuestionnaire);
}

export default questionnairesSaga;
