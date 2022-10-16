import _ from 'lodash'
import { del, get, post, put, postFormData } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'

export const getUsers = params => {
  return get(url.URL_USERS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getUsersDetails = id => {
  return get(`${url.URL_USERS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewUser = data => {
  let formData = new FormData()
  _.forEach(data.user, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`user[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      formData.append(`user[${key}][]`, value)
    } else {
      formData.append(`user[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_USERS,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'POST'
  )
}

export const updateUser = data => {
  let formData = new FormData()
  _.forEach(data.user, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`user[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      formData.append(`user[${key}][]`, value)
    } else {
      formData.append(`user[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_USERS + `/${data.user.id}`,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'PUT'
  )
}

export const deleteUser = id => {
  return del(`${url.URL_USERS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
