import { del, get, post, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'

export const getCarnivals = params => {
  return get(url.URL_CARNIVALS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getCarnivalsDetails = id => {
  return get(`${url.URL_CARNIVALS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewCarnival = data => {
  return post(url.URL_CARNIVALS, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const updateCarnival = data => {
  return put(`${url.URL_CARNIVALS}/${data.carnival.id}`, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const deleteCarnival = id => {
  return del(`${url.URL_CARNIVALS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const activateCarnival = carnival => {
  return post(
    `${url.URL_CARNIVALS}/${carnival.id}/activate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
      }
    }
  )
}
