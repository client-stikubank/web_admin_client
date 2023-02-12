import axios from 'axios'
import { del, get, post, put } from '../helpers/api_helper'
import * as url from '../helpers/url_helper'

// ENVs
import { BACKEND_API_CLIENT, BACKEND_API_SECRET } from '../helpers/environment'

export const postLogin = data => {
  return post(url.POST_LOGIN, {
    ...data,
    grant_type: 'password',
    client_id: BACKEND_API_CLIENT,
    client_secret: BACKEND_API_SECRET
  })
}

export const postLogout = () => {
  const authUser = JSON.parse(localStorage.getItem('authUser'))
  post(url.POST_LOGOUT, {
    token: authUser.access_token,
    client_id: BACKEND_API_CLIENT,
    client_secret: BACKEND_API_SECRET
  })
}

// export const checkToken = () => {
//   const authUser = JSON.parse(localStorage.getItem('authUser'))
//   return get(url.CHECK_TOKEN, {
//     headers: {
//       Authorization: `Bearer ${authUser.access_token}`
//     }
//   })
// }
