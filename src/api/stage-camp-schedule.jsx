import { del, get, post, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'

export const getStageCampSchedules = params => {
  return get(url.URL_STAGE_CAMP_SCHEDULES, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getStageCampSchedulesDetails = id => {
  return get(`${url.URL_STAGE_CAMP_SCHEDULES}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewStageCampSchedule = data => {
  return post(url.URL_STAGE_CAMP_SCHEDULES, data, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const updateStageCampSchedule = data => {
  return put(
    url.URL_STAGE_CAMP_SCHEDULES + `/${data.stage_camp_schedule.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
      }
    }
  )
}

export const deleteStageCampSchedule = id => {
  return del(`${url.URL_STAGE_CAMP_SCHEDULES}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
