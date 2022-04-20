import request from '@/utils/request'
export const userListApi = '/admin_user/list'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin_user/info',
    method: 'get'
  })
}
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
// register
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

// register
export function modifyRole(data) {
  return request({
    url: '/admin_user/modify-role',
    method: 'post',
    data
  })
}
