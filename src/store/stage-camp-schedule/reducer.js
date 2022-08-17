import {
  GET_STAGE_CAMP_SCHEDULES_FAIL,
  GET_STAGE_CAMP_SCHEDULES_SUCCESS,
  ADD_STAGE_CAMP_SCHEDULE_SUCCESS,
  ADD_STAGE_CAMP_SCHEDULE_FAIL,
  UPDATE_STAGE_CAMP_SCHEDULE_SUCCESS,
  UPDATE_STAGE_CAMP_SCHEDULE_FAIL,
  DELETE_STAGE_CAMP_SCHEDULE_SUCCESS,
  DELETE_STAGE_CAMP_SCHEDULE_FAIL,
  LOADING_STAGE_CAMP_SCHEDULE
} from './actionTypes'

const INIT_STATE = {
  stageCampSchedules: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  stageCampScheduleDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const stageCampSchedules = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STAGE_CAMP_SCHEDULES_SUCCESS:
      return {
        ...state,
        stageCampSchedules: action.payload.data,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_STAGE_CAMP_SCHEDULES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_STAGE_CAMP_SCHEDULE_SUCCESS:
      return {
        ...state,
        stageCampSchedules: [action.payload.data, ...state.stageCampSchedules],
        formStatus: 'createSuccess',
        lastSubmitAt: Date.now()
      }

    case ADD_STAGE_CAMP_SCHEDULE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_STAGE_CAMP_SCHEDULE_SUCCESS:
      return {
        ...state,
        stageCampSchedules: state.stageCampSchedules.map(stageCampSchedule =>
          stageCampSchedule.id.toString() === action.payload.id.toString()
            ? { stageCampSchedule, ...action.payload }
            : stageCampSchedule
        ),
        stageCampScheduleDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_STAGE_CAMP_SCHEDULE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_STAGE_CAMP_SCHEDULE_SUCCESS:
      return {
        ...state,
        stageCampSchedules: state.stageCampSchedules.filter(
          stageCampSchedule =>
            stageCampSchedule.id.toString() !== action.payload.id.toString()
        ),
        form: 'deleteSuccess',
        lastSubmitAt: Date.now()
      }

    case DELETE_STAGE_CAMP_SCHEDULE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_STAGE_CAMP_SCHEDULE:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default stageCampSchedules
