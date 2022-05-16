import request from '@/utils/request'

// 取得 Todo 列表
export function getTodoListAPI(data) {
  return request({
    url: '/todos',
    method: 'get',
    data
  })
}

// 新增 Todo
export function createTodoAPI(data) {
  return request({
    url: '/todos',
    method: 'post',
    data
  })
}

// 修改 Todo
export function updateTodoAPI(id, data) {
  return request({
    url: `/todos/${id}`,
    method: 'put',
    data
  })
}

// 刪除 Todo
export function deleteTodoAPI(id) {
  return request({
    url: `/todos/${id}`,
    method: 'delete',
  })
}

// 切換 Todo 狀態已完成 / 完成
export function toggleTodoAPI(id) {
  return request({
    url: `/todos/${id}/toggle`,
    method: 'patch',
  })
}