import axios from 'axios'
import { getToken, setToken, removeToken } from '@/utils/token'
import { showError } from '@/utils/resHandle'
import router from '@/router'
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

    // API 400, 401 僅會吐 error, status，沒有 message
    switch (error.response.status) {
      case 400:
        showError({ title: error.response.status, content: resError })
        break

      case 401:
        showError({ title: error.response.status, content: message })
        removeToken()
        router.push({ name: 'login' })
      case 404:
        showError({ title: error.response.status, content: message })
        break

      case 422:
        showError({ title: message, content: resError[0] })
        break

      default:
        // 顯示錯誤訊息，API 有吐 data
        if (error?.response && status && data) {
          let str = ''
          Object.values(resError).forEach(err => {
            str += `${err} <br/>`
          })
          showError({ title: message, content: str })
          return
        }

        showError({ title: '發生錯誤' })
        break
    }


  }
)

export default service