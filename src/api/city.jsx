import { del, get, postFormData, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'
import _ from 'lodash'

export const getCities = params => {
  return get(url.URL_CITIES, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
