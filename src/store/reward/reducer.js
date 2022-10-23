import {
  GET_REWARDS_SUCCESS,
  GET_REWARDS_FAIL,
  TRANSACTION_REWARD_SUCCESS,
  TRANSACTION_REWARD_FAIL,
  LOADING_REWARD
} from './actionTypes'

const INIT_STATE = {
  rewards: [],
  currentParams: {
    page: 1,
    per_page: 10
  },
  error: {},
  isLoading: false
}

const rewards = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REWARDS_SUCCESS:
      return {
        ...state,
        rewards: action.payload,
        currentParams: action.params
      }

    case GET_REWARDS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case TRANSACTION_REWARD_SUCCESS:
      return {
        ...state,
        rewards: {
          data: state.rewards.data.map(reward =>
            reward.id.toString() === action.payload.id.toString()
              ? { reward, ...action.payload }
              : reward
          ),
          pagination: state.rewards.pagination
        },
        form: 'transactionSuccess',
        lastSubmitAt: Date.now()
      }

    case TRANSACTION_REWARD_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case LOADING_REWARD:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default rewards
