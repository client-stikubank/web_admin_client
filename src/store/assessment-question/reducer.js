import {
  GET_ASSESSMENT_QUESTIONS_FAIL,
  GET_ASSESSMENT_QUESTIONS_SUCCESS,
  ADD_ASSESSMENT_QUESTION_SUCCESS,
  ADD_ASSESSMENT_QUESTION_FAIL,
  UPDATE_ASSESSMENT_QUESTION_SUCCESS,
  UPDATE_ASSESSMENT_QUESTION_FAIL,
  DELETE_ASSESSMENT_QUESTION_SUCCESS,
  DELETE_ASSESSMENT_QUESTION_FAIL,
  LOADING_ASSESSMENT_QUESTION
} from './actionTypes'

const INIT_STATE = {
  assessmentQuestions: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  assessmentQuestionDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const assessmentQuestions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ASSESSMENT_QUESTIONS_SUCCESS:
      return {
        ...state,
        assessmentQuestions: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_ASSESSMENT_QUESTIONS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_ASSESSMENT_QUESTION_SUCCESS:
      return {
        ...state,
        assessmentQuestions: {
          data: [action.payload.data, ...state.assessmentQuestions.data],
          pagination: state.assessmentQuestions.pagination
        },
        formStatus: 'createSuccess',
        lastSubmitAt: Date.now()
      }

    case ADD_ASSESSMENT_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_ASSESSMENT_QUESTION_SUCCESS:
      return {
        ...state,
        assessmentQuestions: {
          data: state.assessmentQuestions.data.map(assessmentQuestion =>
            assessmentQuestion.id.toString() === action.payload.id.toString()
              ? { assessmentQuestion, ...action.payload }
              : assessmentQuestion
          ),
          pagination: state.assessmentQuestions.pagination
        },
        assessmentQuestionDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_ASSESSMENT_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_ASSESSMENT_QUESTION_SUCCESS:
      return {
        ...state,
        assessmentQuestions: {
          data: state.assessmentQuestions.data.filter(
            assessmentQuestion => assessmentQuestion.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.assessmentQuestions.pagination
        },
        form: 'deleteSuccess',
        lastSubmitAt: Date.now()
      }

    case DELETE_ASSESSMENT_QUESTION_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_ASSESSMENT_QUESTION:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default assessmentQuestions
