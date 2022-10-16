import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_ROLES,
  ADD_NEW_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE
} from './actionTypes'

import {
  getRolesSuccess,
  getRolesFail,
  addRoleFail,
  addRoleSuccess,
  updateRoleSuccess,
  updateRoleFail,
  deleteRoleSuccess,
  deleteRoleFail,
  loadingRole,
  closeModal
} from '@/store/actions'

import { getRoles, addNewRole, updateRole, deleteRole } from '@/api/role'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchRoles({ payload: params }) {
  yield put(loadingRole(true))
  try {
    const response = yield call(getRoles, params)
    yield put(getRolesSuccess(response, params))
  } catch (error) {
    yield put(getRolesFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingRole(false))
}

function* onAddNewRole({ payload: role }) {
  yield put(loadingRole(true))
  try {
    const response = yield call(addNewRole, role)
    yield put(addRoleSuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(addRoleFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.CREATE_DATA_FAIL, 'error')
  }
  yield put(loadingRole(false))
}

function* onUpdateRole({ payload: role }) {
  yield put(loadingRole(true))
  try {
    const response = yield call(updateRole, role)
    yield put(updateRoleSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateRoleFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingRole(false))
}

function* onDeleteRole({ payload: role }) {
  yield put(loadingRole(true))
  try {
    const response = yield call(deleteRole, role.id)
    yield put(deleteRoleSuccess(response?.data))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(deleteRoleFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(loadingRole(false))
}

function* rolesSaga() {
  yield takeEvery(GET_ROLES, fetchRoles)
  yield takeEvery(ADD_NEW_ROLE, onAddNewRole)
  yield takeEvery(UPDATE_ROLE, onUpdateRole)
  yield takeEvery(DELETE_ROLE, onDeleteRole)
}

export default rolesSaga
