import { del, get, post, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'

export const getCarnivalGifts = params => {
  return get(url.URL_CARNIVAL_GIFTS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getCarnivalGiftsDetails = id => {
  return get(`${url.URL_CARNIVAL_GIFTS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewCarnivalGift = data => {
  return post(url.URL_CARNIVAL_GIFTS, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const updateCarnivalGift = data => {
  return put(url.URL_CARNIVAL_GIFTS + `/${data.carnival_gift.id}`, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const deleteCarnivalGift = id => {
  return del(`${url.URL_CARNIVAL_GIFTS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
