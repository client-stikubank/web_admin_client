import { del, get, postFormData, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'
import _ from 'lodash'

export const getEvents = params => {
  return get(url.URL_EVENTS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getEventsDetails = id => {
  return get(`${url.URL_EVENTS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewEvent = data => {
  let formData = new FormData()
  _.forEach(data.event, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`event[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      formData.append(`event[${key}][]`, value)
    } else {
      formData.append(`event[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_EVENTS,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'POST'
  )
}

export const updateEvent = data => {
  let formData = new FormData()
  _.forEach(data.event, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`event[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      if (key === 'reward_amount') {
        _.forEach(value, amount => formData.append(`event[${key}][]`, amount))
      } else {
        formData.append(`event[${key}][]`, value)
      }
    } else {
      formData.append(`event[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_EVENTS + `/${data.event.id}`,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'PUT'
  )
}

export const deleteEvent = id => {
  return del(`${url.URL_EVENTS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
