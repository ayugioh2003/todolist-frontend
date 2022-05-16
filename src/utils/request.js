import axios from 'axios'
import Swal from 'sweetalert2'
import { getToken, setToken } from '@/utils/token'

const service = axios.create({
  baseURL: 'https://todoo.5xcamp.us/',
  timeout: 50000,
});

// [發出請求]
service.interceptors.request.use(
  config => {
    console.log(
      `%c👨‍💻 Request:%c${config.url}`,
      'background:#3F51B5; padding: 3px; border-radius: 5px; color: #fff;',
      'padding: 3px;',
      config.data ? config.data : ''
    )

    if (getToken()) {
      config.headers['Authorization'] = `${getToken()}`
    }

    return config
  },

  error => {
    console.error(`❌ 發生錯誤`) // for debug
    console.error(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    console.log(
      `%c🔌 Response:%c${response.config.url}`,
      'background:deepskyblue; padding: 3px; border-radius: 5px; color: #fff;',
      'padding: 3px;',
      response.data
    )

    if (response.headers.authorization) {
      setToken(response.headers.authorization)
    }

    return response.data
  },

  error => {
    console.error(`❌ 發生錯誤：${error}`)
    console.error(error.response)

    const { message, error: resError } = error.response.data
    if (error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: `Oppps..${message}`,
        html: message,
      })
    } else if (error?.response && error?.response?.data) {
      let str = ''
      Object.values(resError).forEach(err => {
        str += `${err} <br/>`
      })
      Swal.fire({
        icon: 'error',
        title: `Oppps..${message}`,
        html: str,
      })
    }

  }
)

export default service