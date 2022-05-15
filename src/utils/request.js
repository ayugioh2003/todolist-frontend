import axios from 'axios'
import Swal from 'sweetalert2'

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

    if (sessionStorage.getItem('token')) {
      config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
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

    return response.data
  },

  error => {
    console.error(`❌ 發生錯誤：${error}`)
    console.error(error.response)

    if (error?.response && error?.response?.data) {
      const { message, error: resError } = error.response.data
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