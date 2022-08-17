import {
  GET_CAMPS_FAIL,
  GET_CAMPS_SUCCESS,
  ADD_CAMP_SUCCESS,
  ADD_CAMP_FAIL,
  UPDATE_CAMP_SUCCESS,
  UPDATE_CAMP_FAIL,
  DELETE_CAMP_SUCCESS,
  DELETE_CAMP_FAIL,
  LOADING_CAMP
} from './actionTypes'

const INIT_STATE = {
  camps: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  campDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const camps = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CAMPS_SUCCESS:
      return {
        ...state,
        camps: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_CAMPS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_CAMP_SUCCESS:
      return {
        ...state,
        camps: {
          data: [action.payload.data, ...state.camps.data],
          pagination: state.camps.pagination
        },
        formStatus: 'createSuccess',
        lastSubmitAt: Date.now()
      }

    case ADD_CAMP_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_CAMP_SUCCESS:
      return {
        ...state,
        camps: {
          data: state.camps.data.map(camp =>
            camp.id.toString() === action.payload.id.toString()
              ? { camp, ...action.payload }
              : camp
          ),
          pagination: state.camps.pagination
        },
        campDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_CAMP_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_CAMP_SUCCESS:
      return {
        ...state,
        camps: {
          data: state.camps.data.filter(
            camp => camp.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.camps.pagination
        },
        form: 'deleteSuccess',
        lastSubmitAt: Date.now()
      }

    case DELETE_CAMP_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_CAMP:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default camps
