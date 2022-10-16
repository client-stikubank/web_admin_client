import {
  GET_USER_STAGE_SCHEDULES,
  GET_USER_STAGE_SCHEDULES_FAIL,
  GET_USER_STAGE_SCHEDULES_SUCCESS,
  UPDATE_USER_STAGE_SCHEDULE,
  UPDATE_USER_STAGE_SCHEDULE_SUCCESS,
  UPDATE_USER_STAGE_SCHEDULE_FAIL,
  LOADING_USER_STAGE_SCHEDULE
} from './actionTypes'

export const getUserStageSchedules = params => ({
  type: GET_USER_STAGE_SCHEDULES,
  payload: params
})

export const getUserStageSchedulesSuccess = (userStageSchedules, params) => ({
  type: GET_USER_STAGE_SCHEDULES_SUCCESS,
  payload: userStageSchedules,
  params
})

export const getUserStageSchedulesFail = error => ({
  type: GET_USER_STAGE_SCHEDULES_FAIL,
  payload: error
})

export const updateUserStageSchedule = userStageSchedule => ({
  type: UPDATE_USER_STAGE_SCHEDULE,
  payload: userStageSchedule
})

export const updateUserStageScheduleSuccess = userStageSchedule => ({
  type: UPDATE_USER_STAGE_SCHEDULE_SUCCESS,
  payload: userStageSchedule
})

export const updateUserStageScheduleFail = error => ({
  type: UPDATE_USER_STAGE_SCHEDULE_FAIL,
  payload: error
})

export const loadingUserStageSchedule = status => ({
  type: LOADING_USER_STAGE_SCHEDULE,
  payload: status
})
