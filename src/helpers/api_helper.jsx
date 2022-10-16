import axios from 'axios'

// API
import {
  BACKEND_API_URL,
  BACKEND_API_CLIENT,
  BACKEND_API_SECRET
} from './environment'

const axiosApi = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    uid: BACKEND_API_CLIENT,
    secret: BACKEND_API_SECRET
  }
})

axiosApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      window.location.replace('/logout')
      localStorage.setItem('is-kicked', 'true')
    }
    return Promise.reject(error)
  }
)

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
  return await axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function postFormData(url, data, headers = {}, method = 'POST') {
  const config = { method: method, url, data, headers }
  return await axiosApi(config).then(response => response.data)
}

export async function put(url, data, config = {}) {
  return await axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data)
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data)
}
