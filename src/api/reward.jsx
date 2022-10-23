import { del, get, post, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'

export const getRewards = params => {
  return get(url.URL_REWARDS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const postTransactionReward = data => {
  return post(
    `${url.URL_REWARDS}/${data.id}/process_transaction`,
    {},
    {
      headers: {
        Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
      }
    }
  )
}
