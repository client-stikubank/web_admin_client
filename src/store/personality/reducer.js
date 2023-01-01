import {
  GET_PERSONALITIES_FAIL,
  GET_PERSONALITIES_SUCCESS,
  ADD_PERSONALITY_SUCCESS,
  ADD_PERSONALITY_FAIL,
  UPDATE_PERSONALITY_SUCCESS,
  UPDATE_PERSONALITY_FAIL,
  DELETE_PERSONALITY_SUCCESS,
  DELETE_PERSONALITY_FAIL,
  LOADING_PERSONALITY
} from './actionTypes'

const INIT_STATE = {
  personalities: {},
  currentParams: {
    page: 1,
    per_page: 10
  },
  personalityDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const personalities = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PERSONALITIES_SUCCESS:
      return {
        ...state,
        personalities: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_PERSONALITIES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_PERSONALITY_SUCCESS:
      return {
        ...state,
        personalities: {
          data: [action.payload.data, ...state.personalities.data],
          pagination: state.personalities.pagination
        },
        formStatus: 'createSuccess',
        lastSubmitAt: Date.now()
      }

    case ADD_PERSONALITY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_PERSONALITY_SUCCESS:
      return {
        ...state,
        personalities: {
          data: state.personalities.data.map(personality =>
            personality.id.toString() === action.payload.id.toString()
              ? { personality, ...action.payload }
              : personality
          ),
          pagination: state.personalities.pagination
        },
        personalityDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_PERSONALITY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_PERSONALITY_SUCCESS:
      return {
        ...state,
        personalities: {
          data: state.personalities.data.filter(
            personality =>
              personality.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.personalities.pagination
        },
        form: 'deleteSuccess',
        lastSubmitAt: Date.now()
      }

    case DELETE_PERSONALITY_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_PERSONALITY:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default personalities
