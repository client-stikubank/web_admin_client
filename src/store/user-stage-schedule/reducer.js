import {
  GET_USER_STAGE_SCHEDULES_FAIL,
  GET_USER_STAGE_SCHEDULES_SUCCESS,
  UPDATE_USER_STAGE_SCHEDULE_SUCCESS,
  UPDATE_USER_STAGE_SCHEDULE_FAIL,
  LOADING_USER_STAGE_SCHEDULE
} from './actionTypes'

const INIT_STATE = {
  userStageSchedules: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  userStageScheduleDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const userStageSchedules = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER_STAGE_SCHEDULES_SUCCESS:
      return {
        ...state,
        userStageSchedules: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_USER_STAGE_SCHEDULES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_USER_STAGE_SCHEDULE_SUCCESS:
      return {
        ...state,
        userStageSchedules: {
          data: state.userStageSchedules.data.map(userStageSchedule =>
            userStageSchedule.id.toString() === action.payload.id.toString()
              ? { userStageSchedule, ...action.payload }
              : userStageSchedule
          ),
          pagination: state.userStageSchedules.pagination
        },
        userStageScheduleDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_USER_STAGE_SCHEDULE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_USER_STAGE_SCHEDULE:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default userStageSchedules
