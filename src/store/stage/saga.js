import { call, put, takeEvery } from 'redux-saga/effects'
import {
  ADD_STAGE_CAMP,
  GET_STAGES,
  UPDATE_STAGE,
  DELETE_STAGE_CAMP
} from './actionTypes'

import {
  getStagesSuccess,
  getStagesFail,
  updateStageSuccess,
  updateStageFail,
  addStageCampSuccess,
  addStageCampFail,
  deleteStageCampSuccess,
  deleteStageCampFail,
  loadingStage,
  closeModal
} from '@/store/actions'

import { getStages, updateStage } from '@/api/stage'
import { addNewStageCamp, deleteStageCamp } from '@/api/stage-camp'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchStages({ payload: params }) {
  yield put(loadingStage(true))
  try {
    const response = yield call(getStages, params)
    yield put(getStagesSuccess(response, params))
  } catch (error) {
    yield put(getStagesFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingStage(false))
}

function* onUpdateStage({ payload: stage }) {
  try {
    const response = yield call(updateStage, stage)
    yield put(updateStageSuccess(response))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
  } catch (error) {
    yield put(updateStageFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
}

function* onAddStageCamp({ payload: stageCamp }) {
  yield put(loadingStage(true))
  try {
    const response = yield call(addNewStageCamp, stageCamp)
    yield put(addStageCampSuccess(response))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(addStageCampFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingStage(false))
}

function* onDeleteStageCamp({ payload: stageCamp }) {
  yield put(loadingStage(true))
  try {
    const response = yield call(deleteStageCamp, stageCamp.id)
    yield put(deleteStageCampSuccess(response))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(deleteStageCampFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(loadingStage(false))
}

function* stagesSaga() {
  yield takeEvery(GET_STAGES, fetchStages)
  yield takeEvery(UPDATE_STAGE, onUpdateStage)
  yield takeEvery(ADD_STAGE_CAMP, onAddStageCamp)
  yield takeEvery(DELETE_STAGE_CAMP, onDeleteStageCamp)
}

export default stagesSaga
