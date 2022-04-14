import request from '@/utils/request'
/** tableUrl  */
export const tagLibraryListApi = '/tagManagement/tagLibraryList'
// 提交表单
export function sumbitTagApi({ id, ...data }) {
  const url = id ? `edit/${id}` : `add`
  return request({
    url: `/contentManagement/tagLibraryList/${url}`,
    method: `${id ? 'put' : 'post'}`,
    data: data,
  })
}
// 通过tagId获取关联的游戏
export function getRelatedGameByTagIdApi(tagId) {
  return request({
    url: `/contentManagement/tagLibraryList/getRelatedGameByTagId/${tagId}`,
    method: 'get',
  })
}
// 标签上下架
export function updatePutStatusApi(id, data) {
  return request({
    url: `/contentManagement/tagLibraryList/updatePutStatus/${id}`,
    method: 'patch',
    data,
  })
}
// 修改标签权重
export function updateWeightApi(id, data) {
  return request({
    url: `/contentManagement/tagLibraryList/updateWeight/${id}`,
    method: 'patch',
    data,
  })
}
