import {
  GET_ROLES_FAIL,
  GET_ROLES_SUCCESS,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
  LOADING_ROLE
} from './actionTypes'

const INIT_STATE = {
  roles: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  roleDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const roles = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_ROLES_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        roles: {
          data: [action.payload.data, ...state.roles.data],
          pagination: state.roles.pagination
        },
        formStatus: 'createSuccess',
        lastSubmitAt: Date.now()
      }

    case ADD_ROLE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        roles: {
          data: state.roles.data.map(role =>
            role.id.toString() === action.payload.id.toString()
              ? { role, ...action.payload }
              : role
          ),
          pagination: state.roles.pagination
        },
        roleDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_ROLE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        roles: {
          data: state.roles.data.filter(
            role => role.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.roles.pagination
        },
        form: 'deleteSuccess',
        lastSubmitAt: Date.now()
      }

    case DELETE_ROLE_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_ROLE:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default roles
