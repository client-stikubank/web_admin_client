import {
  GET_QRCLUES_FAIL,
  GET_QRCLUES_SUCCESS,
  ADD_QRCLUE_SUCCESS,
  ADD_QRCLUE_FAIL,
  UPDATE_QRCLUE_SUCCESS,
  UPDATE_QRCLUE_FAIL,
  DELETE_QRCLUE_SUCCESS,
  DELETE_QRCLUE_FAIL,
  LOADING_QRCLUE,
} from "./actionTypes";

const INIT_STATE = {
  qrclues: {},
  currentParams: {
    page: 1,
    per_page: 10,
  },
  qrclueDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined,
};

const qrclues = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_QRCLUES_SUCCESS:
      return {
        ...state,
        qrclues: action.payload,
        currentParams: action.params,
        formStatus: "pending",
      };

    case GET_QRCLUES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_QRCLUE_SUCCESS:
      return {
        ...state,
        qrclues: {
          data: [action.payload.data, ...state.qrclues.data],
          pagination: state.qrclues.pagination,
        },
        formStatus: "createSuccess",
        lastSubmitAt: Date.now(),
      };

    case ADD_QRCLUE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_QRCLUE_SUCCESS:
      return {
        ...state,
        qrclues: {
          data: state.qrclues.data.map((qrclue) =>
            qrclue.id.toString() === action.payload.id.toString()
              ? { qrclue, ...action.payload }
              : qrclue
          ),
          pagination: state.qrclues.pagination,
        },
        qrclueDetail: action.payload,
        form: "updateSuccess",
        lastSubmitAt: Date.now(),
      };

    case UPDATE_QRCLUE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_QRCLUE_SUCCESS:
      return {
        ...state,
        qrclues: {
          data: state.qrclues.data.filter(
            (qrclue) => qrclue.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.qrclues.pagination,
        },
        form: "deleteSuccess",
        lastSubmitAt: Date.now(),
      };

    case DELETE_QRCLUE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case LOADING_QRCLUE:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export default qrclues;
