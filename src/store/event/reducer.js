import {
  GET_EVENTS_FAIL,
  GET_EVENTS_SUCCESS,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  LOADING_EVENT
} from './actionTypes'

const INIT_STATE = {
  events: {},
  currentParams: {
    page: 1,
    per_page: 10
  },
  eventDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const events = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        events: {
          data: [action.payload.data, ...state.events.data],
          pagination: state.events.pagination
        },
        formStatus: 'createSuccess',
        lastSubmitAt: Date.now()
      }

    case ADD_EVENT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        events: {
          data: state.events.data.map(event =>
            event.id.toString() === action.payload.id.toString()
              ? { event, ...action.payload }
              : event
          ),
          pagination: state.events.pagination
        },
        eventDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: {
          data: state.events.data.filter(
            event => event.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.events.pagination
        },
        form: 'deleteSuccess',
        lastSubmitAt: Date.now()
      }

    case DELETE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_EVENT:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default events
