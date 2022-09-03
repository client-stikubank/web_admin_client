import { del, get, post, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'

export const getCoins = params => {
  return get(url.URL_COINS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const updateCoin = data => {
  return put(url.URL_COINS + `/${data.coin.id}`, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
