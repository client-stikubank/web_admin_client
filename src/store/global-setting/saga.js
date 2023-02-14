import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_GLOBAL_SETTINGS,
  ADD_NEW_GLOBAL_SETTING,
  DELETE_GLOBAL_SETTING,
  UPDATE_GLOBAL_SETTING
} from './actionTypes'

import {
  getGlobalSettingsSuccess,
  getGlobalSettingsFail,
  addGlobalSettingFail,
  addGlobalSettingSuccess,
  updateGlobalSettingSuccess,
  updateGlobalSettingFail,
  deleteGlobalSettingSuccess,
  deleteGlobalSettingFail,
  loadingGlobalSetting,
  closeModal
} from '@/store/actions'

import { getGlobalSettings, addNewGlobalSetting, updateGlobalSetting, deleteGlobalSetting } from '@/api/global-setting'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchGlobalSettings({ payload: params }) {
  yield put(loadingGlobalSetting(true))
  try {
    const response = yield call(getGlobalSettings, params)
    yield put(getGlobalSettingsSuccess(response, params))
  } catch (error) {
    yield put(getGlobalSettingsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingGlobalSetting(false))
}

function* onAddNewGlobalSetting({ payload: globalSetting }) {
  yield put(loadingGlobalSetting(true))
  try {
    const response = yield call(addNewGlobalSetting, globalSetting)
    yield put(addGlobalSettingSuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(addGlobalSettingFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.CREATE_DATA_FAIL, 'error')
  }
  yield put(loadingGlobalSetting(false))
}

function* onUpdateGlobalSetting({ payload: globalSetting }) {
  yield put(loadingGlobalSetting(true))
  try {
    const response = yield call(updateGlobalSetting, globalSetting)
    yield put(updateGlobalSettingSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateGlobalSettingFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingGlobalSetting(false))
}

function* onDeleteGlobalSetting({ payload: globalSetting }) {
  yield put(loadingGlobalSetting(true))
  try {
    yield call(deleteGlobalSetting, globalSetting.id)
    yield put(deleteGlobalSettingSuccess(globalSetting))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(deleteGlobalSettingFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(loadingGlobalSetting(false))
}

function* globalSettingsSaga() {
  yield takeEvery(GET_GLOBAL_SETTINGS, fetchGlobalSettings)
  yield takeEvery(ADD_NEW_GLOBAL_SETTING, onAddNewGlobalSetting)
  yield takeEvery(UPDATE_GLOBAL_SETTING, onUpdateGlobalSetting)
  yield takeEvery(DELETE_GLOBAL_SETTING, onDeleteGlobalSetting)
}

export default globalSettingsSaga
