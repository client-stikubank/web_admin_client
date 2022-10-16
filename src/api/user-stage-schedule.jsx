import { del, get, post, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'

export const getUserStageSchedules = params => {
  return get(url.URL_USER_STAGE_SCHEDULES, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const updateUserStageSchedule = data => {
  return put(
    url.URL_USER_STAGE_SCHEDULES + `/${data.userStageSchedule.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
      }
    }
  )
}
