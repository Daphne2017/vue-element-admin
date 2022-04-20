import request from '@/utils/request'
// 获取已关联的标签

export const rolelistApi = '/role/list'
// 提交表单
export function submitApi({ id, ...data }) {
  const url = id ? `edit/${id}` : `add`
  return request({
    timeout: 2 * 60 * 1000,
    url: `/role/list/${url}`,
    method: `${id ? 'put' : 'post'}`,
    data,
  })
}

