import _ from 'lodash'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_USERS,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER
} from './actionTypes'

import {
  getUsersSuccess,
  getUsersFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
  loadingUser,
  closeModal
} from '@/store/actions'

import { getUsers, addNewUser, updateUser, deleteUser } from '@/api/user'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchUsers({ payload: params }) {
  yield put(loadingUser(true))
  try {
    const response = yield call(getUsers, params)
    yield put(getUsersSuccess(response, params))
  } catch (error) {
    yield put(getUsersFail(error))
    const { data } = error.response
    _.mapKeys(data.errors, (value, key) =>
      toast(value.join(', ') || message.FETCH_FAIL, 'error')
    )
  }
  yield put(loadingUser(false))
}

function* onAddNewUser({ payload: user }) {
  yield put(loadingUser(true))
  try {
    const response = yield call(addNewUser, user)
    yield put(addUserSuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(addUserFail(error))
    const { data } = error.response
    _.mapKeys(data.errors, (value, key) =>
      toast(value.join(', ') || message.CREATE_DATA_FAIL, 'error')
    )
  }
  yield put(loadingUser(false))
}

function* onUpdateUser({ payload: user }) {
  yield put(loadingUser(true))
  try {
    const response = yield call(updateUser, user)
    console.log("RESPONSE", response)
    yield put(updateUserSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateUserFail(error))
    const { data } = error.response
    _.mapKeys(data.errors, (value, key) =>
      toast(value.join(', ') || message.UPDATE_DATA_FAIL, 'error')
    )
  }
  yield put(loadingUser(false))
}

function* onDeleteUser({ payload: user }) {
  yield put(loadingUser(true))
  try {
    const response = yield call(deleteUser, user.id)
    yield put(deleteUserSuccess(response?.data))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(deleteUserFail(error))
    const { data } = error.response
    _.mapKeys(data.errors, (value, key) =>
      toast(value.join(', ') || message.DELETE_DATA_FAIL, 'error')
    )
  }
  yield put(loadingUser(false))
}

function* usersSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default usersSaga
