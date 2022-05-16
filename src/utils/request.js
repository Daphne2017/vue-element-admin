import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation

    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const type = response.config.responseType === 'blob'
    // if the custom code is not 0, it is judged as an error.
    if (res.code !== 0 && !type) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 10 * 1000,
      })
      return Promise.reject({ response })
    } else {
      return res
    }
  },
  error => {
    console.dir(error)// for debug
    if (error.response && error.response.status && error.response.status === 401) {
      // to re-login
      MessageBox.confirm('无访问权限，请重新登录', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      console.log(555512, error)
      Message({
        message: error.response && error.response.data.msg || error.message,
        type: 'error',
        duration: 5 * 1000,
      })
    }
    return Promise.reject(error)
  }
)

export default service
