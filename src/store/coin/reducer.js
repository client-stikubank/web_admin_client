import {
  GET_COINS_FAIL,
  GET_COINS_SUCCESS,
  UPDATE_COIN_SUCCESS,
  UPDATE_COIN_FAIL,
  LOADING_COIN
} from './actionTypes'

const INIT_STATE = {
  coins: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  coinDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const coins = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COINS_SUCCESS:
      return {
        ...state,
        coins: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_COINS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_COIN_SUCCESS:
      return {
        ...state,
        coins: {
          data: state.coins.data.map(coin =>
            coin.id.toString() === action.payload.id.toString()
              ? { coin, ...action.payload }
              : coin
          ),
          pagination: state.coins.pagination
        },
        coinDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_COIN_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_COIN:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default coins
