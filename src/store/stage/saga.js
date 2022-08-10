import { call, put, takeEvery } from 'redux-saga/effects'
import { UPDATE_STAGE } from './actionTypes'

import { updateStageSuccess, updateStageFail } from './actions'

import { updateStage } from '@/api/stage'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* onUpdateStage({ payload: stage }) {
  try {
    const response = yield call(updateStage, stage)
    yield put(updateStageSuccess(response?.data))
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

function* stagesSaga() {
  yield takeEvery(UPDATE_STAGE, onUpdateStage)
}

export default stagesSaga
