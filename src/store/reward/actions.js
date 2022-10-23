import {
  GET_REWARDS,
  GET_REWARDS_SUCCESS,
  GET_REWARDS_FAIL,
  TRANSACTION_REWARD,
  TRANSACTION_REWARD_SUCCESS,
  TRANSACTION_REWARD_FAIL,
  LOADING_REWARD
} from './actionTypes'

export const getRewards = params => ({
  type: GET_REWARDS,
  payload: params
})

export const getRewardsSuccess = (rewards, params) => ({
  type: GET_REWARDS_SUCCESS,
  payload: rewards,
  params
})

export const getRewardsFail = error => ({
  type: GET_REWARDS_FAIL,
  payload: error
})

export const transactionReward = reward => ({
  type: TRANSACTION_REWARD,
  payload: reward
})

export const transactionRewardSuccess = reward => ({
  type: TRANSACTION_REWARD_SUCCESS,
  payload: reward
})

export const transactionRewardFail = error => ({
  type: TRANSACTION_REWARD_FAIL,
  payload: error
})

export const loadingReward = status => ({
  type: LOADING_REWARD,
  payload: status
})
