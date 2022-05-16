import request from '@/utils/request'
// 账号管理
export const manageDataUrl = '/admin_user/list'

// 菜单管理
export const listApi = '/admin_menu/list'

export function getAuthorityApi({ id, ...params }) {
  return request({
    url: `/admin_authority/${id}/menu`,
    method: 'get',
    params,
  })
}
export function updateAuthorityApi({ id, ...data }) {
  return request({
    url: `/admin_authority/update/${id}`,
    method: 'put',
    data,
  })
}

export function addMenuApi(data) {
  return request({
    url: '/admin_menu/add',
    method: 'post',
    data,
  })
}

export function updateMenuApi(data) {
  return request({
    url: '/admin_menu/update',
    method: 'post',
    data,
  })
}

export function deleteApi(data) {
  return request({
    url: '/admin_menu/delete',
    method: 'post',
    data,
  })
}
