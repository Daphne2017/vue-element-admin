import request from '@/utils/request'
import qs from 'qs'

// 列表查询
export function apiRequest(url, params, method) {
  return request({
    url: url,
    method: method || 'get',
    params,
  })
}

// 列表查询(qs)
export function apiQsRequest(url, params, method) {
  return request({
    url: url,
    method: method || 'get',
    params: {
      query: qs.stringify(params),
    },
  })
}

// 文件导出
export function exportFile(url, params) {
  return request({
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 1000 * 60,
    url: url,
    method: 'get',
    params: {
      query: qs.stringify(params),
    },
  })
}

// 富文本图片上传
export function richTextUploadImgApi(data) {
  return request({
    timeout: 1000 * 60,
    url: '/common/richTextBox/image',
    method: 'post',
    headers: {
      'Content-type': 'multipart/form-data',
    },
    data,
  })
}



