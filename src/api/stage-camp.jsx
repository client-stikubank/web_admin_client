import { del, get, post, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'

export const getStageCamps = params => {
  return get(url.URL_STAGE_CAMPS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getStageCampsDetails = id => {
  return get(`${url.URL_STAGE_CAMPS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewStageCamp = data => {
  return post(url.URL_STAGE_CAMPS, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const updateStageCamp = data => {
  return put(url.URL_STAGE_CAMPS + `/${data.camp.id}`, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const deleteStageCamp = id => {
  return del(`${url.URL_STAGE_CAMPS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
