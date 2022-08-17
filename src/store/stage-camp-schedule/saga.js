import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_STAGE_CAMP_SCHEDULES,
  ADD_NEW_STAGE_CAMP_SCHEDULE,
  DELETE_STAGE_CAMP_SCHEDULE,
  UPDATE_STAGE_CAMP_SCHEDULE
} from './actionTypes'

import {
  getStageCampSchedulesSuccess,
  getStageCampSchedulesFail,
  addStageCampScheduleFail,
  addStageCampScheduleSuccess,
  updateStageCampScheduleSuccess,
  updateStageCampScheduleFail,
  deleteStageCampScheduleSuccess,
  deleteStageCampScheduleFail,
  loadingStageCampSchedule,
  setModal
} from '@/store/actions'

import {
  getStageCampSchedules,
  addNewStageCampSchedule,
  updateStageCampSchedule,
  deleteStageCampSchedule
} from '@/api/stage-camp-schedule'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchStageCampSchedules({ payload: params }) {
  yield put(loadingStageCampSchedule(true))
  try {
    const response = yield call(getStageCampSchedules, params)
    yield put(getStageCampSchedulesSuccess(response, params))
  } catch (error) {
    yield put(getStageCampSchedulesFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingStageCampSchedule(false))
}

function* onAddNewStageCampSchedule({ payload: stageCampSchedule }) {
  yield put(loadingStageCampSchedule(true))
  try {
    const response = yield call(addNewStageCampSchedule, stageCampSchedule)
    yield put(addStageCampScheduleSuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
    yield put(setModal({ type: 'calendarCampStage', show: true }))
  } catch (error) {
    yield put(addStageCampScheduleFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.CREATE_DATA_FAIL, 'error')
  }
  yield put(loadingStageCampSchedule(false))
}

function* onUpdateStageCampSchedule({ payload: stageCampSchedule }) {
  yield put(loadingStageCampSchedule(true))
  try {
    const response = yield call(updateStageCampSchedule, stageCampSchedule)
    yield put(updateStageCampScheduleSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(setModal({ type: 'calendarCampStage', show: true }))
  } catch (error) {
    yield put(updateStageCampScheduleFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingStageCampSchedule(false))
}

function* onDeleteStageCampSchedule({ payload: stageCampSchedule }) {
  yield put(loadingStageCampSchedule(true))
  try {
    const response = yield call(deleteStageCampSchedule, stageCampSchedule.id)
    yield put(deleteStageCampScheduleSuccess(response?.data))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(setModal({ type: 'calendarCampStage', show: true }))
  } catch (error) {
    yield put(deleteStageCampScheduleFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(loadingStageCampSchedule(false))
}

function* stageCampSchedulesSaga() {
  yield takeEvery(GET_STAGE_CAMP_SCHEDULES, fetchStageCampSchedules)
  yield takeEvery(ADD_NEW_STAGE_CAMP_SCHEDULE, onAddNewStageCampSchedule)
  yield takeEvery(UPDATE_STAGE_CAMP_SCHEDULE, onUpdateStageCampSchedule)
  yield takeEvery(DELETE_STAGE_CAMP_SCHEDULE, onDeleteStageCampSchedule)
}

export default stageCampSchedulesSaga
