import { isEmpty } from 'lodash'
import {
  GET_STOCKS_FAIL,
  GET_STOCKS_SUCCESS,
  UPDATE_STOCK_SUCCESS,
  UPDATE_STOCK_FAIL,
  LOADING_STOCK
} from './actionTypes'

const INIT_STATE = {
  stocks: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  stockDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const stocks = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STOCKS_SUCCESS:
      return {
        ...state,
        stocks: action.payload,
        currentParams: action.params,
        formStatus: 'pending',
        stockDetail: isEmpty(state.stockDetail)
          ? action.payload.data[0]
          : state.stockDetail
      }

    case GET_STOCKS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_STOCK_SUCCESS:
      return {
        ...state,
        stocks: {
          data: state.stocks.data.map(stock =>
            stock.id.toString() === action.payload.id.toString()
              ? { stock, ...action.payload }
              : stock
          ),
          pagination: state.stocks.pagination
        },
        stockDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_STOCK_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_STOCK:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default stocks
