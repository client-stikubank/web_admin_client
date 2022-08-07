import {
  GET_CARNIVALS_FAIL,
  GET_CARNIVALS_SUCCESS,
  GET_CARNIVAL_DETAIL_FAIL,
  GET_CARNIVAL_DETAIL_SUCCESS,
  ADD_CARNIVAL_SUCCESS,
  ADD_CARNIVAL_FAIL,
  UPDATE_CARNIVAL_SUCCESS,
  UPDATE_CARNIVAL_FAIL,
  DELETE_CARNIVAL_SUCCESS,
  DELETE_CARNIVAL_FAIL,
  TOGGLE_LOADING
} from './actionTypes'

const INIT_STATE = {
  carnivals: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  carnivalDetail: {},
  error: {},
  isLoading: false
}

const carnivals = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CARNIVALS_SUCCESS:
      return {
        ...state,
        carnivals: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_CARNIVALS_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case ADD_CARNIVAL_SUCCESS:
      return {
        ...state,
        carnivals: {
          data: [action.payload, ...state.carnivals.data],
          pagination: state.carnivals.pagination
        },
        formStatus: 'createSuccess'
      }

    case ADD_CARNIVAL_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case GET_CARNIVAL_DETAIL_SUCCESS:
      return {
        ...state,
        carnivalDetail: action.payload
      }

    case UPDATE_CARNIVAL_SUCCESS:
      return {
        ...state,
        carnivals: {
          data: state.carnivals.map(carnival =>
            carnival.id.toString() === action.payload.id.toString()
              ? { carnival, ...action.payload }
              : carnival
          ),
          pagination: state.carnivals.pagination
        },
        branchDetail: action.payload
      }

    case UPDATE_CARNIVAL_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_CARNIVAL_SUCCESS:
      return {
        ...state,
        carnivals: {
          data: state.carnivals.filter(
            carnival => carnival.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.carnivals.pagination
        }
      }

    case DELETE_CARNIVAL_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case GET_CARNIVAL_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default carnivals
