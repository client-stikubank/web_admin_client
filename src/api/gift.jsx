import { del, get, postFormData, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'
import _ from 'lodash'

export const getGifts = params => {
  return get(url.URL_GIFTS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getGiftsDetails = id => {
  return get(`${url.URL_GIFTS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewGift = data => {
  let formData = new FormData()
  _.forEach(data.gift, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`gift[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      formData.append(`gift[${key}][]`, value)
    } else {
      formData.append(`gift[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_GIFTS,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'POST'
  )
}

export const updateGift = data => {
  let formData = new FormData()
  _.forEach(data.gift, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`gift[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      if (key === 'reward_amount') {
        _.forEach(value, amount => formData.append(`gift[${key}][]`, amount))
      } else {
        formData.append(`gift[${key}][]`, value)
      }
    } else {
      formData.append(`gift[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_GIFTS + `/${data.gift.id}`,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'PUT'
  )
}

export const deleteGift = id => {
  return del(`${url.URL_GIFTS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
