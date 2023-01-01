import { del, get, postFormData, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'
import _ from 'lodash'

export const getPersonalities = params => {
  return get(url.URL_PERSONALITIES, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getPersonalitiesDetails = id => {
  return get(`${url.URL_PERSONALITIES}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewPersonality = data => {
  let formData = new FormData()
  _.forEach(data.personality, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`personality[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      formData.append(`personality[${key}][]`, value)
    } else {
      formData.append(`personality[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_PERSONALITIES,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'POST'
  )
}

export const updatePersonality = data => {
  let formData = new FormData()
  _.forEach(data.personality, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`personality[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      if (key === 'reward_amount') {
        _.forEach(value, amount =>
          formData.append(`personality[${key}][]`, amount)
        )
      } else {
        formData.append(`personality[${key}][]`, value)
      }
    } else {
      formData.append(`personality[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_PERSONALITIES + `/${data.personality.id}`,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'PUT'
  )
}

export const deletePersonality = id => {
  return del(`${url.URL_PERSONALITIES}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
