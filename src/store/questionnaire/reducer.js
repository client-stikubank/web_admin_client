import {
  GET_QUESTIONNAIRES_FAIL,
  GET_QUESTIONNAIRES_SUCCESS,
  ADD_QUESTIONNAIRE_SUCCESS,
  ADD_QUESTIONNAIRE_FAIL,
  UPDATE_QUESTIONNAIRE_SUCCESS,
  UPDATE_QUESTIONNAIRE_FAIL,
  DELETE_QUESTIONNAIRE_SUCCESS,
  DELETE_QUESTIONNAIRE_FAIL,
  LOADING_QUESTIONNAIRE,
} from "./actionTypes";

const INIT_STATE = {
  questionnaires: {},
  currentParams: {
    page: 1,
    per_page: 10,
  },
  questionnaireDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined,
};

const questionnaires = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QUESTIONNAIRES_SUCCESS:
      return {
        ...state,
        questionnaires: action.payload,
        currentParams: action.params,
        formStatus: "pending",
      };

    case GET_QUESTIONNAIRES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        questionnaires: {
          data: [action.payload.data, ...state.questionnaires.data],
          pagination: state.questionnaires.pagination,
        },
        formStatus: "createSuccess",
        lastSubmitAt: Date.now(),
      };

    case ADD_QUESTIONNAIRE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        questionnaires: {
          data: state.questionnaires.data.map((questionnaire) =>
            questionnaire.id.toString() === action.payload.id.toString()
              ? { questionnaire, ...action.payload }
              : questionnaire
          ),
          pagination: state.questionnaires.pagination,
        },
        questionnaireDetail: action.payload,
        form: "updateSuccess",
        lastSubmitAt: Date.now(),
      };

    case UPDATE_QUESTIONNAIRE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_QUESTIONNAIRE_SUCCESS:
      return {
        ...state,
        questionnaires: {
          data: state.questionnaires.data.filter(
            (questionnaire) =>
              questionnaire.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.questionnaires.pagination,
        },
        form: "deleteSuccess",
        lastSubmitAt: Date.now(),
      };

    case DELETE_QUESTIONNAIRE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOADING_QUESTIONNAIRE:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default questionnaires;
