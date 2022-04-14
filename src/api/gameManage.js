import request from '@/utils/request'
// 获取已关联的标签

/**  游戏管理页  */
export const gameMangementListApi = '/gameManagement/gameLibraryList'
// 提交表单
export function submitGameApi({ id, ...data }) {
  const url = id ? `edit/${id}` : `add`
  return request({
    timeout: 2 * 60 * 1000,
    url: `/gameManagement/gameLibrary/${url}`,
    method: `${id ? 'put' : 'post'}`,
    data,
  })
}

export function getGameRelatedTagApi(id) {
  return request({
    url: `/gameMangement/gameLibrary/getRelatedTagsBygameId/${id}`,
    method: 'get',
    data: { id },
  })
}
// 游戏上下架
export function updatePutStatusApi(id, data) {
  return request({
    url: `/gameMangement/gameLibrary/updatePutStatus/${id}`,
    method: 'patch',
    data,
  })
}