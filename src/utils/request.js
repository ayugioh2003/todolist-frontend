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
      config.data ? config.data : '無參數'
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
    console.log(
      `%c🔌 Error Response:%c${error.config.url}`,
      'background:red; padding: 3px; border-radius: 5px; color: #fff;',
      'padding: 3px;',
      error.response.data
    )

    const { status, message, error: resError, data } = error.response.data

    // API 400, 401 僅會吐 error, status
    switch (error.response.status) {
      case 400:
        Swal.fire({
          icon: 'error',
          title: `Oppps..${error.response.status} 錯誤`,
          text: resError,
        })
        break
      case 401:
      case 404:
        Swal.fire({
          icon: 'error',
          title: `Oppps..${error.response.status} 錯誤`,
          text: message,
        })
        break
      default:
        Swal.fire({
          icon: 'error',
          title: `Oppps..:(`,
          text: '系統發生錯誤，請稍後再試',
        })
        break
    }

    // 顯示錯誤訊息，API 有吐 data
    if (error?.response && status && data) {
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