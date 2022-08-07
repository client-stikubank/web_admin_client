import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from './actionTypes'
import { apiError, loginSuccess } from './actions'
import { postLogin, postLogout } from '../../../api/authentication'

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postLogin, {
      email: user.email,
      password: user.password
    })
    localStorage.setItem('authUser', JSON.stringify(response))
    yield put(loginSuccess(response))
    const redirectPath = history?.location?.state?.from || '/dashboard'
    history.push(redirectPath)
    window.location.reload()
  } catch (error) {
    yield put(apiError('Email atau password salah!'))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    yield call(postLogout)
    localStorage.removeItem('authUser')

    history.push('/login')
    window.location.reload()
  } catch (error) {
    history.push('/login')
    window.location.reload()
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
