import {
  GET_EVENTS,
  GET_EVENTS_FAIL,
  GET_EVENTS_SUCCESS,
  ADD_NEW_EVENT,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  LOADING_EVENT
} from './actionTypes'

export const getEvents = params => ({
  type: GET_EVENTS,
  payload: params
})

export const getEventsSuccess = (events, params) => ({
  type: GET_EVENTS_SUCCESS,
  payload: events,
  params
})

export const getEventsFail = error => ({
  type: GET_EVENTS_FAIL,
  payload: error
})

export const addNewEvent = event => ({
  type: ADD_NEW_EVENT,
  payload: event
})

export const addEventSuccess = event => ({
  type: ADD_EVENT_SUCCESS,
  payload: event
})

export const addEventFail = error => ({
  type: ADD_EVENT_FAIL,
  payload: error
})

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: event
})

export const updateEventSuccess = event => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: event
})

export const updateEventFail = error => ({
  type: UPDATE_EVENT_FAIL,
  payload: error
})

export const deleteEvent = event => ({
  type: DELETE_EVENT,
  payload: event
})

export const deleteEventSuccess = event => ({
  type: DELETE_EVENT_SUCCESS,
  payload: event
})

export const deleteEventFail = error => ({
  type: DELETE_EVENT_FAIL,
  payload: error
})

export const loadingEvent = status => ({
  type: LOADING_EVENT,
  payload: status
})
