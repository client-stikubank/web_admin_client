import {
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  LOADING_USER
} from './actionTypes'

const INIT_STATE = {
  users: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  userDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: {
          data: [action.payload.data, ...state.users.data],
          pagination: state.users.pagination
        },
        formStatus: 'createSuccess',
        lastSubmitAt: Date.now()
      }

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: {
          data: state.users.data.map(user =>
            user.id.toString() === action.payload.id.toString()
              ? { user, ...action.payload }
              : user
          ),
          pagination: state.users.pagination
        },
        userDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: {
          data: state.users.data.filter(
            user => user.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.users.pagination
        },
        form: 'deleteSuccess',
        lastSubmitAt: Date.now()
      }

    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_USER:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default users
