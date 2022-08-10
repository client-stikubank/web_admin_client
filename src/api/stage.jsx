import { del, get, post, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'

export const updateStage = data => {
  return put(`${url.URL_STAGES}/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
