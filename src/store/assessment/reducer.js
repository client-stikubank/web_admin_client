import {
  GET_ASSESSMENTS_FAIL,
  GET_ASSESSMENTS_SUCCESS,
  LOADING_ASSESSMENT
} from './actionTypes'

const INIT_STATE = {
  assessments: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  assessmentDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const assessments = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ASSESSMENTS_SUCCESS:
      return {
        ...state,
        assessments: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_ASSESSMENTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_ASSESSMENT:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default assessments
