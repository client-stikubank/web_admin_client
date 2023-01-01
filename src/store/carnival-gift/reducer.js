import {
  GET_CARNIVAL_GIFTS_FAIL,
  GET_CARNIVAL_GIFTS_SUCCESS,
  ADD_CARNIVAL_GIFT_SUCCESS,
  ADD_CARNIVAL_GIFT_FAIL,
  UPDATE_CARNIVAL_GIFT_SUCCESS,
  UPDATE_CARNIVAL_GIFT_FAIL,
  DELETE_CARNIVAL_GIFT_SUCCESS,
  DELETE_CARNIVAL_GIFT_FAIL,
  LOADING_CARNIVAL_GIFT
} from './actionTypes'

const INIT_STATE = {
  carnivalGifts: {},
  currentParams: {
    page: 1,
    per_page: 999
  },
  carnivalGiftDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const carnivalGifts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CARNIVAL_GIFTS_SUCCESS:
      return {
        ...state,
        carnivalGifts: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_CARNIVAL_GIFTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_CARNIVAL_GIFT_SUCCESS:
      return {
        ...state,
        carnivalGifts: {
          data: [action.payload.data, ...state.carnivalGifts.data],
          pagination: state.carnivalGifts.pagination
        },
        formStatus: 'createSuccess',
        lastSubmitAt: Date.now()
      }

    case ADD_CARNIVAL_GIFT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_CARNIVAL_GIFT_SUCCESS:
      return {
        ...state,
        carnivalGifts: {
          data: state.carnivalGifts.data.map(carnivalGift =>
            carnivalGift.id.toString() === action.payload.id.toString()
              ? { carnivalGift, ...action.payload }
              : carnivalGift
          ),
          pagination: state.carnivalGifts.pagination
        },
        carnivalGiftDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_CARNIVAL_GIFT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_CARNIVAL_GIFT_SUCCESS:
      return {
        ...state,
        carnivalGifts: {
          data: state.carnivalGifts.data.filter(
            carnivalGift =>
              carnivalGift.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.carnivalGifts.pagination
        },
        form: 'deleteSuccess',
        lastSubmitAt: Date.now()
      }

    case DELETE_CARNIVAL_GIFT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_CARNIVAL_GIFT:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default carnivalGifts
