import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_USER_STAGE_SCHEDULES,
  UPDATE_USER_STAGE_SCHEDULE
} from './actionTypes'

import {
  getUserStageSchedulesSuccess,
  getUserStageSchedulesFail,
  updateUserStageScheduleSuccess,
  updateUserStageScheduleFail,
  loadingUserStageSchedule,
  closeModal
} from '@/store/actions'

import {
  getUserStageSchedules,
  updateUserStageSchedule
} from '@/api/user-stage-schedule'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchUserStageSchedules({ payload: params }) {
  yield put(loadingUserStageSchedule(true))
  try {
    const response = yield call(getUserStageSchedules, params)
    yield put(getUserStageSchedulesSuccess(response, params))
  } catch (error) {
    yield put(getUserStageSchedulesFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingUserStageSchedule(false))
}

function* onUpdateUserStageSchedule({ payload: userStageSchedule }) {
  yield put(loadingUserStageSchedule(true))
  try {
    const response = yield call(updateUserStageSchedule, userStageSchedule)
    yield put(updateUserStageScheduleSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateUserStageScheduleFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingUserStageSchedule(false))
}

function* userStageSchedulesSaga() {
  yield takeEvery(GET_USER_STAGE_SCHEDULES, fetchUserStageSchedules)
  yield takeEvery(UPDATE_USER_STAGE_SCHEDULE, onUpdateUserStageSchedule)
}

export default userStageSchedulesSaga
