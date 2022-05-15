import request from '@/utils/request'

// 取得 Todo 列表
export function getTodoListAPI(data) {
  return request({
    url: '/todos',
    method: 'get',
    data
  })
}