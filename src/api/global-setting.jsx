import { del, get, postFormData, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'
import _ from 'lodash'

export const getGlobalSettings = params => {
  return get(url.URL_GLOBAL_SETTINGS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getGlobalSettingsDetails = id => {
  return get(`${url.URL_GLOBAL_SETTINGS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewGlobalSetting = data => {
  let formData = new FormData()
  _.forEach(data.global_setting, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`global_setting[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      formData.append(`global_setting[${key}][]`, value)
    } else {
      formData.append(`global_setting[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_GLOBAL_SETTINGS,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'POST'
  )
}

export const updateGlobalSetting = data => {
  let formData = new FormData()
  _.forEach(data.global_setting, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`global_setting[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      if (key === 'reward_amount') {
        _.forEach(value, amount => formData.append(`global_setting[${key}][]`, amount))
      } else {
        formData.append(`global_setting[${key}][]`, value)
      }
    } else {
      formData.append(`global_setting[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_GLOBAL_SETTINGS + `/${data.global_setting.id}`,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'PUT'
  )
}

export const deleteGlobalSetting = id => {
  return del(`${url.URL_GLOBAL_SETTINGS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
