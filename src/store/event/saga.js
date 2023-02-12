import { call, put, takeEvery } from 'redux-saga/effects'
import {
  GET_EVENTS,
  ADD_NEW_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT
} from './actionTypes'

import {
  getEventsSuccess,
  getEventsFail,
  addEventFail,
  addEventSuccess,
  updateEventSuccess,
  updateEventFail,
  deleteEventSuccess,
  deleteEventFail,
  loadingEvent,
  closeModal
} from '@/store/actions'

import { getEvents, addNewEvent, updateEvent, deleteEvent } from '@/api/event'

import toast from '@/helpers/toast'
import * as message from '@/constants/message'

function* fetchEvents({ payload: params }) {
  yield put(loadingEvent(true))
  try {
    const response = yield call(getEvents, params)
    yield put(getEventsSuccess(response, params))
  } catch (error) {
    yield put(getEventsFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.FETCH_FAIL, 'error')
  }
  yield put(loadingEvent(false))
}

function* onAddNewEvent({ payload: event }) {
  yield put(loadingEvent(true))
  try {
    const response = yield call(addNewEvent, event)
    yield put(addEventSuccess(response))
    toast(message.CREATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(addEventFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.CREATE_DATA_FAIL, 'error')
  }
  yield put(loadingEvent(false))
}

function* onUpdateEvent({ payload: event }) {
  yield put(loadingEvent(true))
  try {
    const response = yield call(updateEvent, event)
    yield put(updateEventSuccess(response?.data))
    toast(message.UPDATE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(updateEventFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.UPDATE_DATA_FAIL, 'error')
  }
  yield put(loadingEvent(false))
}

function* onDeleteEvent({ payload: event }) {
  yield put(loadingEvent(true))
  try {
    yield call(deleteEvent, event.id)
    yield put(deleteEventSuccess(event))
    toast(message.DELETE_DATA_SUCCESS, 'success')
    yield put(closeModal())
  } catch (error) {
    yield put(deleteEventFail(error))
    let errorMessage = error.response?.data.message
    errorMessage = errorMessage?.generic_errors
      ? errorMessage.generic_errors[0]
      : errorMessage
    toast(errorMessage || message.DELETE_DATA_FAIL, 'error')
  }
  yield put(loadingEvent(false))
}

function* eventsSaga() {
  yield takeEvery(GET_EVENTS, fetchEvents)
  yield takeEvery(ADD_NEW_EVENT, onAddNewEvent)
  yield takeEvery(UPDATE_EVENT, onUpdateEvent)
  yield takeEvery(DELETE_EVENT, onDeleteEvent)
}

export default eventsSaga
