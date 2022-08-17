import {
  GET_STAGE_CAMP_SCHEDULES,
  GET_STAGE_CAMP_SCHEDULES_FAIL,
  GET_STAGE_CAMP_SCHEDULES_SUCCESS,
  ADD_NEW_STAGE_CAMP_SCHEDULE,
  ADD_STAGE_CAMP_SCHEDULE_SUCCESS,
  ADD_STAGE_CAMP_SCHEDULE_FAIL,
  UPDATE_STAGE_CAMP_SCHEDULE,
  UPDATE_STAGE_CAMP_SCHEDULE_SUCCESS,
  UPDATE_STAGE_CAMP_SCHEDULE_FAIL,
  DELETE_STAGE_CAMP_SCHEDULE,
  DELETE_STAGE_CAMP_SCHEDULE_SUCCESS,
  DELETE_STAGE_CAMP_SCHEDULE_FAIL,
  LOADING_STAGE_CAMP_SCHEDULE
} from './actionTypes'

export const getStageCampSchedules = params => ({
  type: GET_STAGE_CAMP_SCHEDULES,
  payload: params
})

export const getStageCampSchedulesSuccess = (stageCampSchedules, params) => ({
  type: GET_STAGE_CAMP_SCHEDULES_SUCCESS,
  payload: stageCampSchedules,
  params
})

export const getStageCampSchedulesFail = error => ({
  type: GET_STAGE_CAMP_SCHEDULES_FAIL,
  payload: error
})

export const addNewStageCampSchedule = stageCampSchedule => ({
  type: ADD_NEW_STAGE_CAMP_SCHEDULE,
  payload: stageCampSchedule
})

export const addStageCampScheduleSuccess = stageCampSchedule => ({
  type: ADD_STAGE_CAMP_SCHEDULE_SUCCESS,
  payload: stageCampSchedule
})

export const addStageCampScheduleFail = error => ({
  type: ADD_STAGE_CAMP_SCHEDULE_FAIL,
  payload: error
})

export const updateStageCampSchedule = stageCampSchedule => ({
  type: UPDATE_STAGE_CAMP_SCHEDULE,
  payload: stageCampSchedule
})

export const updateStageCampScheduleSuccess = stageCampSchedule => ({
  type: UPDATE_STAGE_CAMP_SCHEDULE_SUCCESS,
  payload: stageCampSchedule
})

export const updateStageCampScheduleFail = error => ({
  type: UPDATE_STAGE_CAMP_SCHEDULE_FAIL,
  payload: error
})

export const deleteStageCampSchedule = stageCampSchedule => ({
  type: DELETE_STAGE_CAMP_SCHEDULE,
  payload: stageCampSchedule
})

export const deleteStageCampScheduleSuccess = stageCampSchedule => ({
  type: DELETE_STAGE_CAMP_SCHEDULE_SUCCESS,
  payload: stageCampSchedule
})

export const deleteStageCampScheduleFail = error => ({
  type: DELETE_STAGE_CAMP_SCHEDULE_FAIL,
  payload: error
})

export const loadingStageCampSchedule = status => ({
  type: LOADING_STAGE_CAMP_SCHEDULE,
  payload: status
})
