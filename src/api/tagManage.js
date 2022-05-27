import request from '@/utils/request'
/** tableUrl  */
export const tagLibraryListApi = '/tagManagement/list'
// 提交表单
export function sumbitTagApi({ id, ...data }) {
  const url = id ? `edit/${id}` : `add`
  return request({
    url: `/tagManagement/${url}`,
    method: `${id ? 'put' : 'post'}`,
    data: data,
  })
}
// 通过tagId获取关联的游戏
export function getRelatedGameByTagIdApi(tagId) {
  return request({
    url: `/tagManagement/getRelatedGameByTagId/${tagId}`,
    method: 'get',
  })
}
