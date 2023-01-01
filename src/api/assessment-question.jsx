import { del, get, postFormData, put } from '../helpers/api_helper'
import * as url from '@/helpers/url_helper'
import * as storage from '@/helpers/storage'
import _ from 'lodash'

export const getAssessmentQuestions = params => {
  return get(url.URL_ASSESSMENT_QUESTIONS, {
    params,
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const getAssessmentQuestionsDetails = id => {
  return get(`${url.URL_ASSESSMENT_QUESTIONS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}

export const addNewAssessmentQuestion = data => {
  let formData = new FormData()
  _.forEach(data.assessment_question, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`assessment_question[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      formData.append(`assessment_question[${key}][]`, value)
    } else {
      formData.append(`assessment_question[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_ASSESSMENT_QUESTIONS,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'POST'
  )
}

export const updateAssessmentQuestion = data => {
  let formData = new FormData()
  _.forEach(data.assessment_question, (value, key) => {
    if (_.isPlainObject(value)) {
      _.forEach(value, (subValue, subKey) =>
        formData.append(`assessment_question[${key}][${subKey}]`, subValue)
      )
    } else if (_.isArray(value)) {
      if (key === 'reward_amount') {
        _.forEach(value, amount => formData.append(`assessment_question[${key}][]`, amount))
      } else {
        formData.append(`assessment_question[${key}][]`, value)
      }
    } else {
      formData.append(`assessment_question[${key}]`, value)
    }
  })

  return postFormData(
    url.URL_ASSESSMENT_QUESTIONS + `/${data.assessment_question.id}`,
    formData,
    {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`,
      'Content-Type': 'multipart/form-data'
    },
    'PUT'
  )
}

export const deleteAssessmentQuestion = id => {
  return del(`${url.URL_ASSESSMENT_QUESTIONS}/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.CURRENT_USER?.access_token}`
    }
  })
}
