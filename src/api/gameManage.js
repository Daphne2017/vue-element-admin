import request from '@/utils/request'
// 获取已关联的标签

/**  游戏管理页  */
export const gameManageListApi = '/gameManage/list'
// 提交表单
export function submitGameApi({ id, ...data }) {
  const url = id ? `edit/${id}` : `add`
  return request({
    timeout: 2 * 60 * 1000,
    url: `/gameManage/${url}`,
    method: `${id ? 'put' : 'post'}`,
    data,
  })
}

export function getGameRelatedTagApi(id) {
  return request({
    url: `/gameManage/getRelatedTagsBygameId/${id}`,
    method: 'get',
    data: { id },
  })
}
// 游戏上下架
export function updatePutStatusApi(id, data) {
  return request({
    url: `/gameManage/updatePutStatus/${id}`,
    method: 'patch',
    data,
  })
}

// 获取所有的游戏
export function getAllGamesApi() {
  return request({
    url: `/gameManage/all`,
    method: 'get',
  })
}
