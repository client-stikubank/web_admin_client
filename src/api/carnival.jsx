import { del, get, post, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'

export const getCarnivals = params => {
  return get(url.GET_CARNIVALS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getCarnivalsDetails = id => {
  return get(`${url.GET_CARNIVAL_DETAILS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewCarnival = data => {
  return post(url.POST_CARNIVAL, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const updateCarnival = data => {
  return put(url.PUT_CARNIVAL, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const deleteCarnival = id => {
  return del(`${url.DELETE_CARNIVAL}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
