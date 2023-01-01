import {
  GET_GIFTS_FAIL,
  GET_GIFTS_SUCCESS,
  ADD_GIFT_SUCCESS,
  ADD_GIFT_FAIL,
  UPDATE_GIFT_SUCCESS,
  UPDATE_GIFT_FAIL,
  DELETE_GIFT_SUCCESS,
  DELETE_GIFT_FAIL,
  LOADING_GIFT
} from './actionTypes'

const INIT_STATE = {
  gifts: {},
  currentParams: {
    page: 1,
    per_page: 10
  },
  giftDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const gifts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GIFTS_SUCCESS:
      return {
        ...state,
        gifts: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_GIFTS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case ADD_GIFT_SUCCESS:
      return {
        ...state,
        gifts: {
          data: [action.payload.data, ...state.gifts.data],
          pagination: state.gifts.pagination
        },
        formStatus: 'createSuccess',
        lastSubmitAt: Date.now()
      }

    case ADD_GIFT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_GIFT_SUCCESS:
      return {
        ...state,
        gifts: {
          data: state.gifts.data.map(gift =>
            gift.id.toString() === action.payload.id.toString()
              ? { gift, ...action.payload }
              : gift
          ),
          pagination: state.gifts.pagination
        },
        giftDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_GIFT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_GIFT_SUCCESS:
      return {
        ...state,
        gifts: {
          data: state.gifts.data.filter(
            gift => gift.id.toString() !== action.payload.id.toString()
          ),
          pagination: state.gifts.pagination
        },
        form: 'deleteSuccess',
        lastSubmitAt: Date.now()
      }

    case DELETE_GIFT_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_GIFT:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default gifts
