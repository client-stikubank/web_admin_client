import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_REWARDS, TRANSACTION_REWARD } from './actionTypes'

import {
  getRewardsSuccess,
  getRewardsFail,
  transactionRewardSuccess,
  transactionRewardFail,
  loadingReward,
  closeModal
} from '@/store/actions'

import { getRewards, postTransactionReward } from '@/api/reward'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchRewards({ payload: params }) {
  yield put(loadingReward(true))
  try {
    const response = yield call(getRewards, params)
    yield put(getRewardsSuccess(response, params))
  } catch (error) {
    yield put(getRewardsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingReward(false))
}

function* onTransactionReward({ payload: reward }) {
  yield put(loadingReward(true))
  try {
    const response = yield call(postTransactionReward, reward)
    yield put(transactionRewardSuccess(response?.data))
    toast(message.TRANSACTION_PROCESSED, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(transactionRewardFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingReward(false))
}

function* rewardsSaga() {
  yield takeEvery(GET_REWARDS, fetchRewards)
  yield takeEvery(TRANSACTION_REWARD, onTransactionReward)
}

export default rewardsSaga
