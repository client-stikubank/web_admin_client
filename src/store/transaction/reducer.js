import { isEmpty } from 'lodash'
import {
  GET_TRANSACTIONS_FAIL,
  GET_TRANSACTIONS_SUCCESS,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  LOADING_TRANSACTION
} from './actionTypes'

const INIT_STATE = {
  transactions: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  transactionDetail: {},
  error: {},
  isLoading: false,
  lastSubmitAt: undefined
}

const transactions = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        currentParams: action.params,
        formStatus: 'pending'
      }

    case GET_TRANSACTIONS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case UPDATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: {
          data: state.transactions.data.map(transaction =>
            transaction.id.toString() === action.payload.id.toString()
              ? { transaction, ...action.payload }
              : transaction
          ),
          pagination: state.transactions.pagination
        },
        transactionDetail: action.payload,
        form: 'updateSuccess',
        lastSubmitAt: Date.now()
      }

    case UPDATE_TRANSACTION_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_TRANSACTION:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default transactions
