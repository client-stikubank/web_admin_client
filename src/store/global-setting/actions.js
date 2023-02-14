import {
  GET_GLOBAL_SETTINGS,
  GET_GLOBAL_SETTINGS_FAIL,
  GET_GLOBAL_SETTINGS_SUCCESS,
  ADD_NEW_GLOBAL_SETTING,
  ADD_GLOBAL_SETTING_SUCCESS,
  ADD_GLOBAL_SETTING_FAIL,
  UPDATE_GLOBAL_SETTING,
  UPDATE_GLOBAL_SETTING_SUCCESS,
  UPDATE_GLOBAL_SETTING_FAIL,
  DELETE_GLOBAL_SETTING,
  DELETE_GLOBAL_SETTING_SUCCESS,
  DELETE_GLOBAL_SETTING_FAIL,
  LOADING_GLOBAL_SETTING
} from './actionTypes'

export const getGlobalSettings = params => ({
  type: GET_GLOBAL_SETTINGS,
  payload: params
})

export const getGlobalSettingsSuccess = (globalSettings, params) => ({
  type: GET_GLOBAL_SETTINGS_SUCCESS,
  payload: globalSettings,
  params
})

export const getGlobalSettingsFail = error => ({
  type: GET_GLOBAL_SETTINGS_FAIL,
  payload: error
})

export const addNewGlobalSetting = globalSetting => ({
  type: ADD_NEW_GLOBAL_SETTING,
  payload: globalSetting
})

export const addGlobalSettingSuccess = globalSetting => ({
  type: ADD_GLOBAL_SETTING_SUCCESS,
  payload: globalSetting
})

export const addGlobalSettingFail = error => ({
  type: ADD_GLOBAL_SETTING_FAIL,
  payload: error
})

export const updateGlobalSetting = globalSetting => ({
  type: UPDATE_GLOBAL_SETTING,
  payload: globalSetting
})

export const updateGlobalSettingSuccess = globalSetting => ({
  type: UPDATE_GLOBAL_SETTING_SUCCESS,
  payload: globalSetting
})

export const updateGlobalSettingFail = error => ({
  type: UPDATE_GLOBAL_SETTING_FAIL,
  payload: error
})

export const deleteGlobalSetting = globalSetting => ({
  type: DELETE_GLOBAL_SETTING,
  payload: globalSetting
})

export const deleteGlobalSettingSuccess = globalSetting => ({
  type: DELETE_GLOBAL_SETTING_SUCCESS,
  payload: globalSetting
})

export const deleteGlobalSettingFail = error => ({
  type: DELETE_GLOBAL_SETTING_FAIL,
  payload: error
})

export const loadingGlobalSetting = status => ({
  type: LOADING_GLOBAL_SETTING,
  payload: status
})
