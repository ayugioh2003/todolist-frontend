import request from '@/utils/request'

// 登入
export function signInAPI(data) {
  return request({
    url: '/users/sign_in',
    method: 'post',
    data
  })
}

// 登出
export function signOutAPI() {
  return request({
    url: '/users/sign_out',
    method: 'delete',
  })
}
// 註冊
export function signUpAPI(data) {
  return request({
    url: '/users/',
    method: 'post',
    data
  })
}